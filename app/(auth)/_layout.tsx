import { Stack } from "expo-router";
import React from "react";

export default function OnBoardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="onBoarding"
        options={{
          title: "OnBoarding",
        }}
      />
    </Stack>
  );
}
