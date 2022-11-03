import { Button } from 'react-native-paper';
import {colorTypes, typographyTypes} from "@followBack/GenericElements/Typography/types";
import * as React from "react";




export type IButtonProps =  React.ComponentProps<typeof Button> & {
    type: buttonTypes
};

export type buttonTypes = "primary" | "secondary" | "ternary";

export  type buttonMode = "contained" | "text";

export interface IButtonTypes {
        mode: buttonMode,
        textType: typographyTypes,
        textColorType: colorTypes,
        textDecoration?: "underline",
        showLabelStyle?: boolean
}