import * as React from "react";
import {TextInput} from "react-native-paper";
import {buttonTypes} from "@followBack/GenericElements/Button/types";

export type IInputFieldProps =  React.ComponentProps<typeof TextInput> & {
    initialValue?: string
};