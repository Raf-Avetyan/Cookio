import { View, StyleSheet } from "react-native";
import React from "react";
import TrendingCarousel from "../TrendingCarousel";
import SectionTop from "../../SectionTop/SectionTop";
import { RootStackParamList } from "@/types/navigation.types";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const Trending = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "SingleRecipe">;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <SectionTop
          title="Trending now 🔥"
          link="/(auth)/onBoarding"
          linkText="See all"
        />
      </View>
      <View style={{ minHeight: 310 }}>
        <TrendingCarousel navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Trending;
