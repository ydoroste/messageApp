import { useMemo } from "react";
import { StyleSheet } from "react-native";
import useTheme from "@followBack/Hooks/useTheme";
import { Theme } from "@followBack/Theme/Theme.types";

export default (
  cb: cbType
): (() => { styles: ReturnType<typeof StyleSheet.create> }) => {
  return () => {
    const theme = useTheme();
    return useMemo(
      () => ({
        styles: cb(theme),
      }),
      []
    );
  };
};
export type cbType = (theme: Theme) => ReturnType<typeof StyleSheet.create>;
