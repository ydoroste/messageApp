import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const Location: React.FC<IIconProps> = ({ width = 9, height = 16, color }) => {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color}
        d="M6.19961 0C3.10361 0 0.599609 2.504 0.599609 5.6C0.599609 9.8 6.19961 16 6.19961 16C6.19961 16 11.7996 9.8 11.7996 5.6C11.7996 2.504 9.29561 0 6.19961 0ZM6.19961 7.6C5.09561 7.6 4.19961 6.704 4.19961 5.6C4.19961 4.496 5.09561 3.6 6.19961 3.6C7.30361 3.6 8.19961 4.496 8.19961 5.6C8.19961 6.704 7.30361 7.6 6.19961 7.6Z"
      />
    </Svg>
  );
};

export default Location;
