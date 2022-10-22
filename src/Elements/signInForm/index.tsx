import { useForm, Controller } from "react-hook-form";
import {ISignInFormValues} from "@followBack/Elements/signInForm/types";
import {View, Text} from "react-native";
import InputField from "@followBack/GenericElements/InputField";
import * as React from "react";
import PasswordInput from "@followBack/GenericElements/PasswordInput";


const SignInForm = ()=>{
    const { control, handleSubmit, formState: { errors }, getValues } = useForm<ISignInFormValues>({
        defaultValues: {
            userNameOrPhone: '',
            password: ''
        }
    });
    const formValues = getValues();
    const rules = {
        required: true
    };

   return (
        <View>
            <Controller
                control={control}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="userNameOrPhone"
            />
            <Controller
                control={control}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <PasswordInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )
                }
                name="password"
            />

        </View>
    );
};

export default SignInForm;