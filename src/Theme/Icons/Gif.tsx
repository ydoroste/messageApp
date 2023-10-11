import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const Gif: React.FC<IIconProps> = ({ width = 9, height = 16, color }) => {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color}
        d="M14.2222 0H1.77778C0.8 0 0 0.8 0 1.77778V14.2222C0 15.2 0.8 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V1.77778C16 0.8 15.2 0 14.2222 0ZM5.77778 8.88889V8H6.66667V8.88889C6.66667 9.37778 6.26667 9.77778 5.77778 9.77778H4.88889C4.4 9.77778 4 9.37778 4 8.88889V7.11111C4 6.62222 4.4 6.22222 4.88889 6.22222H5.77778C6.26667 6.22222 6.66667 6.62222 6.66667 7.11111H4.88889V8.88889H5.77778ZM8.44444 9.77778H7.55556V6.22222H8.44444V9.77778ZM12 7.11111H10.2222V7.55556H11.5556V8.44444H10.2222V9.77778H9.33333V6.22222H12V7.11111Z"
      />
    </Svg>
  );
};

export default Gif;
