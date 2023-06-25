import {useForm, Controller} from "react-hook-form";
import {ISignInFormValues} from "@followBack/Elements/signInForm/types";
import {View, StyleSheet} from "react-native";
import InputField from "@followBack/GenericElements/InputField";
import * as React from "react";
import PasswordInput from "@followBack/GenericElements/PasswordInput";
import Button from "@followBack/GenericElements/Button";
import {getTranslatedText} from "@followBack/Localization";
import Typography from "@followBack/GenericElements/Typography";
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/Unauthorized/constants";
import {useCallback, useState} from "react";
import {useLogin} from "@followBack/Hooks/Apis/Login";
import {ILoginApiRequest, ILoginApiResponseData} from "@followBack/Apis/Login/types";
import {setAccessToken} from "@followBack/Utils/accessToken";
import {useUserDetails} from "@followBack/Hooks/useUserDetails";
import {IForgetPasswordApiRequest, IForgetPasswordData, ResetMethod} from "@followBack/Apis/ForgetPassword/types";
import {useForgetPassword} from "@followBack/Hooks/Apis/ForgetPassword";

const SignInForm: React.FC = () => {
    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();

    const [showVerifyLink, setShowVerifyLink] = useState(false);
    const {control, handleSubmit, formState: {errors, isValid, isSubmitting}, reset, setFocus, watch, setError} = useForm<ISignInFormValues>({
        defaultValues: {
            userNameOrPhone: "",
            password: ""
        },
        mode: 'onChange',
    });

    const values = watch();

    const resetRequest: IForgetPasswordApiRequest = {
        user_name: values.userNameOrPhone,
        is_email: ResetMethod.Phone
    };
    //generate verification code
    const {refetch: refetchForgetPassword} = useForgetPassword(resetRequest);
    const request: ILoginApiRequest = {
        user_name: values.userNameOrPhone,
        password: values.password
    };
    const {refetch} = useLogin(request);
    const {setIsAuthenticated} = useUserDetails();
    const onVerifyAccountClick = async ()=>{
        const {data, isError, error} = await refetchForgetPassword();
        if(isError){
            setError("userNameOrPhone", {
                message: error?.response?.data?.message
            });
            return
        }
        const resData = data?.data as IForgetPasswordData;
        nav.navigate(UnauthorizedScreensEnum.singUpVerification,
            {
                phoneNumber: resData?.phone_number,
                resetMethod: ResetMethod.Phone,
                userName: resData.user_name
            });

    };
    const onForgetPasswordPress = () => {
        nav.navigate(UnauthorizedScreensEnum.chooseAccount);
    };

    const onSignUpPress = () => {
        nav.navigate(UnauthorizedScreensEnum.signUp);
    };

    const onSubmit = async () => {
        const {data, error, isError} = await refetch();
        if (isError) {
            setShowVerifyLink(error?.response?.data?.message === "User isn't verified");

            if (error?.response?.data?.message === "your account has been locked") {
                nav.navigate(UnauthorizedScreensEnum.lockedAccount, {userName: values.userNameOrPhone})
            }
            setError("userNameOrPhone", {
                message: error?.response?.data?.message
            });
            return;
        }
        const signInData = data?.data as ILoginApiResponseData;
        if (signInData.accessToken && signInData.accessToken !== "") {
            await setAccessToken(signInData.accessToken);
            setIsAuthenticated(true);
        }

    };

    useFocusEffect(
        useCallback(() => {
            setFocus("userNameOrPhone");
            return () => {
                reset();
            };
        }, []));

    return (
        <>
            <Controller
                control={control}
                name="userNameOrPhone"
                render={({field: {onChange, value, ref}}) => (
                    <View style={styles.textInput}>
                        <InputField
                            // @ts-ignore
                            ref={ref}
                            placeholder={getTranslatedText("userNameOrPhone")}
                            onChangeText={onChange}
                            value={value}
                        />
                    </View>)}
            />
            <Controller
                control={control}
                rules={{
                    required: true,
                    minLength: {
                        message: "you need at least 8 characters ",
                        value: 8
                    }
                }}
                render={({field: {onChange, value}}) => (
                    <View style={styles.passwordField}>

                        <PasswordInput
                            placeholder={getTranslatedText("password")}
                            onChangeText={onChange}
                            value={value}
                        />
                    </View>
                )}
                name="password"
            />
            <View style={styles.forgetPasswordLink}>
                <Button type="ternary"
                        onPress={onForgetPasswordPress}>{getTranslatedText("forgetPasswordLink")}</Button>
            </View>
            <View style={styles.errorStyle}>
                <Typography color="error" type="smallRegularBody" textAlign="center">{errors?.userNameOrPhone?.message}
                </Typography>
            </View>
            {showVerifyLink && errors?.userNameOrPhone?.message && <Button type="secondary" onPress={onVerifyAccountClick}>press here to verify your account</Button> }

            <View style={styles.button}>
                <Button type="primary" disabled={!isValid || isSubmitting} loading={isSubmitting}
                        onPress={handleSubmit(onSubmit)}>{getTranslatedText("signIn")}</Button>
            </View>

            <View style={styles.createAccountLink}>
                <Button type="secondary"
                        onPress={onSignUpPress}>
                    {getTranslatedText("createAccountLink")}</Button>
            </View>
        </>
    );
};

export default SignInForm;

const styles = StyleSheet.create({
    textInput: {
        width: "100%",
        marginTop: 0,
    },
    passwordField: {
        width: "100%",
        marginTop: 30,
    },
    forgetPasswordLink: {
        alignSelf: "flex-end",
        marginTop: 10,
    },
    createAccountLink: {
        marginTop: 20,
    },
    button: {
        marginTop: 45,
        width: "90%"
    },
    errorStyle: {
        marginTop: 45,
        marginBottom: 15
    }
});