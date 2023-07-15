import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const Pin: React.FC<IIconProps> = ({ width = 25, height = 35, color = "#696969" }) => {
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
<Path d="M20.1886 0.771484H3.81182C2.21755 0.771484 0.913208 2.07583 0.913208 3.67009V28.9599C0.913208 29.6484 1.31177 30.3004 1.9277 30.5903C2.57974 30.8802 3.30457 30.8076 3.84798 30.3729L3.88413 30.3368L12.0001 23.489L20.116 30.3368L20.1521 30.3729C20.4782 30.6267 20.8767 30.7715 21.2752 30.7715C21.529 30.7715 21.8186 30.6989 22.0723 30.5541C22.6883 30.2642 23.0868 29.6122 23.0868 28.9238V3.67019C23.0868 2.07592 21.7825 0.771575 20.1882 0.771575L20.1886 0.771484Z" fill={color}/>
</Svg>

  );
};

export default Pin;
