import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";

const Notifications = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleContentLoaded = () => {
    setIsLoading(false);
  };

  return (
    <>
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
      <SafeAreaView
        style={{ backgroundColor: "#1E1E1E", flex: 1 }}
        // onLayout={handleContentLoaded}
      >
        <Text>Notifications</Text>
        <StatusBar style="light" />
      </SafeAreaView>
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
});

export default Notifications;
