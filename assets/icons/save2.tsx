import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { IIconProps } from "./tabBarIcons";

const SaveIcon2 = ({
  width = 24,
  height = 24,
  fill = "gray",
  selectedTab,
}: IIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="#000">
      <Path
        d="M15.0309 3.30271C13.0299 2.8991 10.9701 2.8991 8.96913 3.30271C6.66186 3.76809 5 5.82231 5 8.20894V18.6292C5 20.4579 6.9567 21.596 8.51221 20.6721L11.3451 18.9895C11.7496 18.7492 12.2504 18.7492 12.6549 18.9895L15.4878 20.6721C17.0433 21.596 19 20.4579 19 18.6292V8.20894C19 5.82231 17.3381 3.76809 15.0309 3.30271Z"
        fill={fill}
      />
    </Svg>
  );
};

export default SaveIcon2;
