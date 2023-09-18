import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Circle } from "react-native-svg";

const UnSelected: React.FC<IIconProps> = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
      <Circle cx="12" cy="12.0312" r="11.5" stroke="#696969" fill="none" />
    </Svg>
  );
};

export default UnSelected;
