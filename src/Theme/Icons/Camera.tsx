import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const Camera: React.FC<IIconProps> = ({ width = 9, height = 16, color }) => {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color}
        d="M7.99945 10.5599C9.4133 10.5599 10.5595 9.41379 10.5595 7.99994C10.5595 6.58609 9.4133 5.43994 7.99945 5.43994C6.5856 5.43994 5.43945 6.58609 5.43945 7.99994C5.43945 9.41379 6.5856 10.5599 7.99945 10.5599Z"
      />
      <Path
        fill={color}
        d="M5.6 0L4.136 1.6H1.6C0.72 1.6 0 2.32 0 3.2V12.8C0 13.68 0.72 14.4 1.6 14.4H14.4C15.28 14.4 16 13.68 16 12.8V3.2C16 2.32 15.28 1.6 14.4 1.6H11.864L10.4 0H5.6ZM8 12C5.792 12 4 10.208 4 8C4 5.792 5.792 4 8 4C10.208 4 12 5.792 12 8C12 10.208 10.208 12 8 12Z"
      />
    </Svg>
  );
};

export default Camera;
