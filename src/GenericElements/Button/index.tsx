import * as React from "react";
import { Button as CustomButton } from 'react-native-paper';
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import {IButtonProps} from "@followBack/GenericElements/Button/types";
import Typography from "@followBack/GenericElements/Typography";
import {typesToButtons} from "@followBack/GenericElements/Button/utils";
import {memo} from "react";
import useTheme from "@followBack/Hooks/useTheme";

const Button: React.FC<IButtonProps> = ({onPress, disabled, children, type, ...props})=>{
    const {styles} = useStyles();
    const {colors} = useTheme();
    const {showLabelStyle, textType, textDecoration, textColorType, mode} = typesToButtons[type];
    return <CustomButton uppercase={false}
                         {...props}
                         style={styles[type]}
                         mode={mode}
                         color={colors.black}
                         labelStyle={showLabelStyle && styles.textStyle}>
        <Typography type={textType}
                    color={disabled ? "disabled" : textColorType}
                    textDecoration={textDecoration}>{children}</Typography>
    </CustomButton>
};

const useStyles = useStylesWithTheme(theme => ({
    primary: {
        backgroundColor: theme.colors.dark02,
        borderRadius: 31,
        height: 40,
    },
    secondary: {
        backgroundColor: "transparent"
    },
    ternary: {
        backgroundColor: "transparent"
    },
    textStyle: {
        marginHorizontal: 0,
        marginVertical: 0
    }

}));

export default memo(Button);
