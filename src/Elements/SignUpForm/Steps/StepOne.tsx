import { Controller } from "react-hook-form";
import { View, StyleSheet, Pressable, Keyboard, Text } from "react-native";
import InputField from "@followBack/GenericElements/InputField";
import * as React from "react";
import Button from "@followBack/GenericElements/Button";
import Dropdown from "@followBack/GenericElements/Dropdown";
import { getTranslatedText } from "@followBack/Localization";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { IStepOneProps } from "@followBack/Elements/SignUpForm/types";
import DatePicker from "@followBack/GenericElements/DatePicker";
import Typography from "@followBack/GenericElements/Typography";

const gender = [
  { name: "male", value: "male" },
  { name: "female", value: "female" },
];
const StepOne: React.FC<IStepOneProps> = ({ wizard, form, isStepValid }) => {
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
      setFocus("first_name");
    }, [])
  );

  return (
    <>
      <Controller
        control={control}
        name="first_name"
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <View style={styles.textInput}>
            <InputField
              // @ts-ignore
              ref={ref}
              error={!!errors.first_name?.message}
              placeholder={getTranslatedText("firstName")}
              onChangeText={onChange}
              value={value}
            />
            {errors.first_name?.message && (
              <View style={styles.errorMessage}>
                <Typography type="smallRegularBody" color="error">
                  {errors.first_name.message}
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
              error={!!errors.last_name?.message}
              placeholder={getTranslatedText("lastName")}
              onChangeText={onChange}
              value={value}
            />
            {errors.last_name?.message && (
              <View style={styles.errorMessage}>
                <Typography type="smallRegularBody" color="error">
                  {errors.last_name.message}
                </Typography>
              </View>
            )}
          </View>
        )}
        name="last_name"
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
              error={!!errors.birth_date?.message}
              date={value}
              onSelect={(date) => {
                form.setValue("birth_date", date);
              }}
            />
            {errors.birth_date?.message && (
              <View style={styles.errorMessage}>
                <Typography type="smallRegularBody" color="error">
                  {errors.birth_date.message}
                </Typography>
              </View>
            )}
          </View>
        )}
        name="birth_date"
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
