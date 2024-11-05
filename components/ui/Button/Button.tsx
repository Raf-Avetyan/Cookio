import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SvgProps } from "react-native-svg";
import { Colors } from "@/constants/Colors";

interface IButton {
  type: "primary" | "secondary" | "text";
  size: "large" | "small";
  state: "default" | "pressed" | "disable";
  text?: string;
  Icon?: React.FC<SvgProps>;
  onPress?: () => void;
}

const Button = ({
  type,
  state,
  size,
  text,
  Icon,
  onPress,
  ...props
}: IButton) => {
  const getBtnStyles = () => {
    switch (type) {
      case "primary":
        return {
          backgroundColor:
            state == "default"
              ? Colors.Primary[50]
              : state == "pressed"
              ? Colors.Primary[80]
              : Colors.Neutral[20],
          color: state == "disable" ? Colors.Neutral[50] : Colors.bgColor,
        };
      case "secondary":
        return {
          borderWidth: 1,
          borderColor:
            state == "disable" ? Colors.Neutral[20] : Colors.Primary[50],
          backgroundColor:
            state == "pressed" ? Colors.Primary[10] : "transparent",
          color: state == "disable" ? Colors.Neutral[50] : Colors.Primary[80],
        };
      case "text":
        return;
    }
  };

  const getBtnTextStyles = () => {
    switch (type) {
      case "primary":
        return {
          color: state == "disable" ? Colors.Neutral[50] : Colors.bgColor,
        };
      case "secondary":
        return {
          color:
            state == "pressed"
              ? Colors.Primary[80]
              : state == "disable"
              ? Colors.Neutral[50]
              : state == "default" && !!Icon
              ? Colors.Primary[50]
              : Colors.Primary[20],
        };
      case "text":
        return {
          color:
            state == "pressed"
              ? Colors.Primary[80]
              : state == "disable"
              ? Colors.Neutral[50]
              : state == "default" && !!Icon
              ? Colors.Primary[50]
              : Colors.Primary[20],
        };
    }
  };

  const getBtnIconStyles = () => {
    switch (type) {
      case "primary":
        return state == "disable" ? Colors.Neutral[50] : Colors.bgColor;
      case "secondary":
        return state == "pressed"
          ? Colors.Primary[80]
          : state == "disable"
          ? Colors.Neutral[50]
          : Colors.Primary[50];
      case "text":
        return state == "pressed"
          ? Colors.Primary[80]
          : state == "disable"
          ? Colors.Neutral[50]
          : Colors.Primary[50];
    }
  };

  const styles = StyleSheet.create({
    button: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      columnGap: 14,
      borderRadius: 10,
      paddingVertical: size == "large" ? 16 : 8,
      paddingHorizontal:
        text && size == "large" ? 32 : !text && size == "small" ? 8 : 16,
      ...getBtnStyles(),
    },
    text: {
      fontFamily: "PoppinsBold",
      fontSize: 16,
      ...getBtnTextStyles(),
    },
    icon: {},
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} {...props}>
      {text && <Text style={styles.text}>{text}</Text>}
      {Icon && (
        <View>
          <Icon width={22} height={22} fill={getBtnIconStyles()} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
