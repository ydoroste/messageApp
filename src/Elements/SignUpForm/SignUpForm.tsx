import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Dimensions,
  Button,
  SafeAreaView,
  Pressable,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState, useRef } from "react";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import StepOne from "@followBack/Elements/SignUpForm/Steps/StepOne/StepOne";
import Wizard from "react-native-wizard";
import StepIndicator from "@followBack/GenericElements/StepIndicator";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UnauthorizedStackNavigationProps } from "@followBack/Navigation/Unauthorized/types";
import { ISignUpFormValues } from "@followBack/Elements/signUpForm/types";
import { useForm, UseFormReturn } from "react-hook-form";

export default function SignIn() {
  const wizard = useRef();
  const { styles } = useStyles();
  const nav = useNavigation<UnauthorizedStackNavigationProps["navigation"]>();

  const form: UseFormReturn<ISignUpFormValues, any> =
    useForm<ISignUpFormValues>({
      defaultValues: {
        firstName: "",
        lastName: "",
        gender: "",
      },
      mode: "onChange",
    });


  const onSubmit = async (data: ISignUpFormValues) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 3000);
    });
  };

  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const stepList = [
    {
      content: <StepOne form={form} />,
    },
    {
      content: (
        <View style={{ width: 100, height: 100, backgroundColor: "#e04851" }} />
      ),
    },
    {
      content: (
        <View style={{ width: 100, height: 500, backgroundColor: "#9be07d" }} />
      ),
    },
  ];
  return (
    <>
    <View style={{
        width: "100%"        
    }}>
      <Wizard
        ref={wizard}
        steps={stepList}
        isFirstStep={(val) => setIsFirstStep(val)}
        isLastStep={(val) => setIsLastStep(val)}
        onNext={() => {
          console.log("Next Step Called");
        }}
        onPrev={() => {
          console.log("Previous Step Called");
        }}
        currentStep={({ currentStep, isLastStep, isFirstStep }) => {
          setCurrentStep(currentStep);
        }}
      />
</View>
      <View style={styles.indicatorsWrapper}>
        {stepList.map((val, index) => (
          <StepIndicator
            key={index}
            disabled={index === currentStep}
            isLastIndicator={index + 1 === stepList.length}
          />
        ))}
      </View>
    </>
  );
}

const useStyles = useStylesWithTheme((theme) => ({
  indicatorsWrapper: {
    flexDirection: "row",
    alignContent: "center",
  },
}));
