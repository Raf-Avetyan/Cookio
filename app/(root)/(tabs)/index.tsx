import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import Searchinput from "@/components/ui/SearchInput/Searchinput";
import SearchIcon from "../../../assets/icons/search.svg";
import Trending from "@/components/Home/Trending/Trending";
import Categories from "@/components/Home/Categories/Categories";
import PopularCreators from "@/components/Home/PopularCreators/PopularCreators";
import RecentRecipes from "@/components/Home/RecentRecipes/RecentRecipes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import { useAuthMiddleware } from "@/hooks/useAuthMidleware";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/types/navigation.types";

export default function HomeScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "SingleRecipe">;
}) {
  useAuthMiddleware();
  const [isLoading, setIsLoading] = useState(true);

  const handleContentLoaded = () => {
    setIsLoading(false);
  };

  return (
    <GestureHandlerRootView>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require("../../../assets/lottie/loader.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      )}

      <ScrollView
        style={{ backgroundColor: "#1E1E1E" }}
        onLayout={handleContentLoaded}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>{`Find best recipes\nfor cooking`}</Text>
          <Searchinput placeholder="Search recipes" Icon={SearchIcon} />
          <Trending navigation={navigation} />
          <Categories />
          <RecentRecipes />
          <PopularCreators />
        </SafeAreaView>
        <StatusBar style="light" backgroundColor="#1E1E1E" />
      </ScrollView>
      <Toaster theme="dark" position="top-center" duration={10000} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 75,
  },
  title: {
    fontFamily: "PoppinsSemibold",
    fontSize: 24,
    color: "whitesmoke",
    paddingVertical: 20,
  },
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
});
