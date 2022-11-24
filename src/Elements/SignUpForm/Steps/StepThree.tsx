import React, { useState, useMemo, useRef } from "react";
import { useNavigation } from "@react-navigation/core";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { getTranslatedText } from "@followBack/Localization";
import Button from "@followBack/GenericElements/Button";
import CodeVerificationFields from "@followBack/GenericElements/CodeVerificationFields";
import Typography from "@followBack/GenericElements/Typography";
import { IStepThreeProps } from "@followBack/Elements/SignUpForm/types";
import CodeVerificationLayout from "@followBack/Elements/CodeVerificationLayout";
import { UnauthorizedStackNavigationProps } from "@followBack/Navigation/Unauthorized/types";
import { encryptCodeVerificationValue } from "@followBack/Elements/CodeVerificationLayout/utils";
import { useRoute } from "@react-navigation/native";
import { ICodeVerificationValues } from "@followBack/Elements/SignUpForm/types";
import { ResetMethod } from "@followBack/Apis/ForgetPassword/types";
import { UnauthorizedScreensEnum } from "@followBack/Navigation/constants";
import {ILoginApiRequest} from "@followBack/Apis/Login/types";
import {useLogin} from "@followBack/Hooks/Apis/Login";
import {useVerifyUser} from "@followBack/Hooks/Apis/VerifyUser";
import {IVerifyUserApiRequest} from "@followBack/Apis/VerifyUser/types";

const StepThree: React.FC<IStepThreeProps> = ({ wizard, form }) => {
    const nav = useNavigation<UnauthorizedStackNavigationProps["navigation"]>();
    const route = useRoute<UnauthorizedStackNavigationProps["route"]>();
    const {
        control,
        handleSubmit,
        formState: { isValid, isSubmitting, errors },
        setError,
        watch
    } = useForm<ICodeVerificationValues>({
        defaultValues: {
            code: "",
        },
        mode: "onChange",
    });

    const rules = {
        required: true,
    };

    const { username, phoneNumber } = form.watch();

    const hashedCodeVerificationValue = useMemo<string>(
        () => encryptCodeVerificationValue(phoneNumber, ResetMethod.Phone),
        [phoneNumber]
    );
    const values = watch();
    const request: IVerifyUserApiRequest ={
        user_name: username,
        code: values.code
    };
    const { refetch } = useVerifyUser(request);

    const onSubmit = async () => {
        const {data, error, isError} = await refetch();
        if(isError){
            //handle error here
            return;
        }
        nav.navigate(UnauthorizedScreensEnum.verifiedSuccessfully, {
            userName: username,
        });
    };

    return (
        <>
            <CodeVerificationLayout
                verificationMethod={ResetMethod.Phone}
                hashedCodeVerificationValue={hashedCodeVerificationValue}
                userName={username}
            >
                <>
                    <Controller
                        control={control}
                        name="code"
                        rules={{
                            required: true,
                            validate: (value) => value.length === 6,
                        }}
                        render={({ field: { onChange } }) => (
                            <CodeVerificationFields
                                error={!!errors?.code?.message}
                                onChange={(text) => {
                                    onChange(text);
                                }}
                            />
                        )}
                    />
                    {errors.code?.message && (
                        <View style={style.errorMessage}>
                            <Typography type="smallRegularBody" color="error">
                                {errors.code.message}
                            </Typography>
                        </View>
                    )}
                    <View style={style.button}>
                        <Button
                            type="primary"
                            disabled={!isValid || isSubmitting}
                            loading={isSubmitting}
                            onPress={onSubmit}
                        >
                            {getTranslatedText("verify")}
                        </Button>
                    </View>
                </>
            </CodeVerificationLayout>
        </>
    );
};

export default StepThree;

const style = StyleSheet.create({
    button: {
        marginTop: 60,
        marginBottom: 36,
        width: "90%",
    },
    errorMessage: {
        marginTop: 60,
    },
});