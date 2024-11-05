import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import SectionTop from "@/components/SectionTop/SectionTop";

const PopularCreators = () => {
  const [usersData, setUsersData] = useState([
    {
      id: 1,
      username: "Troyan Smith",
      avatarPath: require("../../../assets/images/users/user01.png"),
    },
    {
      id: 2,
      username: "James Wolden",
      avatarPath: require("../../../assets/images/users/user02.png"),
    },
    {
      id: 3,
      username: "Niki Samantha",
      avatarPath: require("../../../assets/images/users/user03.png"),
    },
    {
      id: 4,
      username: "Roberta Anny",
      avatarPath: require("../../../assets/images/users/user04.png"),
    },
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <SectionTop
          title="Popular creators"
          link="/(auth)/onBoarding"
          linkText="See all"
        />
      </View>
      <View
        style={{
          marginTop: 16,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {usersData.map((user) => (
          <View style={styles.user} key={user.id}>
            <Image
              source={user.avatarPath}
              style={{
                borderRadius: 75,
                resizeMode: "cover",
                width: 75,
                height: 75,
              }}
            />
            <Text
              style={styles.username}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {user.username}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: 30 },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  user: {
    maxWidth: 75,
  },
  username: {
    fontFamily: "PoppinsBold",
    fontSize: 12,
    textAlign: "center",
    color: "whitesmoke",
    marginTop: 8,
  },
});

export default PopularCreators;
