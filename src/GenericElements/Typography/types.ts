import { TextProps } from "react-native";
import { ReactNode } from "react";

export interface ITypographyProps extends TextProps {
  type: typographyTypes;
  color: colorTypes;
  textDecoration?: "underline";
  children: ReactNode;
  textAlign?: textAlignTypes;
  lineHeight?: number;
}

export type typographyTypes =
  | "smallRegularTitle"
  | "mediumRegularTitle"
  | "largeRegularTitle"
  | "mediumBoldTitle"
  | "largeBoldTitle"
  | "smallRegularBody"
  | "mediumRegularBody"
  | "smallBoldBody"
  | "mediumBoldBody"
  | "largeBoldBody"
  | "largeRegularBody";

export type colorTypes =
  | "primary"
  | "secondary"
  | "error"
  | "disabled"
  | "verified"
  | "chat"
  | "black"
  | "blue";

export type textAlignTypes =
  | "auto"
  | "left"
  | "right"
  | "center"
  | "justify"
  | undefined;
