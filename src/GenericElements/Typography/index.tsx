import * as React from "react";
import {Text} from "react-native";
import useStyleWithTheme from "@followBack/Hooks/useStylesWithTheme";
import {ITypographyProps} from "@followBack/GenericElements/Typography/types";
import useTheme from "@followBack/Hooks/useTheme";
import {colorsToTheme} from "@followBack/GenericElements/Typography/utils";
import {memo} from "react";

const Typography: React.FC<ITypographyProps> = ({type, textDecoration, color, children, textAlign, ...props})=>{
    const {styles} = useStyles();
    const {colors} = useTheme();
    const textColor = colorsToTheme[color];
    return <Text  style={[styles[type], textDecoration && styles.textDecoration,
        {color: colors[textColor], textAlign}]} {...props}>
        {children}
    </Text>
};

const useStyles = useStyleWithTheme((theme )=> ({
    smallRegularTitle: {
        fontFamily: theme.fontFamilies.OpenSans_400Regular,
        fontSize: theme.fontSizes.large,
        lineHeight: theme.lineHeights.large,
    },
    mediumRegularTitle: {
        fontFamily: theme.fontFamilies.OpenSans_400Regular,
        fontSize: theme.fontSizes.xLarge,
        lineHeight: theme.lineHeights.xLarge,
    },
    largeRegularTitle: {
        fontFamily: theme.fontFamilies.OpenSans_400Regular,
        fontSize: theme.fontSizes.xxLarge,
        lineHeight: theme.lineHeights.xxLarge,
    },
    mediumBoldTitle: {
        fontFamily: theme.fontFamilies.OpenSans_700Bold,
        fontSize: theme.fontSizes.xLarge,
        lineHeight: theme.lineHeights.xLarge
    },
    largeBoldTitle: {
        fontFamily: theme.fontFamilies.OpenSans_700Bold,
        fontSize: theme.fontSizes.xxLarge,
        lineHeight: theme.lineHeights.xxLarge
    },
    smallRegularBody: {
        fontFamily: theme.fontFamilies.OpenSans_400Regular,
        fontSize: theme.fontSizes.xSmall,
        lineHeight: theme.lineHeights.xSmall,
    },
    mediumRegularBody: {
        fontFamily: theme.fontFamilies.OpenSans_400Regular,
        fontSize: theme.fontSizes.small,
        lineHeight: theme.lineHeights.small,
    },
    largeRegularBody:{
        fontFamily: theme.fontFamilies.OpenSans_400Regular,
        fontSize: theme.fontSizes.medium,
        lineHeight: theme.lineHeights.medium,
    },
    smallBoldBody: {
        fontFamily: theme.fontFamilies.OpenSans_700Bold,
        fontSize: theme.fontSizes.xSmall,
        lineHeight: theme.lineHeights.xSmall,

    },
    mediumBoldBody: {
        fontFamily: theme.fontFamilies.OpenSans_700Bold,
        fontSize: theme.fontSizes.small,
        lineHeight: theme.lineHeights.large
    },
    largeBoldBody: {
        fontFamily: theme.fontFamilies.OpenSans_700Bold,
        fontSize: theme.fontSizes.medium,
        lineHeight: theme.lineHeights.medium
    },
    textDecoration: {
        textDecorationLine: 'underline'
    }
    })
);

export default memo(Typography);