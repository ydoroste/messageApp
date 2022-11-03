import * as React from "react";
import {useNavigation} from "@react-navigation/core";
import {UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {Controller, useForm} from "react-hook-form";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/constants";
import {StyleSheet, View} from "react-native";
import {getTranslatedText} from "@followBack/Localization";
import Button from "@followBack/GenericElements/Button";
import {ICodeVerificationValues} from "@followBack/Elements/CodeVerificationForm/types";
import CodeVerificationFields from "@followBack/GenericElements/CodeVerificationFields";
import Typography from "@followBack/GenericElements/Typography";

const CodeVerificationForm: React.FC = () =>{

    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();
    const {control, handleSubmit, formState: {isValid, isSubmitting, errors}, setError}
    = useForm<ICodeVerificationValues>({
        defaultValues: {
            code: ""
        },
        mode: 'onChange'
    });
    const onSubmit = async (data: ICodeVerificationValues) => {
        console.log("Data", data);
        return new Promise((resolve) => {
            setTimeout(() => {
                nav.navigate(UnauthorizedScreensEnum.resetPassword);

                resolve("resolved");

            }, 3000);
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
                        <CodeVerificationFields error={!!errors?.code?.message} onChange={(text)=>{
                            onChange(text);
                        }}/>
                )}
            />
            <View style={style.errorMessage}>
                { errors.code?.message &&
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
        width: "90%"
    },
    errorMessage: {
        marginTop: 60
    }
});