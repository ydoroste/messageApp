import * as React from "react";
import {Divider} from "react-native-paper";

export type IDividerProps =  React.ComponentProps<typeof Divider> & {
    marginTop?: number
    marginBottom?: number
}