import * as React from "react";
import { Button as CustomButton } from 'react-native-paper';
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import {IButtonProps} from "@followBack/GenericElements/Button/types";
import Typography from "@followBack/GenericElements/Typography";
import {typesToButtons} from "@followBack/GenericElements/Button/utils";
import {memo} from "react";
import useTheme from "@followBack/Hooks/useTheme";

const Button: React.FC<IButtonProps> = ({disabled, children, type, ...props})=>{
    const {styles} = useStyles();
    const {colors} = useTheme();
    const {textType, textDecoration, textColorType, mode} = typesToButtons[type];
    return <CustomButton uppercase={false}
                         {...props}
                         disabled={disabled}
                         style={styles[type]}
                         mode={mode}
                         color={colors.grey03}
                         contentStyle={type === "primary" && styles.primaryContentStyle}
                         labelStyle={type === "primary" ? styles.primaryTextStyle : styles.textStyle}
    >
        <Typography type={textType}
                    color={disabled ? "disabled" : textColorType}
                    textDecoration={textDecoration}>{children}</Typography>
    </CustomButton>
};

const useStyles = useStylesWithTheme(theme => ({
    primary: {
        fontFamily: theme.fontFamilies.OpenSans_400Regular,
        backgroundColor: theme.colors.dark02,
        borderRadius: 31,
        height: 40,

    },
    secondary: {
        backgroundColor: "transparent",
        minWidth: 10,
        borderRadius: 0
    },
    ternary: {
        backgroundColor: "transparent",
        minWidth: 10,
        borderRadius: 0
    },
    textStyle: {
        marginHorizontal: 0,
        marginVertical: 0,
        fontFamily: theme.fontFamilies.OpenSans_400Regular,
        fontWeight: "400",
        fontSize: 15,
        letterSpacing: 0,
    },
    primaryTextStyle: {
        fontFamily: theme.fontFamilies.OpenSans_400Regular,
        fontWeight: "400",
        fontSize: 15,
        letterSpacing: 0,
    },
    primaryContentStyle: {
        height: 40
    }

}));

export default memo(Button);
