import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const Contact: React.FC<IIconProps> = ({ width = 9, height = 16, color }) => {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color}
        d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z"
      />
    </Svg>
  );
};

export default Contact;