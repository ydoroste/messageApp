import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const Reply: React.FC<IIconProps> = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 15" fill="none">
      <Path
        d="M6.41667 2.83125V0.03125L0 6.56458L6.41667 13.0979V10.2979L2.75 6.56458L6.41667 2.83125ZM11.9167 3.76458V0.03125L5.5 6.56458L11.9167 13.0979V9.27125C16.5 9.27125 19.7083 10.7646 22 14.0312C21.0833 9.36458 18.3333 4.69792 11.9167 3.76458Z"
        fill={color}
      />
    </Svg>
  );
};

export default Reply;
