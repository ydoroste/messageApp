import * as React from "react";
import {TextInput} from "react-native-paper";

export type IInputFieldProps =  React.ComponentProps<typeof TextInput> & {
    initialValue?: string
};