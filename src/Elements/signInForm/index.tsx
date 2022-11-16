import { useForm, Controller } from "react-hook-form";
import {ISignInFormValues} from "@followBack/Elements/signInForm/types";
import {View, StyleSheet, TextInput} from "react-native";
import InputField from "@followBack/GenericElements/InputField";
import * as React from "react";
import PasswordInput from "@followBack/GenericElements/PasswordInput";
import Button from "@followBack/GenericElements/Button";
import {getTranslatedText} from "@followBack/Localization";
import Typography from "@followBack/GenericElements/Typography";
import {useFocusEffect, useNavigation } from '@react-navigation/native';
import {UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/constants";
import {useCallback, useEffect} from "react";
import {useLogin} from "@followBack/Hooks/Apis/Login";
import {ILoginApiRequest} from "@followBack/Apis/Login/types";

const SignInForm: React.FC = () => {
    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();

    const {control, handleSubmit, formState: {errors, isValid, isSubmitting}, reset, setFocus, watch, setError} = useForm<ISignInFormValues>({
        defaultValues: {
            userNameOrPhone: "",
            password: ""
        },
        mode: 'onChange'
    });
    const rules = {
        required: true
    };
    const values = watch();
    const request: ILoginApiRequest ={
        user_name: values.userNameOrPhone,
        password: values.password
    };
    const { refetch } = useLogin(request);

    const onForgetPasswordPress = () =>{
        nav.navigate(UnauthorizedScreensEnum.chooseAccount);
    };

    useFocusEffect(
        useCallback(() => {
            setFocus("userNameOrPhone");
            return () => {
                reset();
            };
        }, []));

    const onSubmit = async () => {
        console.log("call api");
       const {data, error, isError} =  await refetch();
       if(isError){
           setError("userNameOrPhone", {
               message: error?.response?.data?.message
           })
           return;
       }
       console.log("d", error?.response?.data?.message);
    };

    return (
        <>
            <Controller
                control={control}
                name="userNameOrPhone"
                rules={rules}
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
                rules={rules}
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
                <Typography color="error" type="smallRegularBody">{errors?.userNameOrPhone?.message}</Typography>
            </View>
            <View style={styles.button}>
                <Button type="primary" disabled={!isValid || isSubmitting} loading={isSubmitting}
                        onPress={handleSubmit(onSubmit)}>{getTranslatedText("signIn")}</Button>
            </View>

            <View style={styles.createAccountLink}>
                <Button type="secondary">
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
        marginTop: 45
    }
});