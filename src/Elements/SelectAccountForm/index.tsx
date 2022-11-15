import { useForm, Controller } from "react-hook-form";
import {View, StyleSheet} from "react-native";
import InputField from "@followBack/GenericElements/InputField";
import * as React from "react";
import Button from "@followBack/GenericElements/Button";
import {getTranslatedText} from "@followBack/Localization";
import { useNavigation } from '@react-navigation/native';
import {UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {ISelectAccountFormValue} from "@followBack/Elements/SelectAccountForm/types";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/constants";
import {useEffect} from "react";

const SelectAccountForm = () => {
    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();
    const {control, handleSubmit, formState: {isValid, isSubmitting}, setFocus} = useForm<ISelectAccountFormValue>({
        defaultValues: {
            userNameOrPhone: ""
        },
        mode: 'onChange'
    });
    const rules = {
        required: true
    };
    useEffect(()=>{
        setFocus("userNameOrPhone")
    },[setFocus]);

    const onSubmit = async (data: ISelectAccountFormValue) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                nav.navigate(UnauthorizedScreensEnum.codeVerification,
                    {phoneNumber: "0592329905", secondaryEmail: "abdulazizmassoud@gmail.com", verifyUsingPhone: true});

                resolve("resolved");

            }, 3000);
        });
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
                            ref={ref}
                            placeholder={getTranslatedText("userNameOrPhone")}
                            onChangeText={onChange}
                            value={value}
                        />
                    </View>
                )}
            />

            <View style={styles.button}>
                <Button type="primary" disabled={!isValid || isSubmitting} loading={isSubmitting}
                        onPress={handleSubmit(onSubmit)}>{getTranslatedText("generateCode")}</Button>
            </View>
        </>
    );
};

export default SelectAccountForm;

const styles = StyleSheet.create({
    textInput: {
        width: "100%",
        marginTop: 0,
    },
    button: {
        marginTop: 150,
        width: "90%"
    }
});