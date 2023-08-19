import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from "react-native-confirmation-code-field";
import {Dimensions, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import Typography from "@followBack/GenericElements/Typography";
import {ICodeVerificationFields} from "@followBack/GenericElements/CodeVerificationFields/types";

const width = Dimensions.get("window").width;
const CELL_COUNT = 6;
const CodeVerificationFields: React.FC<ICodeVerificationFields> = ({
                                                                       error, onChange = () => {
    }
                                                                   }) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const {styles} = useStyles();
    const setTextValue = (text: string) => {
        setValue(text);
    };
    useEffect(() => {
        onChange(value);
    }, [value]);

    return <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setTextValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        keyboardAppearance="dark"
        renderCell={({index, symbol, isFocused}) => (
            <View
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell, error && styles.error]}>
                <Typography
                    color={error ? "error" : "primary"}
                    type="largeRegularBody">
                    {symbol || (isFocused ? <Cursor/> : null)}</Typography>
            </View>
        )}
    />

};
export default CodeVerificationFields;
const useStyles = useStylesWithTheme(theme => ({
    root:
        {
            paddingHorizontal: 50,
            justifyContent: "center",
            alignItems: "center",
        },
    codeFieldRoot: {
        marginTop: 20,

    },
    cellRoot: {
        width: (width - 200) / 6,
        height: (width - 200) / 6,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: theme.colors.grey02,
        borderBottomWidth: 1,
    },
    focusCell: {
        borderBottomColor: theme.colors.grey02,
        borderBottomWidth: 2,
    },
    error: {
        borderBottomColor: theme.colors.red
    }
}));