import { View, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MoreIcon from "../../../assets/icons/more.svg";
import ArrowLeft from "../../../assets/icons/arrow-left.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import SectionTop from "@/components/SectionTop/SectionTop";
import { useQuery } from "@tanstack/react-query";
import { recipeService } from "@/services/recipes.service";
import { useRoute } from "@react-navigation/native";
import {
  RootStackParamList,
  SingleRecipeParams,
} from "@/types/navigation.types";
import TrendingVideo from "@/components/Home/TrendingVideo";

const SingleRecipe = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "SingleRecipe">;
}) => {
  const route = useRoute();
  const { recipeId } = route.params as SingleRecipeParams;

  const { data: recipeData, isLoading: recipeIsLoading } = useQuery({
    queryKey: ["recipeById"],
    queryFn: () => recipeService.getById(recipeId),
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#1E1E1E",
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft width={28} height={28} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MoreIcon width={28} height={28} />
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <SectionTop title={"How to make french\ntoast"} fontSize={24} />
      </View>
      <View>
        {recipeData && (
          <View style={styles.videoContainer}>
            <TrendingVideo
              imageUrl={recipeData?.imageUrl}
              videoUrl={recipeData?.videoUrl}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
  },
  title: {
    paddingTop: 16,
    paddingBottom: 12,
  },
  videoContainer: {},
});

export default SingleRecipe;
