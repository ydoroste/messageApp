import * as React from "react";
import {IIconProps} from "./types/IconTypes";
import Svg, { Path } from "react-native-svg"

const Lock: React.FC<IIconProps> = ({width, height, color}) => {
    return (
        <Svg
          //  xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 55 64"
            fill="none"
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.853 23.885h8.088c.421-7.67 4.53-16.004 14.559-16.004 9.674 0 14.025 8.784 14.559 16.004h8.088C50 10.246 42.592.132 27.5.001 12.505-.142 4.853 10.471 4.853 23.885zM0 31.54v27.278C0 62.814.907 64 4.853 64h45.294C54.368 64 55 62.879 55 58.818V31.54c0-3.945-.745-4.446-4.853-4.446H4.853C.954 27.094 0 27.801 0 31.54zm32.643 11.232c0 2.262-1.472 4.358-3.51 5.03l3.22 8.175h-9.706l3.22-8.174c-2.04-.674-3.511-2.676-3.511-4.939 0-2.824 2.296-5.15 5.143-5.15 2.846 0 5.144 2.234 5.144 5.058z"
                fill={color}
            />
        </Svg>
    );
};

export default Lock;
