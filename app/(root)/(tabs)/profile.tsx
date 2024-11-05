import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import MoreIcon from "../../../assets/icons/more.svg";
import SettingsIcon from "../../../assets/icons/settings.svg";
import ArrowDownIcon from "../../../assets/icons/arrow-down.svg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@/types/navigation.types";

export const handleUsernameFormatter = (username: string) => {
  return username.toLowerCase().split(" ").join("_");
};

const Profile = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<StackParamList, "Profile">;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleContentLoaded = () => {
    setIsLoading(false);
  };

  const { data: profile, isFetched } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userService.getProfile(),
  });

  useEffect(() => {
    if (isFetched) {
      handleContentLoaded();
    }
  }, [isFetched]);

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
        style={{ backgroundColor: "#1E1E1E", flex: 1, paddingHorizontal: 22 }}
      >
        {profile && (
          <>
            <View style={styles.top}>
              <View>
                <Text style={styles.title}>My profile</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <TouchableOpacity onPress={() => navigation.push("Settings")}>
                  <SettingsIcon width={24} height={24} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MoreIcon width={24} height={24} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", gap: 9, alignItems: "center" }}
            >
              <Text style={styles.formattedName}>
                {handleUsernameFormatter(profile?.username)}
              </Text>
              <ArrowDownIcon
                width={10}
                height={10}
                style={{ marginBottom: 3 }}
              />
            </View>
          </>
        )}

        <View style={styles.info}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            {profile && (
              <>
                <Image
                  source={{ uri: profile.avatarPath }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    borderColor: "rgba(255,255,255,.2)",
                    borderWidth: 2,
                  }}
                />
                <Text style={styles.username}>{profile?.username}</Text>
                <Text style={styles.email}>{profile?.email}</Text>
              </>
            )}
          </View>
        </View>
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
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 24,
    color: "whitesmoke",
  },
  formattedName: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: "rgba(255,255,255,.5)",
    marginTop: -2,
  },
  info: {},
  username: {
    fontFamily: "PoppinsBold",
    fontSize: 19,
    color: "whitesmoke",
    marginTop: 5,
  },
  email: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: "rgba(255,255,255,.5)",
    marginTop: -5,
  },
});

export default Profile;
