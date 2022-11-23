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
import {getTranslatedText} from "@followBack/Localization";
import {ICodeVerificationLayoutProps} from "@followBack/Elements/CodeVerificationLayout/types";

const CodeVerificationLayout: React.FC<ICodeVerificationLayoutProps> = ({children, VerificationValue, hashedCodeVerificationValue}) => {
    const [showResend, setShowResend] = useState(false);
    const onTimerFinish =() =>{
        setShowResend(true);
    };
    const resendCode = ()=>{
        setShowResend(false);
    };

    return (
    <>
                <View style={{alignSelf: "flex-start"}}>
                    <Typography type="smallRegularBody" color="secondary">
                        {getTranslatedText("verificationCodeSent")} {hashedCodeVerificationValue}
                    </Typography>
                </View>
                <View style={{alignSelf: "flex-end", marginTop: 40}}>
                    {!showResend ? <Typography type="smallRegularBody" color="secondary">
                            wait up to {<Timer duration={30} onFinish={onTimerFinish}/>} seconds
                        </Typography> :
                        <Button type="ternary" onPress={resendCode}>{getTranslatedText("resend")}</Button>
                    }
                </View>
               {children}
                </>
)
};
export default CodeVerificationLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50
    }
});
