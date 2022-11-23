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

const CodeVerificationLayout: React.FC<ICodeVerificationLayoutProps> = ({children, VerificationValue, hashedCodeVerificationValue}) => {
    const [showResend, setShowResend] = useState(false);
    const route = useRoute<UnauthorizedStackNavigationProps['route']>();
    const {userName} = route.params as ICodeVerificationState;

    const resendVerificationCodeRequest: IResendVerificationCodeRequest = {
        user_name: userName
    }
    const {refetch, error} = useResendVerificationCode(resendVerificationCodeRequest);
    console.log("error", error);

    const onTimerFinish = () => {
        setShowResend(true);
    };
    const resendCode = async () => {
        const a = await refetch();
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