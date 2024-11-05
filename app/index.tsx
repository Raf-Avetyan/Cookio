import React from "react";
import { Redirect } from "expo-router";
import { View, StyleSheet } from "react-native";
import useIsRefreshToken from "@/hooks/useIsRefreshToken";
import LottieView from "lottie-react-native";

const Index = () => {
  const { isRefreshToken, isLoading } = useIsRefreshToken();

  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: "#1E1E1E",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.loadingContainer}>
          <LottieView
            source={require("../assets/lottie/loader2.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "#1E1E1E", height: "100%" }}>
      {isRefreshToken ? (
        <Redirect href="/(root)/(tabs)/" />
      ) : (
        <Redirect href="/(auth)/onBoarding" />
      )}
    </View>
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
    width: 110,
    height: 110,
  },
});

export default Index;
