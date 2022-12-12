import { Controller } from "react-hook-form";
import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";

import InputField from "@followBack/GenericElements/InputField";
import React, { useState } from "react";
import Button from "@followBack/GenericElements/Button";
import { getTranslatedText } from "@followBack/Localization";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { IStepTwoProps } from "@followBack/Elements/SignUpForm/types";
import PasswordInput from "@followBack/GenericElements/PasswordInput";
import PhoneNumberInput from "@followBack/GenericElements/PhoneNumberInput";
import Typography from "@followBack/GenericElements/Typography";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";

import { useRegister } from "@followBack/Hooks/Apis/Register";
import { IRegisterApiRequest } from "@followBack/Apis/Register/types";

import {
  StepOneFileds,
  StepTwoFileds,
} from "@followBack/Elements/SignUpForm/types";






const StepTwo: React.FC<IStepTwoProps> = ({
  setSignUpSuccessStatus,
  wizard,
  form,
  isStepValid,
}) => {

   const [showPassword, setShowPassword] = useState(false);


  const [errorMessage, setErrorMessage] = useState("");
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

  const values = form.watch();


  const formatToServerDate = ()=>{
    const [day, month, year]=  values.birth_date.split("/")
    return `${year}-${month}-${day}`
  }

  const request: IRegisterApiRequest = {
    first_name: values.first_name,
    last_name: values.last_name,
    gender: values.gender,
    birth_date: formatToServerDate(),
    user_name: values.user_name,
    phone_number: values.formattedPhoneNumber,
    password: values.password,
  };

  useFocusEffect(
    useCallback(() => {
      setFocus("user_name");
    }, [])
  );

  const { refetch } = useRegister(request);

  const onSubmit = async () => {
    setErrorMessage("");

    const { password, passwordConfirmation } = watch();
    if (password !== passwordConfirmation) {
      setError("passwordConfirmation", {
        message: getTranslatedText("passwordNotMatch"),
      });
      return;
    }

    const { data, error, isError } = await refetch();

    if (isError) {
      setSignUpSuccessStatus(false);

      console.log("error", error.response);
      const errors = error?.response?.data?.errors;

      if (!errors || !wizard?.current)
        return setErrorMessage("Something went wrong!");

      const errorKeys = Object.keys(errors);

      for (let i = 0; i < errorKeys.length; i++) {
        const errorKey = errorKeys[i];
        setError(errorKey, { message: errors[errorKey] });
      }

      const stepIndex: number = StepOneFileds.some((stepOneField) =>
        errorKeys.includes(stepOneField)
      )
        ? 0
        : 1;

      return wizard.current?.goTo(stepIndex);
    }

    setSignUpSuccessStatus(true);
    wizard.current?.next();
  };

  const onSetShowPassword = (value: boolean) => {
    setShowPassword(value);
  };

  const { styles } = useStyles();
  return (
    <>
      <Controller
        control={control}
        name="user_name"
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <View style={styles.textInput}>
            <InputField
              // @ts-ignore
              ref={ref}
              error={!!errors.user_name?.message}
              placeholder={getTranslatedText("username")}
              onChangeText={onChange}
              value={value}
              right={<TextInput.Affix text="@em.ls" textStyle={styles.email} />}
            />

            {errors.user_name?.message && (
              <View style={styles.errorMessage}>
                <Typography type="smallRegularBody" color="error">
                  {errors.user_name.message}
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
              showPassword={showPassword}
              setShowPassword={onSetShowPassword}
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
              showPassword={showPassword}
              setShowPassword={onSetShowPassword}
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
              error={!!errors.phone_number?.message}
              country={values.country}
              value={value}
              onChangePhoneNumber={(phoneNumber) => {
                form.setValue("phone_number", phoneNumber);
              }}
              onChangeCountry={(country) => {
                form.setValue("country", country);
              }}
              onChangeFormattedPhoneNumber={(formattedPhoneNumber) => {
                setError("phone_number", undefined);
                form.setValue("formattedPhoneNumber", formattedPhoneNumber);
              }}
            />

            {errors.phone_number?.message && (
              <View style={styles.errorMessage}>
                <Typography type="smallRegularBody" color="error">
                  {errors.phone_number.message}
                </Typography>
              </View>
            )}
          </View>
        )}
        name="phone_number"
      />

      <View style={styles.buttonWrapper}>
        <View style={styles.button}>
          <Button
            type="primary"
            disabled={!isStepValid || isSubmitting}
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          >
            {getTranslatedText("next")}
          </Button>
        </View>
      </View>

      {!!errorMessage && (
        <View style={{...styles.errorMessage, marginTop: 20, marginBottom: 20, alignItems: "center"}}>
          <Typography type="smallRegularBody" color="error">
            {errorMessage}
          </Typography>
        </View>
      )}
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
