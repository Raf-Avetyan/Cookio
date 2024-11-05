import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import SavedRecipes from "./savedRecipes";
import HomeScreen from ".";
import CreateRecipe from "./createRecipe";
import Notifications from "./notifications";
import Profile from "./profile";
import Settings from "./settings";
import {
  HomeIcon,
  SaveIcon,
  PlusIcon,
  BellIcon,
  ProfileIcon,
} from "../../../assets/icons/tabBarIcons/index";
import { Colors } from "@/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SingleRecipe from "./singleRecipe";
import { RootStackParamList } from "@/types/navigation.types";

const Stack = createStackNavigator();
const ModalStack = createStackNavigator<RootStackParamList>();

function MainStackNavigator() {
  const [selectedTab, setSelectedTab] = useState("home");

  function renderContent() {
    return (
      <Stack.Navigator
        screenOptions={{
          animationEnabled: true,
          headerShown: false,
          ...(Platform.OS === "ios"
            ? TransitionPresets.SlideFromRightIOS
            : TransitionPresets.ScaleFromCenterAndroid),
        }}
      >
        {selectedTab === "home" && (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
        {selectedTab === "savedRecipes" && (
          <Stack.Screen name="Saved Recipes" component={SavedRecipes} />
        )}
        {selectedTab === "createRecipe" && (
          <Stack.Screen name="Create Recipe" component={CreateRecipe} />
        )}
        {selectedTab === "notifications" && (
          <Stack.Screen name="Notifications" component={Notifications} />
        )}
        {selectedTab === "profile" && (
          <Stack.Screen name="Profile" component={Profile} />
        )}
      </Stack.Navigator>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {renderContent()}

      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setSelectedTab("home")}
          style={styles.tabItem}
        >
          <HomeIcon
            width={26}
            height={26}
            fill={selectedTab === "home" ? "#386BF6" : Colors.Neutral[30]}
            selectedTab={selectedTab}
          />
          <View
            style={{
              display: selectedTab === "home" ? "flex" : "none",
              position: "absolute",
              top: -8.2,
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
              backgroundColor: "#386BF6",
              height: 6,
              width: 64,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("savedRecipes")}
          style={styles.tabItem}
        >
          <SaveIcon
            width={31}
            height={31}
            fill={
              selectedTab === "savedRecipes" ? "#386BF6" : Colors.Neutral[30]
            }
          />
          <View
            style={{
              display: selectedTab === "savedRecipes" ? "flex" : "none",
              position: "absolute",
              top: -8.2,
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
              backgroundColor: "#386BF6",
              height: 6,
              width: 64,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("createRecipe")}
          style={[
            styles.tabItem,
            { backgroundColor: "#386bf6bc", transform: [{ scale: 0.9 }] },
          ]}
        >
          <PlusIcon width={32} height={32} fill={Colors.bgColor} />
          <View
            style={{
              display: selectedTab === "createRecipe" ? "flex" : "none",
              position: "absolute",
              top: -13,
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
              backgroundColor: "#386BF6",
              height: 6,
              width: 64,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("notifications")}
          style={styles.tabItem}
        >
          <BellIcon
            width={30}
            height={30}
            fill={
              selectedTab === "notifications" ? "#386BF6" : Colors.Neutral[30]
            }
          />
          <View
            style={{
              display: selectedTab === "notifications" ? "flex" : "none",
              position: "absolute",
              top: -8.2,
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
              backgroundColor: "#386BF6",
              height: 6,
              width: 64,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("profile")}
          style={styles.tabItem}
        >
          <ProfileIcon
            width={30}
            height={30}
            fill={selectedTab === "profile" ? "#386BF6" : Colors.Neutral[30]}
          />
          <View
            style={{
              display: selectedTab === "profile" ? "flex" : "none",
              position: "absolute",
              top: -8.2,
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
              backgroundColor: "#386BF6",
              height: 6,
              width: 64,
            }}
          />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

export default function Layout() {
  return (
    <ModalStack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <ModalStack.Screen name="Main" component={MainStackNavigator} />
      <ModalStack.Screen
        name="Settings"
        component={Settings}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
      />
      <ModalStack.Screen
        name="SingleRecipe"
        component={SingleRecipe}
        options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
      />
    </ModalStack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    left: 2,
    width: "95%",
    marginHorizontal: 8,
    paddingBottom: 2,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    gap: 11,
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#333",
    opacity: 0.95,
  },
  tabBarBg: {
    position: "absolute",
    bottom: -5,
    left: 0,
    width: "100%",
    height: 100,
    zIndex: -1,
  },
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 55,
    borderRadius: 50,
  },
});
