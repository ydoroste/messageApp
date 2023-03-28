import { TextInput } from "react-native-paper";
import * as React from "react";
import { IInputFieldProps } from "@followBack/GenericElements/InputField/types";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
import { ForwardedRef, forwardRef, memo } from "react";
import { TextInput as RNTextInput } from "react-native-paper";

const InputField: React.FC<IInputFieldProps> = forwardRef(
  (
    { error, value, hideBorder, mode, ...props },
    ref: ForwardedRef<typeof RNTextInput>
  ) => {
    const { styles } = useStyles();
    const { colors, fontFamilies } = useTheme();
    const inputMode = mode ? mode : "flat";
    return (
      <TextInput
        {...props}
        // @ts-ignore
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
        outlineColor={colors.dark02}
        activeOutlineColor={colors.dark02}
        style={[styles.inputField, styles[inputMode]]}
        selectionColor={colors.white}
        placeholderTextColor={colors.grey02}
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

const useStyles = useStylesWithTheme((theme) => ({
  inputField: {
    backgroundColor: "transparent",
    borderBottom: theme.colors.grey02,
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.lineHeights.medium,
    fontFamily: theme.fontFamilies.OpenSans_400Regular,
    color: theme.colors.white,
    paddingHorizontal: 0,
  },
  outlined: {
    minHeight: 20,
    maxHeight: 200,
    fontSize: theme.fontSizes.large,
    lineHeight: theme.lineHeights.medium,
  },
  flat: {
    height: 40,
  },
}));
export default memo(InputField);
