import { useForm, Controller } from "react-hook-form";
import {ISignInFormValues} from "@followBack/Elements/signInForm/types";
import {View, Text, StyleSheet, KeyboardAvoidingView, Platform, Pressable, Keyboard, Dimensions} from "react-native";
import InputField from "@followBack/GenericElements/InputField";
import * as React from "react";
import PasswordInput from "@followBack/GenericElements/PasswordInput";
import Button from "@followBack/GenericElements/Button";
import {getTranslatedText} from "@followBack/Localization";
import Typography from "@followBack/GenericElements/Typography";

const windowHeight = Dimensions.get('window').height;

const SignInForm = ()=>{
    const { control, handleSubmit, formState: { errors, submitCount, isValid, isSubmitting }, setError } = useForm<ISignInFormValues>({
        defaultValues: {
            userNameOrPhone: undefined,
            password: undefined
        },
        mode: 'onChange'
    });
    const rules = {
        required: true
    };
const onSubmit = async (data: ISignInFormValues) => {
    console.log("submit", submitCount);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("resolved");
            setError("userNameOrPhone", {
                message: submitCount < 2 ?
                    "incorrect username or password" :
                    getTranslatedText("lastSignInAttempt")
            })
        }, 3000);
    });
};
   return (
    <>
            <Controller
                control={control}
                name="userNameOrPhone"
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.textInput}>
                        <InputField
                            placeholder={getTranslatedText("userNameOrPassword")}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </View>
                )}
            />
            <Controller
                control={control}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.passwordField}>

                    <PasswordInput
                        onBlur={onBlur}
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
                           onPress={() => console.log('Pressed')}>{getTranslatedText("forgetPasswordLink")}</Button>
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
        marginTop: 50,
        width: "90%"
    },
    errorStyle: {
        marginTop: 50
    }
});