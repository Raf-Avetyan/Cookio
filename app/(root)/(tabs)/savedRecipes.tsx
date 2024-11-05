import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { useQuery } from "@tanstack/react-query";
import { savedRecipeService } from "@/services/saved-recipes.service";
import { Toaster } from "sonner-native";
import SectionTop from "@/components/SectionTop/SectionTop";
import { Colors } from "@/constants/Colors";
import TrendingVideo from "@/components/Home/TrendingVideo";

const SavedRecipes = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { data: savedRecipes, isLoading: savedRecipesIsLoading } = useQuery({
    queryKey: ["savedRecipes"],
    queryFn: () => savedRecipeService.getByUserId(),
  });

  const [selectedTab, setSelectedTab] = useState<"video" | "recipe">("video");

  const handleContentLoaded = () => {
    setIsLoading(false);
  };

  return (
    <>
      {savedRecipesIsLoading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require("../../../assets/lottie/loader.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      ) : (
        <ScrollView
          style={{
            backgroundColor: "#1E1E1E",
            flex: 1,
            paddingHorizontal: 20,
          }}
        >
          <SafeAreaView
            onLayout={handleContentLoaded}
            style={{ paddingBottom: 100 }}
          >
            <View style={{ marginTop: 20, marginBottom: 30 }}>
              <SectionTop title="Saved recipes" fontSize={24} />
            </View>
            <View>
              <View style={styles.tabs}>
                <View
                  style={[
                    styles.tab,
                    {
                      backgroundColor:
                        selectedTab === "video"
                          ? Colors.Primary[50]
                          : "transparent",
                    },
                  ]}
                >
                  <TouchableOpacity onPress={() => setSelectedTab("video")}>
                    <Text style={styles.tabText}>Video</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.tab,
                    {
                      backgroundColor:
                        selectedTab === "recipe"
                          ? Colors.Primary[50]
                          : "transparent",
                    },
                  ]}
                >
                  <TouchableOpacity onPress={() => setSelectedTab("recipe")}>
                    <Text style={styles.tabText}>Recipe</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                {savedRecipes?.recipes && selectedTab === "video"
                  ? savedRecipes.recipes.map((recipes) =>
                      recipes?.recipe?.videoUrl.length ? (
                        <View
                          style={{
                            marginTop: 20,
                          }}
                          key={recipes.id}
                        >
                          <TrendingVideo
                            videoUrl={recipes?.recipe?.videoUrl}
                            imageUrl={recipes?.recipe?.imageUrl}
                            user={{
                              username: savedRecipes?.user?.username,
                              avatarPath: savedRecipes?.user?.avatarPath,
                            }}
                            title={recipes?.recipe?.name}
                            moreContent
                          />
                        </View>
                      ) : null
                    )
                  : null}
                {savedRecipes?.recipes && selectedTab === "recipe"
                  ? savedRecipes.recipes.map((recipes) =>
                      !recipes?.recipe?.videoUrl.length ? (
                        <View
                          style={{
                            marginTop: 20,
                          }}
                          key={recipes.id}
                        >
                          <View
                            style={{
                              marginTop: 20,
                            }}
                            key={recipes.id}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                gap: 20,
                                height: 150,
                              }}
                            >
                              <View style={{ width: "40%", height: "100%" }}>
                                <Image
                                  source={{ uri: recipes.recipe.imageUrl }}
                                  style={{ width: "100%", height: "100%" }}
                                  resizeMode="contain"
                                />
                              </View>
                              <View>
                                <Text>{recipes.recipe.name}</Text>
                                <Text>{recipes.recipe.time}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      ) : null
                    )
                  : null}
              </View>
            </View>
            <StatusBar style="light" />
          </SafeAreaView>
        </ScrollView>
      )}
      <Toaster />
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    zIndex: 999,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  tabs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    marginBottom: 12,
  },
  tab: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
  },
  tabText: {
    fontFamily: "PoppinsBold",
    fontSize: 12,
    textAlign: "center",
    color: Colors.bgColor,
  },
});

export default SavedRecipes;
