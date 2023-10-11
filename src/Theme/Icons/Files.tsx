import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const Files: React.FC<IIconProps> = ({ width = 9, height = 16, color }) => {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color}
        d="M6.4 0H1.6C0.72 0 0.00799999 0.72 0.00799999 1.6L0 11.2C0 12.08 0.72 12.8 1.6 12.8H14.4C15.28 12.8 16 12.08 16 11.2V3.2C16 2.32 15.28 1.6 14.4 1.6H8L6.4 0Z"
      />
    </Svg>
  );
};

export default Files;
