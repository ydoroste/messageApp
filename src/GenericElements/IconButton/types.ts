import { IIconProps } from "@followBack/Theme/Icons/types/IconTypes";
import { GestureResponderEvent } from "react-native";

export interface IIconButtonProps extends IIconProps {
  onPress?: ((e: GestureResponderEvent) => void) | undefined;
  name: iconsType;
  disabled?: boolean;
}

export type iconsType =
  | "close"
  | "hidden"
  | "shown"
  | "send"
  | "delete"
  | "add"
  | "downArrow"
  | "drawer"
  | "back"
  | "pin"
  | "attachment"
  | "bookmark"
  | "copy"
  | "edit"
  | "reply"
  | "selectmore"
  | "unsend"
  | "done"
  | "unselected"
  | "more"
  | "forward"
  | "verified"
  | "about"
  | "trash"
  | "settings"
  | "message"
  | "addwithcircle"
  | "verticalline"
  | "smallpin"
  | "alert"
  | "bigalert"
  | "photo"
  | "files"
  | "camera"
  | "gif"
  | "contact"
  | "location"
  | "voicenote"
  | "closebold"
  | "play"
  | "saveall"
  | "file"
  | "download";
