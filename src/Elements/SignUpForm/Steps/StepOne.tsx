import { Controller } from "react-hook-form";
import { View, StyleSheet, Pressable, Keyboard, Text } from "react-native";
import InputField from "@followBack/GenericElements/InputField";
import * as React from "react";
import Button from "@followBack/GenericElements/Button";
import Dropdown from "@followBack/GenericElements/Dropdown";
import { getTranslatedText } from "@followBack/Localization";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { IStepProps } from "@followBack/Elements/SignUpForm/types";
import DatePicker from "@followBack/GenericElements/DatePicker";
import Typography from "@followBack/GenericElements/Typography";

const gender = [
  { name: "male", value: "male" },
  { name: "female", value: "female" },
];
const StepOne: React.FC<IStepProps> = ({ wizard, form, isStepValid }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, submitCount, isValid, isSubmitting },
    reset,
    setFocus,
    setError,
    getValues,
    watch,
  } = form;
  const rules = {
    required: true,
  };

  useFocusEffect(
    useCallback(() => {
      setFocus("firstName");
    }, [])
  );

  return (
    <>
      <Controller
        control={control}
        name="firstName"
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <View style={styles.textInput}>
            <InputField
              // @ts-ignore
              ref={ref}
              error={!!errors.firstName?.message}
              placeholder={getTranslatedText("firstName")}
              onChangeText={onChange}
              value={value}
            />
            {errors.firstName?.message && (
              <View style={styles.errorMessage}>
                <Typography type="smallRegularBody" color="error">
                  {errors.firstName.message}
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
            <InputField
              // @ts-ignore
              ref={ref}
              error={!!errors.lastName?.message}
              placeholder={getTranslatedText("lastName")}
              onChangeText={onChange}
              value={value}
            />
            {errors.lastName?.message && (
              <View style={styles.errorMessage}>
                <Typography type="smallRegularBody" color="error">
                  {errors.lastName.message}
                </Typography>
              </View>
            )}
          </View>
        )}
        name="lastName"
      />

      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <View style={styles.gender}>
            <Dropdown
              defaultText={getTranslatedText("gender")}
              items={gender}
              value={value}
              onSelect={(selectedItem, index) => {
                form.setValue("gender", selectedItem.value);
              }}
            />

            {errors.gender?.message && (
              <View style={styles.errorMessage}>
                <Typography type="smallRegularBody" color="error">
                  {errors.gender.message}
                </Typography>
              </View>
            )}
          </View>
        )}
        name="gender"
      />

      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <View style={styles.gender}>
            <DatePicker
              error={!!errors.birthDate?.message}
              date={value}
              onSelect={(date) => {
                form.setValue("birthDate", date);
              }}
            />
            {errors.birthDate?.message && (
              <View style={styles.errorMessage}>
                <Typography type="smallRegularBody" color="error">
                  {errors.birthDate.message}
                </Typography>
              </View>
            )}
          </View>
        )}
        name="birthDate"
      />

      <View style={styles.buttonWrapper}>
        <View style={styles.button}>
          <Button
            type="primary"
            disabled={!isStepValid}
            loading={false}
            onPress={() => {
              if (!wizard?.current) return;
              wizard.current?.next();
            }}
          >
            {getTranslatedText("next")}
          </Button>
        </View>
      </View>
    </>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    marginTop: 0,
    marginBottom: 39,
  },

  gender: {
    width: "100%",
    marginBottom: 44,
  },

  birthDate: {
    width: "100%",
    marginBottom: 72,
  },

  buttonWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 36,
  },
  button: {
    width: "90%",
  },

  errorMessage: {
    marginTop: 10,
  },
});
