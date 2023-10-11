import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const CloseBold: React.FC<IIconProps> = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 10 10" fill="none">
      <Path
        d="M1 1L9 9"
        stroke="#E2E2E2"
        stroke-width="2"
        stroke-linecap="round"
      />
      <Path
        d="M9 1L1 9"
        stroke="#E2E2E2"
        stroke-width="2"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default CloseBold;
