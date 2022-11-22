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
const StepOne: React.FC<IStepOneProps> = ({ wizard, form }) => {
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

  const isStepOneValid = () => {
    const values = getValues();
    const stepOneKeys: StepOneFiledsType[] = [
      "firstName",
      "lastName",
      "gender",
      "birthDate",
    ];
    type StepOneFiledsType = "firstName" | "lastName" | "gender" | "birthDate";
    return stepOneKeys.every((key: StepOneFiledsType) => !!values[key]);
  };

  console.log("isStepOneValid()", isStepOneValid());
  console.log("values", getValues());

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
              date={value}
              onSelect={(date) => {
                form.setValue("birthDate", date);
              }}
            />
          </View>
        )}
        name="birthDate"
      />

      <View style={styles.buttonWrapper}>
        <View style={styles.button}>
          <Button
            type="primary"
            disabled={!isStepOneValid()}
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
});
