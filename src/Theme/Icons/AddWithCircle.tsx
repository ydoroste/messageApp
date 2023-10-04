import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Rect, Circle } from "react-native-svg";

const AddWithCircle: React.FC<IIconProps> = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Rect
        x="14.0547"
        y="8.27777"
        width="1.88889"
        height="13.4444"
        rx="0.944445"
        fill={color}
        stroke="#303030"
      />
      <Rect
        x="21.7217"
        y="13.8333"
        width="2.33333"
        height="13.4444"
        rx="1.16667"
        transform="rotate(90 21.7217 13.8333)"
        fill={color}
        stroke="#303030"
      />
      <Circle cx="15" cy="15" r="14.5" stroke="#303030" />
    </Svg>
  );
};

export default AddWithCircle;
