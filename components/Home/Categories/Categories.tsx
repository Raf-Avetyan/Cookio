import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import CategoriesCarousel from "./CategoriesCarousel";
import MainCarousel from "./MainCarousel";
import SectionTop from "../../SectionTop/SectionTop";

const Categories = () => {
  const [selectedCategory, setsSelectedCategory] = useState("Breakfast");

  return (
    <View style={styles.container}>
      <View>
        <SectionTop title="Popular category" />
      </View>
      <View>
        <CategoriesCarousel
          selectedCategory={selectedCategory}
          setsSelectedCategory={setsSelectedCategory}
        />
      </View>
      <View>
        <MainCarousel selectedCategory={selectedCategory} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  title: {
    fontFamily: "PoppinsSemibold",
    fontSize: 20,
    color: Colors.Neutral[90],
  },
});

export default Categories;
