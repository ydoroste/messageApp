import { Controller } from "react-hook-form";
import { View, StyleSheet, TextInput, Text } from "react-native";
import InputField from "@followBack/GenericElements/InputField";
import * as React from "react";
import Button from "@followBack/GenericElements/Button";
import Dropdown from "@followBack/GenericElements/Dropdown";
import { getTranslatedText } from "@followBack/Localization";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { IStepOneProps } from "@followBack/Elements/SignUpForm/types";
import DatePicker from "@followBack/GenericElements/DatePicker";
const gender = [
  { name: "male", value: "male" },
  { name: "female", value: "female" },
];
const StepOne: React.FC<IStepOneProps> = ({ form }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, submitCount, isValid, isSubmitting },
    reset,
    setFocus,
    setError,
    getValues,
  } = form;
  const rules = {
    required: true,
  };

  useFocusEffect(
    useCallback(() => {
      setFocus("firstName");
      return () => {
        reset();
      };
    }, [])
  );

  console.log("values", form.getValues());

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
              placeholder={getTranslatedText("firstName")}
              onChangeText={onChange}
              value={value}
            />
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
              placeholder={getTranslatedText("lastName")}
              onChangeText={onChange}
              value={value}
            />
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
              onSelect={(selectedItem, index) => {
                form.setValue("gender", selectedItem.value);
              }}
            />
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
            />
          </View>
        )}
        name="birthDate"
      />
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
});
