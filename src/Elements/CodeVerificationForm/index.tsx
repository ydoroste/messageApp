import * as React from "react";
import {useNavigation, useRoute} from "@react-navigation/core";
import {ICodeVerificationState, UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {Controller, useForm} from "react-hook-form";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/Unauthorized/constants";
import {StyleSheet, View} from "react-native";
import {getTranslatedText} from "@followBack/Localization";
import Button from "@followBack/GenericElements/Button";
import {ICodeVerificationValues} from "@followBack/Elements/CodeVerificationForm/types";
import CodeVerificationFields from "@followBack/GenericElements/CodeVerificationFields";
import Typography from "@followBack/GenericElements/Typography";
import {IVerifyResetPasswordCodeApiRequest} from "@followBack/Apis/VerifyResetPasswordCode/types";
import {useVerifyResetPasswordCode} from "@followBack/Hooks/Apis/VerifyResetPasswordCode";

const CodeVerificationForm: React.FC = () => {

    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();
    const route = useRoute<UnauthorizedStackNavigationProps['route']>();
    const {userName} = route.params as ICodeVerificationState;
    const {control, handleSubmit, formState: {isValid, isSubmitting, errors}, setError, watch}
        = useForm<ICodeVerificationValues>({
        defaultValues: {
            code: ""
        },
        mode: 'onChange'
    });
    const formData = watch();

    const userVerifyRequest: IVerifyResetPasswordCodeApiRequest = {
        user_name: userName,
        code: formData.code
    };
    const { refetch } = useVerifyResetPasswordCode(userVerifyRequest);
    const onSubmit = async () => {
        const {data, isError, error} = await refetch();
        if (isError) {
            setError("code", {
                message: error?.response?.data?.message
            });
            return;
        }

        nav.navigate(UnauthorizedScreensEnum.resetPassword,
            {
                resetToken: data?.data.resetToken as string
            });
    };
    return (
        <>
            <Controller
                control={control}
                name="code"
                rules={{
                    required: true,
                    validate: value => value.length === 6
                }}
                render={({field: {onChange}}) => (
                    <CodeVerificationFields error={!!errors?.code?.message} onChange={(text) => {
                        onChange(text);
                    }}/>
                )}
            />
            <View style={style.errorMessage}>
                {errors.code?.message &&
                <Typography type="smallRegularBody" color="error">
                    {errors.code.message}</Typography>}
            </View>
            <View style={style.button}>
                <Button type="primary" disabled={!isValid || isSubmitting} loading={isSubmitting}
                        onPress={handleSubmit(onSubmit)}>{getTranslatedText("verify")}</Button>
            </View>
        </>
    );

};

export default CodeVerificationForm;

const style = StyleSheet.create({
    button: {
        marginTop: 60,
        width: "90%",
        marginBottom: 36
    },
    errorMessage: {
        marginTop: 60
    }
});