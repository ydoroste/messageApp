import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Pressable, Keyboard, View
} from "react-native";
import React, {useMemo, useState} from "react";
import Typography from "@followBack/GenericElements/Typography";
import Button from "@followBack/GenericElements/Button";
import Timer from "@followBack/GenericElements/Timer";
import {useNavigation} from "@react-navigation/core";
import {ICodeVerificationState, UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/constants";
import {getTranslatedText} from "@followBack/Localization";
import {useRoute} from "@react-navigation/native";
import CodeVerificationLayout from "@followBack/Elements/CodeVerificationLayout";
import {encryptCodeVerificationValue} from "@followBack/Elements/CodeVerificationLayout/utils";
import CodeVerificationForm from "@followBack/Elements/CodeVerificationForm";

const CodeVerification: React.FC = () => {
    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();
    const route = useRoute<UnauthorizedStackNavigationProps['route']>();
    const {phoneNumber, secondaryEmail, verifyUsingPhone} = route.params as ICodeVerificationState;
    const [isVerifyUsingPhone, setIsVerifyUsingPhone] = useState<boolean>(verifyUsingPhone);
    const [codeVerificationValue, setCodeVerificationValue] = useState<string>(phoneNumber);

    const hashedCodeVerificationValue = useMemo<string>(()=>
        encryptCodeVerificationValue(codeVerificationValue, isVerifyUsingPhone),
        [codeVerificationValue, isVerifyUsingPhone]);

    const onResetPress = () => {
        //reset api call
        if(isVerifyUsingPhone && !secondaryEmail){
            nav.navigate(UnauthorizedScreensEnum.noSecondaryEmail);
            return;
        }
            setIsVerifyUsingPhone(!isVerifyUsingPhone);
            setCodeVerificationValue(!isVerifyUsingPhone ? phoneNumber : secondaryEmail as string);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={100}
            style={{flex: 1}}>
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                <CodeVerificationLayout key={codeVerificationValue}
                                        hashedCodeVerificationValue={hashedCodeVerificationValue}
                                        VerificationValue={codeVerificationValue}>
                                          <CodeVerificationForm/>
                                        </CodeVerificationLayout>
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
