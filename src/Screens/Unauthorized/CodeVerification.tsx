import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Pressable, Keyboard, View
} from "react-native";
import React, {useMemo, useState} from "react";
import Button from "@followBack/GenericElements/Button";
import {useNavigation} from "@react-navigation/core";
import {ICodeVerificationState, UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/constants";
import {getTranslatedText} from "@followBack/Localization";
import {useRoute} from "@react-navigation/native";
import CodeVerificationLayout from "@followBack/Elements/CodeVerificationLayout";
import {encryptCodeVerificationValue} from "@followBack/Elements/CodeVerificationLayout/utils";
import {IResendVerificationCodeRequest} from "@followBack/Apis/ResendVerificationCode/types";
import {useResendVerificationCode} from "@followBack/Hooks/Apis/ResendVerificationCode";

const CodeVerification: React.FC = () => {
    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();
    const route = useRoute<UnauthorizedStackNavigationProps['route']>();
    const {phoneNumber, secondaryEmail, verifyUsingPhone, userName} = route.params as ICodeVerificationState;
    const [isVerifyUsingPhone, setIsVerifyUsingPhone] = useState<boolean>(verifyUsingPhone);
    const [codeVerificationValue, setCodeVerificationValue] = useState<string>(phoneNumber);
    const resendVerificationCodeRequest: IResendVerificationCodeRequest = {
        user_name: userName
    }
     const {refetch} = useResendVerificationCode(resendVerificationCodeRequest);

    const hashedCodeVerificationValue = useMemo<string>(()=>
        encryptCodeVerificationValue(codeVerificationValue, isVerifyUsingPhone),
        [codeVerificationValue, isVerifyUsingPhone]);

    const onResetPress = async () => {
        //reset api call
        if (isVerifyUsingPhone && !secondaryEmail) {
            nav.navigate(UnauthorizedScreensEnum.noSecondaryEmail);
            return;
        }
        setIsVerifyUsingPhone(!isVerifyUsingPhone);
        setCodeVerificationValue(!isVerifyUsingPhone ? phoneNumber : secondaryEmail as string);

        const {data, error, isError} = await refetch();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={100}
            style={{flex: 1}}>
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                <CodeVerificationLayout key={codeVerificationValue}
                                        hashedCodeVerificationValue={hashedCodeVerificationValue}
                                        VerificationValue={codeVerificationValue}/>
                <View style={styles.resetLink}>
                    <Button onPress={onResetPress}
                            type="secondary">{isVerifyUsingPhone
                        ? getTranslatedText("resetUsingEmail")
                        : getTranslatedText("resetUsingPhone")}</Button>
                </View>
            </Pressable>
        </KeyboardAvoidingView>)
};
export default CodeVerification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50
    },
    resetLink: {
        marginTop: 25
    }
});
