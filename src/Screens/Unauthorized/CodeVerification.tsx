import {Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View} from "react-native";
import React, {useMemo, useState} from "react";
import Button from "@followBack/GenericElements/Button";
import {useNavigation} from "@react-navigation/core";
import {ICodeVerificationState, UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/constants";
import {getTranslatedText} from "@followBack/Localization";
import {useRoute} from "@react-navigation/native";
import CodeVerificationLayout from "@followBack/Elements/CodeVerificationLayout";
import {encryptCodeVerificationValue} from "@followBack/Elements/CodeVerificationLayout/utils";
import {IForgetPasswordApiRequest, ResetMethod} from "@followBack/Apis/ForgetPassword/types";
import {useForgetPassword} from "@followBack/Hooks/Apis/ForgetPassword";
import CodeVerificationForm from "@followBack/Elements/CodeVerificationForm";

const CodeVerification: React.FC = () => {
    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();
    const route = useRoute<UnauthorizedStackNavigationProps['route']>();
    const {phoneNumber, secondaryEmail, resetMethod, userName} = route.params as ICodeVerificationState;
    const [verificationMethod, setVerificationMethod] = useState<ResetMethod>(resetMethod);
    const [codeVerificationValue, setCodeVerificationValue] = useState<string>(phoneNumber);

    const request: IForgetPasswordApiRequest = {
        user_name: userName,
        is_email: verificationMethod
    };
    const {refetch} = useForgetPassword(request);

  //  console.log("error", error);

    const hashedCodeVerificationValue = useMemo<string>(()=>
        encryptCodeVerificationValue(codeVerificationValue, verificationMethod),
        [codeVerificationValue, verificationMethod]);

    const onResetUsingEmailPress = async () => {
        //reset api call
        if (!secondaryEmail) {
            nav.navigate(UnauthorizedScreensEnum.noSecondaryEmail);
            return;
        }
        setVerificationMethod(ResetMethod.Email);
        setCodeVerificationValue(secondaryEmail);

        const {data, error, isError} = await refetch();
    };
    const onResetUsingPhonePress = async () => {
        //reset api call

        setVerificationMethod(ResetMethod.Phone);
        setCodeVerificationValue(phoneNumber);

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
                                        verificationMethod={verificationMethod}
                                        VerificationValue={codeVerificationValue}>
                                          <CodeVerificationForm/>
                                        </CodeVerificationLayout>
                <View style={styles.resetLink}>
                    { resetMethod === ResetMethod.Phone ? <Button onPress={onResetUsingEmailPress}
                            type="secondary">{getTranslatedText("resetUsingEmail")}</Button>
                        :
                    <Button onPress={onResetUsingPhonePress}
                            type="secondary">{getTranslatedText("resetUsingPhone")}</Button>
                        }
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
