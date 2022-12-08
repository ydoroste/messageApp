import * as React from "react";
import {IIconProps} from "./types/IconTypes";
import Svg, { Path } from "react-native-svg"

const Close: React.FC<IIconProps> = ({width, height, color}) => {
    return (
            <Svg
                width={width}
                height={height}
                viewBox="0 0 16 14"
                fill="none"
            >
                <Path
                    d="M1.151 13.884l14.35-6.15a.823.823 0 000-1.513L1.15.07A.816.816 0 00.008.818L0 4.608c0 .412.304.766.715.815l11.62 1.554L.715 8.523A.832.832 0 000 9.345l.008 3.791c0 .584.6.987 1.143.748z"
                    fill={color}
                />
            </Svg>
    );
};

export default Close;
