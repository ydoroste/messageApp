import React, { useState, useMemo } from "react";
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

const StepThree: React.FC<IStepThreeProps> = ({ wizard, form }) => {
  const nav = useNavigation<UnauthorizedStackNavigationProps["navigation"]>();
  const route = useRoute<UnauthorizedStackNavigationProps["route"]>();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
    setError,
  } = useForm<ICodeVerificationValues>({
    defaultValues: {
      code: "",
    },
    mode: "onChange",
  });

  const rules = {
    required: true,
  };

  const phoneNumber: string = form.watch()["phoneNumber"];

  const hashedCodeVerificationValue = useMemo<string>(
    () => encryptCodeVerificationValue(phoneNumber, true),
    [phoneNumber]
  );

  const onSubmit = async (data: ICodeVerificationValues) => {
    console.log("Data", data);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Verified");

        resolve("resolved");
      }, 3000);
    });
  };

  return (
    <>
      <CodeVerificationLayout
        hashedCodeVerificationValue={hashedCodeVerificationValue}
        VerificationValue={phoneNumber}
      >
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
            onPress={() => handleSubmit(onSubmit)}
          >
            {getTranslatedText("verify")}
          </Button>
        </View>
      </CodeVerificationLayout>
    </>
  );
};

export default StepThree;

const style = StyleSheet.create({
  button: {
    marginTop: 60,
    width: "90%",
  },
  errorMessage: {
    marginTop: 60,
  },
});
