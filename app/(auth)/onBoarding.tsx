import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Star from "../../assets/icons/star.svg";
import ArrowRight from "../../assets/icons/arrow-right.svg";
import Button from "@/components/ui/Button/Button";
import { Href, useRouter } from "expo-router";

const OnBoarding = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/splash.jpg")}
      resizeMode="cover"
      className="h-full bg-black"
    >
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.top}>
            <View className="pb-1">
              <Star width={14} height={14} />
            </View>
            <Text style={styles.topText}>
              <Text style={styles.topTextNumber}>60k+</Text> Premium recipes
            </Text>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.bottomTitle}>{`Let’s\nCooking`}</Text>
            <Text style={styles.bottomText}>Find best recipes for cooking</Text>
            <Button
              text="Start cooking"
              Icon={ArrowRight}
              size="large"
              state="default"
              type="primary"
              onPress={() =>
                router.replace("/(auth)/auth" as Href<string | object>)
              }
            />
          </View>
          <Image
            source={require("../../assets/images/effect.png")}
            style={styles.effectImg}
          />
        </View>
        <StatusBar style="light" />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    paddingBottom: 80,
    paddingTop: 14,
    position: "relative",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  topText: {
    fontFamily: "PoppinsRegular",
    color: "white",
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
  },
  topTextNumber: {
    fontFamily: "PoppinsSemibold",
  },
  bottom: {
    display: "flex",
    rowGap: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTitle: {
    fontFamily: "PoppinsSemibold",
    fontSize: 56,
    textAlign: "center",
    color: "white",
    lineHeight: 70,
  },
  bottomText: {
    fontFamily: "PoppinsRegular",
    fontWeight: "400",
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
  effectImg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: -1,
    height: 440,
  },
});

export default OnBoarding;
