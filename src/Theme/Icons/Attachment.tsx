import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const Attachment: React.FC<IIconProps> = ({
  width = 9,
  height = 16,
  color,
}) => {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color}
        d="M4.4 16c-1.227 0-2.267-.427-3.12-1.28C.427 13.867 0 12.827 0 11.6V3.2C0 2.32.313 1.567.94.94A3.081 3.081 0 0 1 3.2 0c.88 0 1.633.313 2.26.94.627.627.94 1.38.94 2.26v7.6c0 .56-.193 1.033-.58 1.42-.387.387-.86.58-1.42.58-.56 0-1.033-.193-1.42-.58a1.931 1.931 0 0 1-.58-1.42v-7a.58.58 0 0 1 .6-.6.583.583 0 0 1 .6.6v7c0 .227.077.416.23.57.153.153.343.23.57.23a.775.775 0 0 0 .57-.23.773.773 0 0 0 .23-.57V3.2c0-.56-.193-1.033-.58-1.42A1.931 1.931 0 0 0 3.2 1.2c-.56 0-1.033.193-1.42.58-.387.387-.58.86-.58 1.42v8.4c0 .88.313 1.633.94 2.26.627.627 1.38.94 2.26.94.88 0 1.633-.313 2.26-.94.627-.627.94-1.38.94-2.26V3.8a.58.58 0 0 1 .6-.6.583.583 0 0 1 .6.6v7.8c0 1.227-.427 2.267-1.28 3.12C6.667 15.573 5.627 16 4.4 16Z"
      />
    </Svg>
  );
};

export default Attachment;
