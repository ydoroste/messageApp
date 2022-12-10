import { TextInput } from 'react-native-paper';
import * as React from "react";
import {IInputFieldProps} from "@followBack/GenericElements/InputField/types";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
import {ForwardedRef, forwardRef, memo} from "react";
import {TextInput as RNTextInput} from "react-native-paper"

const InputField: React.FC<IInputFieldProps> = forwardRef(({error, value, hideBorder, ...props}, ref: ForwardedRef<typeof RNTextInput>)=>{
    const {styles} = useStyles();
    const {colors, fontFamilies} = useTheme();
    return (
        <TextInput
            {...props}
            // @ts-ignore
            ref={ref}
            keyboardAppearance="dark"
            value={value}
            underlineColor={ hideBorder ? "transparent" : error ? colors.red : colors.grey02}
            activeUnderlineColor={hideBorder ? "transparent" : error ? colors.red : colors.grey02}
            style={styles.inputField}
            selectionColor={colors.white}
            theme={{
                colors: {
                    text: error ? colors.red : colors.grey03,
                    placeholder: colors.grey02
                },
                fonts: {regular: {fontFamily: fontFamilies.OpenSans_400Regular}}
            }}
        />
    );
});

const useStyles = useStylesWithTheme(theme => ({
    inputField: {
        height: 40,
        backgroundColor: "transparent",
        borderBottom: theme.colors.grey02,
        fontSize: theme.fontSizes.medium,
        lineHeight: theme.lineHeights.medium,
        fontFamily: theme.fontFamilies.OpenSans_400Regular,
        color: theme.colors.white,
        paddingHorizontal: -10
    }
}));
export default memo(InputField);