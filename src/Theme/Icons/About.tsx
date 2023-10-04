import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const About: React.FC<IIconProps> = ({ width = 30, height = 31, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 31" fill="none">
      <Path
        d="M21.2128 0.772969L30 9.55866V21.9842L21.2128 30.7714H8.78724L0 21.9842V9.55866L8.78724 0.771423H21.2128V0.772969ZM13.1445 20.1009V23.1933H16.237V20.1009H13.1445ZM13.1445 7.73102V17.0084H16.237V7.73102H13.1445Z"
        fill={color}
      />
    </Svg>
  );
};

export default About;
