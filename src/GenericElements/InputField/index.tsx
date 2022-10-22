import { TextInput } from 'react-native-paper';
import * as React from "react";
import {IInputFieldProps} from "@followBack/GenericElements/InputField/types";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
import {memo} from "react";

const InputField: React.FC<IInputFieldProps> = ({initialValue = "", label, error, ...props})=>{
    const [text, setText] = React.useState<string>(initialValue);
    const {styles} = useStyles();
    const {colors, fontFamilies} = useTheme();
    const onTextChange =(text: string)=>{
        setText(text)
    };
    return (
        <TextInput
            {...props}
            label={label}
            value={text}
            underlineColor={error ? colors.red :colors.grey02}
            activeUnderlineColor={error ? colors.red :colors.grey02}
            onChangeText={onTextChange}
            style={styles.inputField}
            selectionColor={colors.white}
            theme={{
                colors: {
                    text: error ? colors.red :colors.grey03,
                    placeholder: colors.grey02
                },
                fonts: { regular: {fontFamily: fontFamilies.OpenSans_400Regular} }
            }}
        />
    );
};

const useStyles = useStylesWithTheme(theme => ({
    inputField: {
        height: 40,
        backgroundColor: "transparent",
        borderBottom: theme.colors.grey02,
        borderWidth: 1,
        fontSize: theme.fontSizes.meduim,
        lineHeight: theme.lineHeights.medium,
        fontFamily: theme.fontFamilies.OpenSans_700Bold,
        color: theme.colors.white,
        paddingHorizontal: -10
    }
}));
export default memo(InputField);