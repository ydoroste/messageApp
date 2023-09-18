import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const Bookmark: React.FC<IIconProps> = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 13 17" fill="none">
      <Path
        d="M10.7344 0.03125H2.26579C1.44138 0.03125 0.766891 0.726901 0.766891 1.57718V15.0651C0.766891 15.4323 0.972992 15.78 1.29149 15.9346C1.62867 16.0892 2.00349 16.0505 2.28449 15.8187L2.30318 15.7994L6.50001 12.1472L10.6968 15.7994L10.7155 15.8187C10.8841 15.954 11.0902 16.0312 11.2963 16.0312C11.4275 16.0312 11.5773 15.9926 11.7085 15.9153C12.027 15.7607 12.2331 15.4129 12.2331 15.0458V1.57722C12.2331 0.726949 11.5586 0.0312983 10.7342 0.0312983L10.7344 0.03125Z"
        fill={color}
      />
    </Svg>
  );
};

export default Bookmark;
