import { useForm, Controller } from "react-hook-form";
import {View, StyleSheet} from "react-native";
import * as React from "react";
import Button from "@followBack/GenericElements/Button";
import {getTranslatedText} from "@followBack/Localization";
import { useNavigation } from '@react-navigation/native';
import {UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/constants";
import PasswordInput from "@followBack/GenericElements/PasswordInput";
import {IResetPasswordForm} from "@followBack/Elements/ResetPasswordForm/types";
import {useState} from "react";
import Typography from "@followBack/GenericElements/Typography";

const ResetPasswordForm = () => {
    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();
    const [showPassword, setShowPassword] = useState(false);
    const {control, handleSubmit, formState: {isValid, isSubmitting, errors}, getValues, setError}
        = useForm<IResetPasswordForm>({
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
        mode: 'onChange'
    });
    const rules = {
        required: true
    };
    const onSetShowPassword = (value: boolean) => {
        setShowPassword(value)
    };
    const onSubmit = async (data: IResetPasswordForm) => {
        if(data.password !== data.confirmPassword){
            setError("confirmPassword", {
                message: getTranslatedText("passwordNotMatch")
            });
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                nav.navigate(UnauthorizedScreensEnum.resetSuccessfully);
                resolve("resolved");

            }, 3000);
        });
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
                            onChangeText={onChange}
                            value={value}
                            error={!!errors.confirmPassword?.message}
                        />
                    </View>
                )}
            />
            <View style={style.errorMessage}>
                { errors.confirmPassword?.message &&
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