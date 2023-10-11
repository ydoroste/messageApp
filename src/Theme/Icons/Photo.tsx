import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const Photo: React.FC<IIconProps> = ({ width = 9, height = 16, color }) => {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color}
        d="M16 11.2V1.6C16 0.72 15.28 0 14.4 0H4.8C3.92 0 3.2 0.72 3.2 1.6V11.2C3.2 12.08 3.92 12.8 4.8 12.8H14.4C15.28 12.8 16 12.08 16 11.2ZM7.2 8L8.824 10.168L11.2 7.2L14.4 11.2H4.8L7.2 8ZM0 3.2V14.4C0 15.28 0.72 16 1.6 16H12.8V14.4H1.6V3.2H0Z"
      />
    </Svg>
  );
};

export default Photo;
