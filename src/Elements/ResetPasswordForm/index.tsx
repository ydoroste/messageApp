import {useForm, Controller} from "react-hook-form";
import {View, StyleSheet} from "react-native";
import * as React from "react";
import Button from "@followBack/GenericElements/Button";
import {getTranslatedText} from "@followBack/Localization";
import {useNavigation, useRoute} from '@react-navigation/native';
import {ICodeVerificationState, UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/Unauthorized/constants";
import PasswordInput from "@followBack/GenericElements/PasswordInput";
import {IResetPasswordForm} from "@followBack/Elements/ResetPasswordForm/types";
import {useState} from "react";
import Typography from "@followBack/GenericElements/Typography";
import {IVerifyResetPasswordCodeData} from "@followBack/Apis/VerifyResetPasswordCode/types";
import {IResetPasswordApiRequest} from "@followBack/Apis/ResetPassword/types";
import {useResetPassword} from "@followBack/Hooks/Apis/ResetPassword";

const ResetPasswordForm = () => {
    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();
    const route = useRoute<UnauthorizedStackNavigationProps['route']>();
    const {resetToken} = route.params as IVerifyResetPasswordCodeData;
    const [showPassword, setShowPassword] = useState(false);
    const {control, handleSubmit, formState: {isValid, isSubmitting, errors}, watch, setError}
        = useForm<IResetPasswordForm>({
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
        mode: 'onChange'
    });
    const formData = watch();

    const request: IResetPasswordApiRequest = {
        resetToken,
        new_password: formData.password
    };
    const { refetch } = useResetPassword(request);
    const rules = {
        required: true
    };
    const onSetShowPassword = (value: boolean) => {
        setShowPassword(value)
    };
    const onSubmit = async (formData: IResetPasswordForm) => {
        if (formData.password !== formData.confirmPassword) {
            setError("confirmPassword", {
                message: getTranslatedText("passwordNotMatch")
            });
            return;
        }
        const {data, error, isError} = await refetch();
        if(isError){
            setError("confirmPassword",{
                message: error?.response?.data?.message
            })
            return;
        }
        nav.navigate(UnauthorizedScreensEnum.resetSuccessfully)
    };
    return (
        <>
            <Controller
                control={control}
                name="password"
                rules={rules}
                render={({field: {onChange, value}}) => (
                    <View style={style.textInput}>
                        <PasswordInput
                            showPassword={showPassword}
                            setShowPassword={onSetShowPassword}
                            placeholder={getTranslatedText("newPassword")}
                            textContentType={'oneTimeCode'}
                            onChangeText={onChange}
                            value={value}
                        />
                    </View>
                )}
            />
            <Controller
                control={control}
                name="confirmPassword"
                rules={{
                    required: true
                }}
                render={({field: {onChange, value}}) => (
                    <View style={[style.textInput, style.confirmPassword]}>
                        <PasswordInput
                            showPassword={showPassword}
                            setShowPassword={onSetShowPassword}
                            placeholder={getTranslatedText("confirmPassword")}
                            textContentType={'oneTimeCode'}
                            onChangeText={onChange}
                            value={value}
                            error={!!errors.confirmPassword?.message}
                        />
                    </View>
                )}
            />
            <View style={style.errorMessage}>
                {errors.confirmPassword?.message &&
                <Typography type="smallRegularBody" color="error">
                    {errors.confirmPassword.message}</Typography>}
            </View>

            <View style={style.button}>
                <Button type="primary" disabled={!isValid || isSubmitting} loading={isSubmitting}
                        onPress={handleSubmit(onSubmit)}>{getTranslatedText("resetPassword")}</Button>
            </View>
        </>
    );
};

export default ResetPasswordForm;

const style = StyleSheet.create({
    textInput: {
        width: "100%",
        marginTop: 0,
    },
    confirmPassword: {
        marginTop: 30
    },
    button: {
        marginTop: 60,
        width: "90%"
    },
    errorMessage: {
        marginTop: 60
    }
});