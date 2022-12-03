import React, { useState, useMemo, useRef } from "react";
import { useNavigation } from "@react-navigation/core";
import CheckBox from "@followBack/GenericElements/Checkbox";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { getTranslatedText } from "@followBack/Localization";
import Button from "@followBack/GenericElements/Button";
import CodeVerificationFields from "@followBack/GenericElements/CodeVerificationFields";
import Typography from "@followBack/GenericElements/Typography";
import CodeVerificationLayout from "@followBack/Elements/CodeVerificationLayout";
import { UnauthorizedStackNavigationProps } from "@followBack/Navigation/Unauthorized/types";
import { encryptCodeVerificationValue } from "@followBack/Elements/CodeVerificationLayout/utils";
import { useRoute } from "@react-navigation/native";
import { ResetMethod } from "@followBack/Apis/ForgetPassword/types";
import { UnauthorizedScreensEnum } from "@followBack/Navigation/constants";
import { ILoginApiRequest } from "@followBack/Apis/Login/types";
import { useLogin } from "@followBack/Hooks/Apis/Login";
import { useRegister } from "@followBack/Hooks/Apis/Register";
import { IRegisterApiRequest } from "@followBack/Apis/Register/types";
import { IStepProps } from "@followBack/Elements/SignUpForm/types";

const StepThree: React.FC<IStepProps> = ({ wizard, form, isStepValid }) => {
  const nav = useNavigation<UnauthorizedStackNavigationProps["navigation"]>();
  const route = useRoute<UnauthorizedStackNavigationProps["route"]>();
  const {
    control,
    formState: { isValid, isSubmitting, errors },
    setError,
    watch,
  } = form;

  const { acceptsCoditionsAndTerms, username, phoneNumber } = form.watch();

  const hashedCodeVerificationValue = useMemo<string>(
    () => encryptCodeVerificationValue(phoneNumber, ResetMethod.Phone),
    [phoneNumber]
  );

  const values = watch();

  const request: IRegisterApiRequest = {
    first_name: values.firstName,
    last_name: values.lastName,
    gender: values.gender,
    birth_date: values.birthDate,
    user_name: values.username,
    phone_number: values.formattedPhoneNumber,
    password: values.password,
    code: values.code,
    acceptsCoditionsAndTerms: values.acceptsCoditionsAndTerms,
  };
  const { refetch } = useRegister(request);

  const onSubmit = async () => {
    // const {data, error, isError} = await refetch();
    // console.log("error", error)
    // if(isError){
    //     //handle error here
    //     return;
    // }
    // //no errors from apis

    nav.navigate(UnauthorizedScreensEnum.createdSuccessfully, {
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
        <View style={style.container}>
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

          <View style={style.checkboxWrapper}>
            <CheckBox
              disabled={false}
              text={getTranslatedText("termsAndConditions")}
              isChecked={acceptsCoditionsAndTerms}
              onValueChange={(isChecked) =>
                form.setValue("acceptsCoditionsAndTerms", isChecked)
              }
            />
          </View>

            <View style={style.button}>
              <Button
                type="primary"
                disabled={!isStepValid || !isValid || isSubmitting}
                loading={isSubmitting}
                onPress={onSubmit}
              >
                {getTranslatedText("verify")}
              </Button>
          </View>
        </View>
      </CodeVerificationLayout>
    </>
  );
};

export default StepThree;

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxWrapper: {
    marginBottom: 100,
    paddingLeft: 10

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
