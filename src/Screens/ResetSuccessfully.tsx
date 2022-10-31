import {
    StyleSheet, View,
} from "react-native";
import {useNavigation} from "@react-navigation/core";
import {UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import * as React from "react";
import Typography from "@followBack/GenericElements/Typography";
import Button from "@followBack/GenericElements/Button";
import {getTranslatedText} from "@followBack/Localization";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/constants";

const ResetSuccessfully: React.FC = () => {
    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();

    const onSignInPress = () => {
        nav.navigate(UnauthorizedScreensEnum.signIn);
    };
    return (
        <View style={styles.container}>
            <Typography type="mediumRegularBody"
                        color="primary">
                {getTranslatedText("resetSuccessfully")}</Typography>
            <View style={styles.signIn}>
                <Button onPress={onSignInPress}
                        type="primary">{getTranslatedText("signIn")}</Button>
            </View>
        </View>
    )
};
export default ResetSuccessfully;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50
    },
    signIn: {
        marginTop: 50,
        width: "100%"
    }
});
