import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const Forward: React.FC<IIconProps> = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 14" fill="none">
      <Path
        d="M9.77778 3.74207V0.0185547L16 6.53471L9.77778 13.0509V9.23426C5.33333 9.23426 2.22222 10.7237 0 13.9818C0.888888 9.32735 3.55556 4.67295 9.77778 3.74207Z"
        fill={color}
      />
    </Svg>
  );
};

export default Forward;
