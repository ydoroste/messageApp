import * as React from "react";
import {Pressable} from "react-native";
import {IIconProps} from "./types/IconTypes";
import Svg, { Path } from "react-native-svg"

const Close: React.FC<IIconProps> = ({width, height, color, onPress}) => {
    return (
        <Pressable onPress={onPress}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 18 17"
                fill="none"
            >
                <Path
                    d="M1 .5l16 16M17 .5l-16 16"
                    stroke={color}
                    strokeLinecap="round"
                />
            </Svg>
        </Pressable>
    );
};

export default Close;
