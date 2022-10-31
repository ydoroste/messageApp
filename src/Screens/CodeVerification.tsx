import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Pressable, Keyboard, View
} from "react-native";
import React, {useState} from "react";
import Typography from "@followBack/GenericElements/Typography";
import Button from "@followBack/GenericElements/Button";
import Timer from "@followBack/GenericElements/Timer";
import CodeVerificationForm from "@followBack/Elements/CodeVerificationForm";
import {useNavigation} from "@react-navigation/core";
import {UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/constants";
import {getTranslatedText} from "@followBack/Localization";

const CodeVerification: React.FC = () => {
    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();

    const [showResend, setShowResend] = useState(false);
const onTimerFinish =() =>{
    setShowResend(true);
};
const resendCode = ()=>{
    setShowResend(false);
};

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={100}
            style={{flex: 1}}>
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                <View style={{alignSelf: "flex-start"}}>
                <Typography type="smallRegularBody" color="secondary">
                    {getTranslatedText("verificationCodeSent")} *********96
                </Typography>
                </View>
                <View style={{alignSelf: "flex-end", marginTop: 40}}>
                    {!showResend ? <Typography type="mediumRegularBody" color="primary">
                        wait up to {<Timer duration={30} onFinish={onTimerFinish}/>} seconds
                    </Typography> :
                        <Button type="secondary" onPress={resendCode}>{getTranslatedText("resend")}</Button>
                    }
                </View>
        <CodeVerificationForm />
        <View style={styles.resetLink}>
        <Button onPress={()=>{nav.navigate(UnauthorizedScreensEnum.codeVerification)}}
                type="secondary">{getTranslatedText("resetUsingEmail")}</Button>
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
