import { View, StyleSheet } from "react-native";
import React from "react";
import SectionTop from "@/components/SectionTop/SectionTop";
import RecentRecipesCarousel from "./RecentRecipesCarousel";

const RecentRecipes = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <SectionTop
          title="Recent recipe"
          link="/(auth)/onBoarding"
          linkText="See all"
        />
      </View>
      <View>
        <RecentRecipesCarousel />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default RecentRecipes;
