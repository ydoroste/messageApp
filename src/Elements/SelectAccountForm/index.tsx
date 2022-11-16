import {Controller, useForm} from "react-hook-form";
import {StyleSheet, View} from "react-native";
import InputField from "@followBack/GenericElements/InputField";
import * as React from "react";
import {useEffect} from "react";
import Button from "@followBack/GenericElements/Button";
import {getTranslatedText} from "@followBack/Localization";
import {useNavigation} from '@react-navigation/native';
import {UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {ISelectAccountFormValue} from "@followBack/Elements/SelectAccountForm/types";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/constants";
import {useForgetPassword} from "@followBack/Hooks/Apis/ForgetPassword";
import {IForgetPasswordApiRequest, ResetMethod} from "@followBack/Apis/ForgetPassword/types";
import Typography from "@followBack/GenericElements/Typography";

const SelectAccountForm = () => {
    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();
    const {control, handleSubmit, formState: {isValid, isSubmitting, errors}, setFocus, setError, watch, } = useForm<ISelectAccountFormValue>({
        defaultValues: {
            userNameOrPhone: ""
        },
        mode: 'onChange'
    });
    const formValues = watch();
    const request: IForgetPasswordApiRequest = {
        user_name: formValues.userNameOrPhone,
        is_email: ResetMethod.Phone
    };
    const {refetch} = useForgetPassword(request);

    const rules = {
        required: true
    };
    useEffect(() => {
        setFocus("userNameOrPhone")
    }, [setFocus]);

    const onSubmit = async () => {
        const {data, isError, error} = await refetch();
        if (isError) {
            setError("userNameOrPhone", {
                message: error?.response?.data?.message
            })
        }


        nav.navigate(UnauthorizedScreensEnum.codeVerification,
            {
                phoneNumber: data?.data.phone_number as string,
                secondaryEmail: data?.data.phone_number as string,
                verifyUsingPhone: true,
                userName: formValues.userNameOrPhone
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
            <View style={styles.errorStyle}>
                <Typography color="error" type="smallRegularBody">{errors?.userNameOrPhone?.message}</Typography>
            </View>

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
        marginTop: 75,
        width: "90%"
    },
    errorStyle: {
        marginTop: 75
    }

});