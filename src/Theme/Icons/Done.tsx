import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const Done: React.FC<IIconProps> = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 12" fill="none">
      <Path
        d="M5.46281 9.09633L14.218 0.341167C14.4246 0.134556 14.6699 0.03125 14.954 0.03125C15.2381 0.03125 15.4835 0.134556 15.6901 0.341167C15.8967 0.547779 16 0.79313 16 1.07722C16 1.36131 15.8967 1.60666 15.6901 1.81327L6.18595 11.3174C5.97934 11.524 5.73829 11.6273 5.46281 11.6273C5.18733 11.6273 4.94628 11.524 4.73967 11.3174L0.297521 6.87526C0.0909091 6.66865 -0.00809229 6.4233 0.000516529 6.1392C0.00912534 5.85511 0.116736 5.60976 0.323347 5.40315C0.529959 5.19654 0.77531 5.09323 1.0594 5.09323C1.34349 5.09323 1.58884 5.19654 1.79545 5.40315L5.46281 9.09633Z"
        fill={color}
      />
    </Svg>
  );
};

export default Done;
