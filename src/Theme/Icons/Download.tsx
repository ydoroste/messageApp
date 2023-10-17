import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path } from "react-native-svg";

const Download: React.FC<IIconProps> = ({ width = 16, height = 17, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 17" fill="none">
      <Path
        d="M4.8 12.5H11.2C11.4267 12.5 11.6167 12.4233 11.77 12.27C11.9233 12.1167 12 11.9267 12 11.7C12 11.4733 11.9233 11.2833 11.77 11.13C11.6167 10.9767 11.4267 10.9 11.2 10.9H4.8C4.57333 10.9 4.38333 10.9767 4.23 11.13C4.07667 11.2833 4 11.4733 4 11.7C4 11.9267 4.07667 12.1167 4.23 12.27C4.38333 12.4233 4.57333 12.5 4.8 12.5ZM7.2 7.02L6.48 6.32C6.33333 6.17333 6.15 6.1 5.93 6.1C5.71 6.1 5.52 6.18 5.36 6.34C5.21333 6.48667 5.14 6.67333 5.14 6.9C5.14 7.12667 5.21333 7.31333 5.36 7.46L7.44 9.54C7.6 9.7 7.78667 9.78 8 9.78C8.21333 9.78 8.4 9.7 8.56 9.54L10.64 7.46C10.7867 7.31333 10.8633 7.13 10.87 6.91C10.8767 6.69 10.8 6.5 10.64 6.34C10.4933 6.19333 10.31 6.11667 10.09 6.11C9.87 6.10333 9.68 6.17333 9.52 6.32L8.8 7.02V4.5C8.8 4.27333 8.72333 4.08333 8.57 3.93C8.41667 3.77667 8.22667 3.7 8 3.7C7.77333 3.7 7.58333 3.77667 7.43 3.93C7.27667 4.08333 7.2 4.27333 7.2 4.5V7.02ZM8 16.5C6.89333 16.5 5.85333 16.29 4.88 15.87C3.90667 15.45 3.06 14.88 2.34 14.16C1.62 13.44 1.05 12.5933 0.63 11.62C0.21 10.6467 0 9.60667 0 8.5C0 7.39333 0.21 6.35333 0.63 5.38C1.05 4.40667 1.62 3.56 2.34 2.84C3.06 2.12 3.90667 1.55 4.88 1.13C5.85333 0.71 6.89333 0.5 8 0.5C9.10667 0.5 10.1467 0.71 11.12 1.13C12.0933 1.55 12.94 2.12 13.66 2.84C14.38 3.56 14.95 4.40667 15.37 5.38C15.79 6.35333 16 7.39333 16 8.5C16 9.60667 15.79 10.6467 15.37 11.62C14.95 12.5933 14.38 13.44 13.66 14.16C12.94 14.88 12.0933 15.45 11.12 15.87C10.1467 16.29 9.10667 16.5 8 16.5ZM8 14.9C9.78667 14.9 11.3 14.28 12.54 13.04C13.78 11.8 14.4 10.2867 14.4 8.5C14.4 6.71333 13.78 5.2 12.54 3.96C11.3 2.72 9.78667 2.1 8 2.1C6.21333 2.1 4.7 2.72 3.46 3.96C2.22 5.2 1.6 6.71333 1.6 8.5C1.6 10.2867 2.22 11.8 3.46 13.04C4.7 14.28 6.21333 14.9 8 14.9Z"
        fill={color}
      />
    </Svg>
  );
};

export default Download;