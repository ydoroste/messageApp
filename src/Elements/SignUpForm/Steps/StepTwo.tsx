import { Controller } from "react-hook-form";
import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";

import InputField from "@followBack/GenericElements/InputField";
import * as React from "react";
import Button from "@followBack/GenericElements/Button";
import { getTranslatedText } from "@followBack/Localization";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { IStepProps } from "@followBack/Elements/SignUpForm/types";
import PasswordInput from "@followBack/GenericElements/PasswordInput";
import PhoneNumberInput from "@followBack/GenericElements/PhoneNumberInput";
import Typography from "@followBack/GenericElements/Typography";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { IResendVerificationCodeRequest } from "@followBack/Apis/ResendVerificationCode/types";
import { useResendVerificationCode } from "@followBack/Hooks/Apis/ResendVerificationCode";

const StepTwo: React.FC<IStepProps> = ({ wizard, form, isStepValid }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, submitCount, isValid, isSubmitting },
    reset,
    setFocus,
    setError,
    watch,
  } = form;
  const rules = {
    required: true,
  };

  useFocusEffect(
    useCallback(() => {
      setFocus("username");
    }, [])
  );

  const { country, formattedPhoneNumber } = watch();

  const resendVerificationCodeRequest: IResendVerificationCodeRequest = {
    user_name: formattedPhoneNumber,
  };

  const { refetch, error } = useResendVerificationCode(
    resendVerificationCodeRequest
  );

  const onSubmit = async () => {
    const { password, passwordConfirmation } = watch();

    if (password !== passwordConfirmation) {
      setError("passwordConfirmation", {
        message: getTranslatedText("passwordNotMatch"),
      });
      return;
    }

    try {
      const a = await refetch();
    } catch (e) {
      console.dir("error", e);
    }

    if (!wizard?.current) return;
    wizard.current?.next();
  };
  const { styles } = useStyles();
  return (
    <>
      <Controller
        control={control}
        name="username"
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <View style={styles.textInput}>
            <InputField
              // @ts-ignore
              ref={ref}
              error={!!errors.username?.message}
              placeholder={getTranslatedText("username")}
              onChangeText={onChange}
              value={value}
              right={<TextInput.Affix text="@em.ls" textStyle={styles.email} />}
            />

            {errors.username?.message && (
              <View style={styles.errorMessage}>
                <Typography type="smallRegularBody" color="error">
                  {errors.username.message}
                </Typography>
              </View>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <View style={styles.textInput}>
            <PasswordInput
              error={!!errors.password?.message}
              placeholder={getTranslatedText("password")}
              onChangeText={onChange}
              value={value}
            />
            {errors.password?.message && (
              <View style={styles.errorMessage}>
                <Typography type="smallRegularBody" color="error">
                  {errors.password.message}
                </Typography>
              </View>
            )}
          </View>
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <View style={styles.passwordField}>
            <PasswordInput
              error={!!errors.passwordConfirmation?.message}
              placeholder={getTranslatedText("passwordConfirmation")}
              onChangeText={onChange}
              value={value}
            />
            {errors.passwordConfirmation?.message && (
              <View style={styles.errorMessage}>
                <Typography type="smallRegularBody" color="error">
                  {errors.passwordConfirmation.message}
                </Typography>
              </View>
            )}
          </View>
        )}
        name="passwordConfirmation"
      />

      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <View style={styles.phoneNumber}>
            <PhoneNumberInput
              error={!!errors.phoneNumber?.message}
              country={country}
              value={value}
              onChangePhoneNumber={(phoneNumber) => {
                form.setValue("phoneNumber", phoneNumber);
              }}
              onChangeCountry={(country) => {
                form.setValue("country", country);
              }}
              onChangeFormattedPhoneNumber={(formattedPhoneNumber) => {
                form.setValue("formattedPhoneNumber", formattedPhoneNumber);
              }}
            />

            {errors.phoneNumber?.message && (
              <View style={styles.errorMessage}>
                <Typography type="smallRegularBody" color="error">
                  {errors.phoneNumber.message}
                </Typography>
              </View>
            )}
          </View>
        )}
        name="phoneNumber"
      />

      <View style={styles.buttonWrapper}>
        <View style={styles.button}>
          <Button
            type="primary"
            disabled={!isStepValid}
            loading={false}
            onPress={onSubmit}
          >
            {getTranslatedText("next")}
          </Button>
        </View>
      </View>
    </>
  );
};

export default StepTwo;

const useStyles = useStylesWithTheme((theme) => ({
  textInput: {
    width: "100%",
    marginTop: 0,
    marginBottom: 39,
  },

  gender: {
    width: "100%",
    marginTop: 0,
    marginBottom: 44,
  },

  birthDate: {
    width: "100%",
    marginTop: 0,

    marginBottom: 72,
  },

  buttonWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 0,

    marginBottom: 36,
  },
  button: {
    width: "90%",
  },
  passwordField: {
    width: "100%",
    marginTop: 0,

    marginBottom: 45,
  },

  email: {
    color: theme.colors.grey02,
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fontFamilies.OpenSans_400Regular,
    lineHeight: theme.lineHeights.medium,
  },

  phoneNumber: {
    marginBottom: 88,
  },
  errorMessage: {
    marginTop: 10,
  },
}));
