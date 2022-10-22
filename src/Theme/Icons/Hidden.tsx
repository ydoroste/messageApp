import * as React from "react";
import {IIconProps} from "./types/IconTypes";
import Svg, { Path } from "react-native-svg"

const Hidden: React.FC<IIconProps> = ({width, height, color}) => {
    return (
        <Svg
            //xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 19 16"
            fill="none"
        >
            <Path
                d="M12.602 8.507l-1.225-1.225c.127-.661-.063-1.28-.57-1.857-.506-.577-1.16-.802-1.963-.676L7.62 3.525c.24-.113.482-.197.728-.253.246-.057.51-.085.792-.085 1.055 0 1.952.37 2.692 1.108.738.74 1.107 1.636 1.107 2.692 0 .281-.028.545-.084.792-.056.246-.14.488-.253.728zm2.701 2.66L14.08 9.983a9.251 9.251 0 001.425-1.34 7.513 7.513 0 001.066-1.657 8.302 8.302 0 00-3.03-3.388c-1.315-.837-2.782-1.256-4.4-1.256-.408 0-.81.028-1.203.084-.394.057-.781.141-1.161.254L5.467 1.372A9.378 9.378 0 019.14.654c2.012 0 3.82.531 5.425 1.594 1.604 1.062 2.807 2.445 3.61 4.148.041.07.07.158.084.263.014.106.02.215.02.328a1.674 1.674 0 01-.105.59 9.204 9.204 0 01-2.87 3.59zm-.168 4.6l-2.956-2.912c-.492.155-.988.27-1.487.349-.5.077-1.017.115-1.552.115-2.012 0-3.82-.53-5.425-1.593C2.111 10.663.908 9.281.105 7.578a.686.686 0 01-.084-.264 2.464 2.464 0 010-.644.673.673 0 01.085-.253A9.496 9.496 0 011.16 4.665c.408-.535.858-1.027 1.35-1.478L.76 1.414a.788.788 0 01-.232-.58C.528.6.612.4.78.231A.8.8 0 011.372 0a.8.8 0 01.591.232l14.354 14.354a.827.827 0 01.243.58.787.787 0 01-.243.602.8.8 0 01-.591.232.8.8 0 01-.591-.232zM3.694 4.37a9.067 9.067 0 00-1.119 1.204 7.612 7.612 0 00-.865 1.414 8.297 8.297 0 003.028 3.387c1.316.838 2.784 1.257 4.402 1.257.281 0 .556-.018.823-.053.267-.035.542-.074.823-.116l-.76-.802a3.807 3.807 0 01-.443.094c-.14.022-.288.032-.443.032-1.056 0-1.953-.369-2.692-1.107-.738-.74-1.108-1.637-1.108-2.692 0-.155.01-.303.032-.443.021-.141.053-.289.095-.444L3.694 4.37z"
                fill={color}
            />
        </Svg>
    );
};

export default Hidden;
