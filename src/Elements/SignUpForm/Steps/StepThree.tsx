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
import { IStepThreeProps } from "@followBack/Elements/SignUpForm/types";

import { useVerifyUser } from "@followBack/Hooks/Apis/VerifyUser";
import { IVerifyUserApiRequest } from "@followBack/Apis/VerifyUser/types";

const StepThree: React.FC<IStepThreeProps> = ({
  user_name,
  phone_number,
  wizard,
  form,
  isStepValid,
}) => {
  const nav = useNavigation<UnauthorizedStackNavigationProps["navigation"]>();
  const route = useRoute<UnauthorizedStackNavigationProps["route"]>();

  const {
    control,
    handleSubmit,
    formState: { errors, submitCount, isValid, isSubmitting },
    reset,
    setFocus,
    setError,
    watch,
  } = form;

  const values = watch();
  const { terms_and_conditions, code } = values;

  const hashedCodeVerificationValue = useMemo<string>(
    () => encryptCodeVerificationValue(phone_number, ResetMethod.Phone),
    [phone_number]
  );

  const userVerifyRequest: IVerifyUserApiRequest = {
    user_name,
    code,
    terms_and_conditions,
  };

  const { refetch } = useVerifyUser(userVerifyRequest);

  const onSubmit = async () => {
    const { data, error, isError } = await refetch();
    if (isError) {
      setError("code", {
        message: error?.response?.data?.message,
      });
      return;
    }

    nav.navigate(UnauthorizedScreensEnum.createdSuccessfully, {
      userName: user_name,
    });
  };

  return (
    <>
      <CodeVerificationLayout
        verificationMethod={ResetMethod.Phone}
        hashedCodeVerificationValue={hashedCodeVerificationValue}
        userName={user_name}
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
              isChecked={terms_and_conditions}
              disabled={false}
              text={getTranslatedText("termsAndConditions")}
              onValueChange={(isChecked) =>
                form.setValue("terms_and_conditions", isChecked)
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
