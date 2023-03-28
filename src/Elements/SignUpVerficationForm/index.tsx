import {useRoute} from "@react-navigation/core";
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

const SignUpVerificationForm =()=>{
    const route = useRoute<UnauthorizedStackNavigationProps['route']>();
    const {phoneNumber, userName} = route.params as ICodeVerificationState;

    const {control, handleSubmit, formState: {errors, isSubmitting, isValid}, setValue, watch} = useForm<SignUpVerificationValues>({
        defaultValues: {
            code: "",
            terms_and_conditions: false
        },
        mode: 'onChange'
    });
    const onSubmit =()=>{

    };
    console.log("watch",isValid, errors, watch());
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
                    </View>

                    <Controller
                        control={control}
                        name="terms_and_conditions"
                        rules={{
                            validate: (value) => !!value,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <View style={style.checkboxWrapper}>
                                <CheckBox
                                    isChecked={value}
                                    disabled={false}
                                    text={getTranslatedText("termsAndConditions")}
                                    onValueChange={(isChecked) =>
                                        onChange(isChecked)
                                    }
                                />
                            </View>

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
                <View style={style.button}>
                    <Button
                        type="primary"
                        disabled={!isValid}
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
    },
});
