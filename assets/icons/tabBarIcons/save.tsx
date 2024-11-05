import React from "react";
import { IIconProps } from ".";
import Svg, { Path } from "react-native-svg";

const SaveIcon = ({
  width = 24,
  height = 24,
  fill = "gray",
  selectedTab,
}: IIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="#1e1e1e">
      <Path
        d="M18.5 18.8637V8.07579C18.5 5.99472 17.0378 4.20351 15.0077 3.7977C13.022 3.40077 10.978 3.40077 8.99225 3.7977C6.96219 4.20351 5.5 5.99472 5.5 8.07579V18.8637C5.5 20.1258 6.8627 20.9113 7.94601 20.2737L10.9053 18.5317C11.5814 18.1337 12.4186 18.1337 13.0947 18.5317L16.054 20.2737C17.1373 20.9113 18.5 20.1258 18.5 18.8637Z"
        fill={selectedTab === "savedRecipes" ? fill : "transparent"}
        stroke={
          selectedTab
            ? selectedTab === "savedRecipes"
              ? fill
              : "#9DB2CE"
            : fill
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SaveIcon;
