import * as React from "react";
import {TextInput} from "react-native-paper";

export type IInputFieldProps =  React.ComponentPropsWithoutRef<typeof TextInput> & {
    initialValue?: string,
    hideBorder?: boolean;
    textColor?: string
};