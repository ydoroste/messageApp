import * as React from "react";
import {IIconProps} from "./types/IconTypes";
import Svg, { Path } from "react-native-svg"

const Add: React.FC<IIconProps> = ({width, height, color}) => {
    return (
            <Svg
                width={width}
                height={height}
                viewBox="0 0 18 18"
                fill="none"
            >
                <Path
                    d="M17 9H1M9 1v16"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke={color}
                />
            </Svg>
    );
};

export default Add;
