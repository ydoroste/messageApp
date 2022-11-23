import * as React from "react";
import { useNavigation } from "@react-navigation/core";
import { UnauthorizedStackNavigationProps } from "@followBack/Navigation/Unauthorized/types";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { getTranslatedText } from "@followBack/Localization";
import Button from "@followBack/GenericElements/Button";
import CodeVerificationFields from "@followBack/GenericElements/CodeVerificationFields";
import Typography from "@followBack/GenericElements/Typography";
import { IStepThreeProps } from "@followBack/Elements/SignUpForm/types";
import CodeVerificationLayout from "@followBack/Elements/CodeVerificationLayout";

const CodeVerificationForm: React.FC<IStepThreeProps> = ({ wizard, form }) => {
  const nav = useNavigation<UnauthorizedStackNavigationProps["navigation"]>();
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

  return (
    <>
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
          onPress={() => console.log("code verification")}
        >
          {getTranslatedText("verify")}
        </Button>
      </View>
    </>
  );
};

export default CodeVerificationForm;

const style = StyleSheet.create({
  button: {
    marginTop: 60,
    width: "90%",
  },
  errorMessage: {
    marginTop: 60,
  },
});
