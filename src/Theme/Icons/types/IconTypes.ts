import {GestureResponderEvent} from "react-native";

export interface IIconProps {
    width: number,
    height: number,
    color: string,
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined

}