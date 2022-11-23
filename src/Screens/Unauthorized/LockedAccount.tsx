import {Dimensions, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import * as React from "react";
import Lock from "@followBack/Theme/Icons/Lock";
import useTheme from "@followBack/Hooks/useTheme";
import Typography from "@followBack/GenericElements/Typography";
import Button from "@followBack/GenericElements/Button";
import {useNavigation, useRoute} from "@react-navigation/core";
import {ICodeVerificationState, UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {IForgetPasswordApiRequest, IForgetPasswordData, ResetMethod} from "@followBack/Apis/ForgetPassword/types";
import {useForgetPassword} from "@followBack/Hooks/Apis/ForgetPassword";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/constants";
import {getTranslatedText} from "@followBack/Localization";

const screenHeight = Dimensions.get("window").height;
const LockedAccount: React.FC = () => {
    const {colors} = useTheme();
    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();
    const route = useRoute<UnauthorizedStackNavigationProps['route']>();
    const {userName} = route.params as ICodeVerificationState;

    const request: IForgetPasswordApiRequest = {
        user_name: userName,
        is_email: ResetMethod.Phone
    };
    const {data, error, isError, isLoading} = useForgetPassword(request);

    const onResetPress = () => {
        const resData = data?.data as IForgetPasswordData;
        nav.navigate(UnauthorizedScreensEnum.codeVerification,
            {
                phoneNumber: resData?.phone_number as string,
                secondaryEmail: resData?.phone_number as string,
                resetMethod: ResetMethod.Phone,
                userName: userName
            });

    };
    return (
        <View style={styles.container}>
            <Lock color={colors.red} width={55} height={64}/>
            <View style={{marginVertical: 70}}>
                <Typography color="error"
                            type="mediumRegularTitle">{getTranslatedText("yourAccountHasBeenLocked")}</Typography>
            </View>
            <View>
                <Button disabled={isError || isLoading} onPress={onResetPress}
                        type="secondary">{getTranslatedText("lockedAccountLink")}</Button>
                {isError &&
                <Typography type="mediumRegularBody" color="error">{error?.response?.data?.message}</Typography>}
            </View>
        </View>
    );
};
export default LockedAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 50,
        marginTop: screenHeight * 0.2
    }
});