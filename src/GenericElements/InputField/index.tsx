import { TextInput as DefaultTextInput } from "react-native-paper";
import * as React from "react";
import { IInputFieldProps } from "@followBack/GenericElements/InputField/types";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
import { ForwardedRef, forwardRef, memo, RefObject } from "react";
import { TextInput } from "react-native/types";
import {Theme} from "@followBack/Theme/Theme.types";
import {
  StyleSheet,
} from "react-native";


const InputField = forwardRef<TextInput, IInputFieldProps>(
  (
    { error, value, hideBorder, mode, textColor, focused = false, onFocus, onBlur, inputMaxHeight = 250, ...props },
    ref
  ) => {
    
    const theme = useTheme()

    const styles = useStyles(inputMaxHeight, theme);
    const { colors, fontFamilies } = useTheme();
    const inputMode = mode ? mode : "flat";
    const defaultTextColor = textColor ? textColor : colors.gray01;
    return (
      <DefaultTextInput
        {...props}
        ref={ref}
        mode={inputMode}
        keyboardAppearance="dark"
        value={value}
        underlineColor={
          hideBorder ? "transparent" : error ? colors.red : colors.grey02
        }

        activeUnderlineColor={
          hideBorder ? "transparent" : error ? colors.red : colors.grey02
        }
        outlineStyle={{padding: 0, minHeight: 20, paddingTop: 0 }}
        outlineColor={colors.dark02}
        activeOutlineColor={colors.dark02}
        style={[styles.inputField, styles[inputMode]]}
        selectionColor={colors.white}
        placeholderTextColor={colors.grey02}
        onFocus={onFocus}
        onBlur={onBlur}
        textColor={defaultTextColor}
        contentStyle={{paddingTop: 8, paddingBottom: 8, minHeight: 20}}
        dense
        theme={{
          roundness: 32,
          colors: {
            text: error ? colors.red : colors.grey03,
          },
          fonts: { regular: { fontFamily: fontFamilies.OpenSans_400Regular } },
        }}
      />
    );
  }
);

const useStyles = (inputMaxHeight: number, theme: Theme) => StyleSheet.create({
  inputField: {
    backgroundColor: "transparent",
    borderBottom: theme.colors.grey02,
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.lineHeights.medium,
    fontFamily: theme.fontFamilies.OpenSans_400Regular,
    color: theme.colors.white,
    paddingHorizontal: 0,
    width: "100%",
  },
  outlined: {
    minHeight: 25,
    maxHeight:inputMaxHeight,
    fontSize: theme.fontSizes.large,
    lineHeight: theme.lineHeights.medium,
  },
  flat: {
    height: 40,
  },
});
export default memo(InputField);
