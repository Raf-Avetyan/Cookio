import React from "react";
import { IIconProps } from ".";
import Svg, { Path } from "react-native-svg";

const HomeIcon = ({
  width = 24,
  height = 24,
  fill = "gray",
  selectedTab,
}: IIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="transparent">
      <Path
        d="M9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016Z"
        stroke={selectedTab === "home" ? fill : "#b5b5b5"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 17.9902V14.9902"
        stroke={selectedTab === "home" ? fill : "#b5b5b5"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HomeIcon;
