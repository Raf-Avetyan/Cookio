import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SvgProps } from "react-native-svg";
import { Colors } from "@/constants/Colors";

interface ISearchInput {
  Icon?: React.FC<SvgProps>;
  disabled?: boolean;
  placeholder?: string;
}

const Searchinput = ({ placeholder, disabled, Icon }: ISearchInput) => {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      {Icon && <Icon width={24} height={24} style={styles.icon} />}
      <Text style={styles.placeholder}>
        {text.length === 0 ? placeholder : ""}
      </Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholderTextColor="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -12 }],
    left: 16,
  },
  input: {
    borderColor: Colors.Neutral[70],
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    paddingLeft: 50,
  },
  placeholder: {
    position: "absolute",
    left: 55,
    top: "50%",
    transform: [{ translateY: -11 }],
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    color: Colors.Neutral[70],
  },
});

export default Searchinput;
