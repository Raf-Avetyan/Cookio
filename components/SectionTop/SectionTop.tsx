import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Href, Link } from "expo-router";
import ArrowRight from "../../assets/icons/arrow-right.svg";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ISectionTop {
  title: string;
  link?: Href<string | object>;
  linkText?: string;
  fontSize?: number;
}

const SectionTop = ({ link, linkText, title, fontSize = 20 }: ISectionTop) => {
  return (
    <>
      <Text style={[styles.title, { fontSize }]}>{title}</Text>
      {link && linkText ? (
        <TouchableOpacity>
          <Link href={link}>
            <View style={styles.moreLink}>
              <Text style={styles.moreLinkText}>{linkText}</Text>
              <ArrowRight
                width={20}
                height={20}
                fill={Colors.Primary[50]}
                style={{ marginBottom: 2 }}
              />
            </View>
          </Link>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "PoppinsSemibold",
    color: "whitesmoke",
  },
  moreLink: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  moreLinkText: {
    fontFamily: "PoppinsSemibold",
    fontSize: 14,
    color: Colors.Primary[50],
  },
});

export default SectionTop;
