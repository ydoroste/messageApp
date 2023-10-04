import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const VerticalLine: React.FC<IIconProps> = ({
  width = 30,
  height = 36,
  color,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 2 27" fill="none">
      <Path
        fill={color}
        d="M0.842896 1V26.5"
        stroke="#696969"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default VerticalLine;
