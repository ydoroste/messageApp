import {StyleSheet, Text, View} from "react-native";
import * as React from "react";
import Close from "../../Theme/Icons/Close";
import {NativeStackHeaderProps} from "@react-navigation/native-stack/lib/typescript/src/types";
import Typography from "@followBack/GenericElements/Typography";
import {getTranslatedText} from "@followBack/Localization";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
import IconButton from "@followBack/GenericElements/IconButton";

const UnauthorizedHeader: React.FC<NativeStackHeaderProps> = ({ navigation, route, options, back })=>{

    const canGoBack = navigation.canGoBack();
    const onBackButtonPress = ()=>{
        console.log("pressed");

        canGoBack && navigation.goBack();
    };
    const {colors} = useTheme();
    const {styles} = useStyles();
    return(
        <View style={styles.headerStyle}>
            <Typography type="mediumRegularTitle" color="secondary">{getTranslatedText("signIn")}</Typography>
            <IconButton name="close" width={18} height={17} color={colors.grey02} onPress={onBackButtonPress} />

        </View>
    )
};

const useStyles = useStylesWithTheme((theme)=> ({
    headerStyle: {
        height: 150,
        flexDirection: "row",
        backgroundColor: theme.colors.black,
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 0,
        paddingHorizontal: 50

    }
}));
export default UnauthorizedHeader;

