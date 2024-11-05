import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import ArrowLeft from "../../../assets/icons/arrow-left.svg";
import ArrowRight from "../../../assets/icons/arrow-right2.svg";
import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { handleUsernameFormatter } from "./profile";
import * as SettingsIcons from "../../../assets/icons/settings/";
import { authService } from "@/services/auth.service";
import { router } from "expo-router";
import { StackParamList } from "@/types/navigation.types";

const settingsData = [
  {
    title: "Account",
    btns: [
      {
        title: "Email",
        icon: SettingsIcons.Email,
        size: 28,
      },
      {
        title: "Notifications",
        icon: SettingsIcons.Bell,
        size: 28,
      },
      {
        title: "Security",
        icon: SettingsIcons.Security,
        size: 24,
      },
    ],
  },
  {
    title: "Device",
    btns: [
      {
        title: "Language",
        icon: SettingsIcons.Earth,
        size: 23,
      },
      {
        title: "Display mode",
        icon: SettingsIcons.Mode,
        size: 23,
      },
    ],
  },
  {
    title: "System",
    btns: [
      {
        title: "Contact us",
        icon: SettingsIcons.UserTag,
        size: 27,
      },
      {
        title: "Term of use",
        icon: SettingsIcons.Info,
        size: 27,
      },
      {
        title: "About",
        icon: SettingsIcons.CodeBox,
        size: 27,
        scale: 1.15,
      },
      {
        title: "Check version",
        icon: SettingsIcons.SliderVertical,
        size: 26,
      },
      {
        title: "Logout",
        icon: SettingsIcons.Logout,
        size: 28,
        onPress: async () => {
          await authService.logout();
          router.replace("/(auth)/auth");
        },
      },
    ],
  },
];

const Settings = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<StackParamList, "Settings">;
}) => {
  const { data: profile, isFetched } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userService.getProfile(),
  });

  return (
    <ScrollView style={styles.conainer}>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginTop: 12,
          }}
        >
          <ArrowLeft width={30} height={30} />
          <Text style={styles.title}>Settings</Text>
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          {profile && (
            <>
              <View>
                <Image
                  source={{ uri: profile.avatarPath }}
                  width={80}
                  height={80}
                  style={{
                    borderRadius: 40,
                    borderColor: "rgba(255,255,255,.2)",
                    borderWidth: 2,
                  }}
                />
              </View>
              <View>
                <Text style={styles.username}>{profile.username}</Text>
                <Text style={styles.formattedUsername}>
                  @{handleUsernameFormatter(profile.username)}
                </Text>
                <TouchableOpacity style={styles.editBtn}>
                  <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        <View style={styles.settings}>
          {settingsData.map((item) => (
            <View key={item.title}>
              <Text style={styles.settingsTitle}>{item.title}</Text>
              <View
                style={{
                  display: "flex",
                  gap: 16,
                  marginTop: 8,
                  marginBottom: 18,
                }}
              >
                {item.btns.map((btn) => (
                  <TouchableOpacity
                    onPress={btn.onPress}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingLeft: 8,
                    }}
                    key={btn.title}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <btn.icon
                        width={btn.size}
                        height={btn.size}
                        style={{
                          flexBasis: "10%",
                          transform: [{ scale: btn.scale ? btn.scale : 1 }],
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: "PoppinsRegular",
                          fontSize: 14,
                          color: "whitesmoke",
                          lineHeight: 20,
                        }}
                      >
                        {btn.title}
                      </Text>
                    </View>
                    <View>
                      <ArrowRight width={15} height={15} />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  conainer: {
    backgroundColor: "#1E1E1E",
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 22,
    color: "whitesmoke",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginTop: 20,
  },
  username: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    color: "whitesmoke",
    lineHeight: 20,
  },
  formattedUsername: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    marginBottom: 2,
    color: "rgba(255,255,255,.5)",
  },
  editBtn: {
    backgroundColor: "rgba(255,255,255,.1)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingBottom: 2,
  },
  editBtnText: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: "whitesmoke",
    marginTop: 5,
  },
  settings: {
    marginTop: 40,
  },
  settingsTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    color: "whitesmoke",
  },
});

export default Settings;
