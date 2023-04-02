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
import {IResendVerificationCodeRequest} from "@followBack/Apis/ResendVerificationCode/types";
import {useResendVerificationCode} from "@followBack/Hooks/Apis/ResendVerificationCode";
import {useRoute} from "@react-navigation/core";
import {ICodeVerificationState, UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {err} from "react-native-svg/lib/typescript/xml";

const CodeVerificationLayout: React.FC<ICodeVerificationLayoutProps> = ({children, userName, hashedCodeVerificationValue}) => {
    const [showResend, setShowResend] = useState(false);

    const resendVerificationCodeRequest: IResendVerificationCodeRequest = {
        user_name: userName
    }
    const {refetch, error, isLoading, isError} = useResendVerificationCode(resendVerificationCodeRequest);

    const onTimerFinish = () => {
        setShowResend(true);
    };
    const resendCode = async () => {
        await refetch();
        setShowResend(false);
    };
    console.log("error", error?.response?.data?.message, isError);
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
            {!isLoading && error?.response?.data?.message &&
            <Typography textAlign="center" color="error" type="smallRegularBody">{error?.response?.data?.message}</Typography>}
        </>
    )
};
export default CodeVerificationLayout;