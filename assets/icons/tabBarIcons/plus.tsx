import React from "react";
import { IIconProps } from ".";
import Svg, { G, Path } from "react-native-svg";

const PlusIcon = ({ width = 24, height = 24, fill = "gray" }: IIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="#000000">
      <G id="Icon/General/Plus">
        <Path
          id="Union"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.3865 5.38754C13.3865 4.62122 12.7658 4 12.0001 4C11.2345 4 10.6138 4.62122 10.6138 5.38754V10.6124H5.38636C4.62069 10.6124 4 11.2337 4 12C4 12.7663 4.62069 13.3875 5.38636 13.3875H10.6138V18.6125C10.6138 19.3788 11.2345 20 12.0001 20C12.7658 20 13.3865 19.3788 13.3865 18.6125V13.3875H18.6136C19.3793 13.3875 20 12.7663 20 12C20 11.2337 19.3793 10.6124 18.6136 10.6124H13.3865V5.38754Z"
          fill={fill}
        />
      </G>
    </Svg>
  );
};

export default PlusIcon;
