import {useNavigation, useRoute} from "@react-navigation/core";
import {ICodeVerificationState, UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {Controller, useForm} from "react-hook-form";
import {default as React, useMemo} from "react";
import {encryptCodeVerificationValue} from "@followBack/Elements/CodeVerificationLayout/utils";
import {ResetMethod} from "@followBack/Apis/ForgetPassword/types";
import {StyleSheet, View} from "react-native";
import CodeVerificationLayout from "@followBack/Elements/CodeVerificationLayout";
import CodeVerificationFields from "@followBack/GenericElements/CodeVerificationFields";
import Typography from "@followBack/GenericElements/Typography";
import CheckBox from "@followBack/GenericElements/Checkbox";
import {getTranslatedText} from "@followBack/Localization";
import Button from "@followBack/GenericElements/Button";
import {SignUpVerificationValues} from "@followBack/Elements/SignUpVerficationForm/types";
import {IVerifyUserApiRequest} from "@followBack/Apis/VerifyUser/types";
import {useVerifyUser} from "@followBack/Hooks/Apis/VerifyUser";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/Unauthorized/constants";

const SignUpVerificationForm =()=>{
    const route = useRoute<UnauthorizedStackNavigationProps['route']>();
    const {phoneNumber, userName} = route.params as ICodeVerificationState;
    const nav = useNavigation<UnauthorizedStackNavigationProps["navigation"]>();

    const {control, handleSubmit, formState: {errors, isSubmitting, isValid}, setError, watch} = useForm<SignUpVerificationValues>({
        defaultValues: {
            code: "",
            terms_and_conditions: false
        },
        mode: 'onChange'
    });
    const {code, terms_and_conditions} = watch();
    const userVerifyRequest: IVerifyUserApiRequest = {
        user_name: userName,
        code,
        terms_and_conditions,
    };
    const { refetch } = useVerifyUser(userVerifyRequest);
    const onSubmit = async ({code}: SignUpVerificationValues) => {
        const { data, error, isError } = await refetch();
        if (isError) {
            setError("code", {
                message: error?.response?.data?.message,
            });
            return;
        }

        nav.navigate(UnauthorizedScreensEnum.createdSuccessfully, {
            userName: userName,
        });
    };

    const hashedCodeVerificationValue = useMemo<string>(
        () => encryptCodeVerificationValue(phoneNumber, ResetMethod.Phone),
        [phoneNumber]
    );
    return (
            <CodeVerificationLayout
                verificationMethod={ResetMethod.Phone}
                hashedCodeVerificationValue={hashedCodeVerificationValue}
                userName={userName}
            >
                <View style={style.codeLayoutWrapper}>
                    <View style={style.code}>
                        <Controller
                            control={control}
                            name="code"
                            rules={{
                                required: true,
                                validate: (value) => value.length === 6,
                            }}
                            render={({ field: { onChange, value }}) => (
                                <CodeVerificationFields
                                    error={!!errors?.code}
                                    onChange={(text) => {
                                        if(text !== value){
                                            onChange(text);
                                        }
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
                    </View>

                    <Controller
                        control={control}
                        name="terms_and_conditions"
                        rules={{
                            required: true,
                            validate: (value) => !!value,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <View style={style.checkboxWrapper}>
                                <CheckBox
                                    isChecked={value}
                                    disabled={false}
                                    error={!!errors?.terms_and_conditions}
                                    text={getTranslatedText("termsAndConditions")}
                                    onValueChange={(isChecked) =>
                                        onChange(isChecked)
                                    }
                                />
                            </View>

                        )}
                    />
                </View>
                <View style={style.button}>
                    <Button
                        type="primary"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        onPress={handleSubmit(onSubmit)}
                    >
                        {getTranslatedText("verify")}
                    </Button>
                </View>

            </CodeVerificationLayout>

    )

};

export default SignUpVerificationForm;
const style = StyleSheet.create({
    codeLayoutWrapper: {
        alignItems: "center",
        justifyContent: "center",

    },
    checkboxWrapper: {
        marginBottom: 100,
        paddingLeft: 10,
    },
    code: {
        marginBottom: 40,
    },
    button: {
        marginBottom: 36,
        width: "90%",
    },
    errorMessage: {
        marginTop: 10,
        marginLeft: 10
    },
});
