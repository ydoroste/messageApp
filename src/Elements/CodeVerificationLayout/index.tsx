import {
    View
} from "react-native";
import React, {useState} from "react";
import Typography from "@followBack/GenericElements/Typography";
import Button from "@followBack/GenericElements/Button";
import Timer from "@followBack/GenericElements/Timer";
import {getTranslatedText} from "@followBack/Localization";
import {ICodeVerificationLayoutProps} from "@followBack/Elements/CodeVerificationLayout/types";
import {IResendVerificationCodeRequest} from "@followBack/Apis/ResendVerificationCode/types";
import {useResendVerificationCode} from "@followBack/Hooks/Apis/ResendVerificationCode";

const CodeVerificationLayout: React.FC<ICodeVerificationLayoutProps> = ({children, userName, hashedCodeVerificationValue}) => {
    const [showResend, setShowResend] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const resendVerificationCodeRequest: IResendVerificationCodeRequest = {
        user_name: userName
    };
    const {refetch, error, isLoading, isError} = useResendVerificationCode(resendVerificationCodeRequest);

    const onTimerFinish = () => {
        setShowResend(true);
    };
    
    const resendCode = async () => {
        await refetch();
        setErrorMessage(isError ? error?.response?.data?.message : "");
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
            {!isLoading && errorMessage &&
            <Typography textAlign="center" color="error" type="smallRegularBody">{errorMessage}</Typography>}
        </>
    )
};
export default CodeVerificationLayout;