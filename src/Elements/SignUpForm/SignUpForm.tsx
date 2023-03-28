import { View, Pressable } from "react-native";
import React, { useState, useRef, useCallback } from "react";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import StepOne from "@followBack/Elements/SignUpForm/Steps/StepOne";
import StepTwo from "@followBack/Elements/SignUpForm/Steps/StepTwo";
import StepThree from "@followBack/Elements/SignUpForm/Steps/StepThree";

import Wizard, {WizardRef} from "react-native-wizard";
import StepIndicator from "@followBack/GenericElements/StepIndicator";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UnauthorizedStackNavigationProps } from "@followBack/Navigation/Unauthorized/types";
import { IVerifyUserFormValues } from "@followBack/Elements/signUpForm/types";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  StepOneFiledsType,
  StepTwoFiledsType,
  StepThreeFiledsType,
  ISignUpFormValues,
} from "@followBack/Elements/SignUpForm/types";

export default function SignUp() {
  const [signUpSuccessStatus, setSignUpSuccessStatus] = useState(false);

  const wizard = useRef<WizardRef | undefined>();
  const { styles } = useStyles();
  const nav = useNavigation<UnauthorizedStackNavigationProps["navigation"]>();

  const signUpForm: UseFormReturn<ISignUpFormValues, any> =
    useForm<ISignUpFormValues>({
      defaultValues: {
        first_name: "",
        last_name: "",
        gender: "",
        birth_date: undefined,
        user_name: "",
        password: "",
        passwordConfirmation: "",
        phone_number: "",
        country: null,
      },
      mode: "onChange",
    });

  const signUpFormValues = signUpForm.watch();
  const { user_name, phone_number } = signUpFormValues;

  const verifyUserForm: UseFormReturn<IVerifyUserFormValues, any> =
    useForm<IVerifyUserFormValues>({
      defaultValues: {
        code: "",
        terms_and_conditions: false,
      },
      mode: "onChange",
    });

  const verifyCodeFormValues = verifyUserForm.watch();

  const isStepOneValid = () => {
    const stepOneKeys: StepOneFiledsType[] = [
      "first_name",
      "last_name",
      "gender",
      "birth_date",
    ];
    return stepOneKeys.every(
      (key: StepOneFiledsType) => !!signUpFormValues[key]
    );
  };

  const isStepTwoValid = () => {
    const stepOneKeys: StepTwoFiledsType[] = [
      "user_name",
      "password",
      "passwordConfirmation",
      "phone_number",
    ];

    return stepOneKeys.every(
      (key: StepTwoFiledsType) => !!signUpFormValues[key]
    );
  };

  const isStepThreeValid = () => {
    const stepThreeKeys: StepThreeFiledsType[] = [
      "code",
      "terms_and_conditions",
    ];

    return stepThreeKeys.every(
      (key: StepThreeFiledsType) => !!verifyCodeFormValues[key]
    );
  };

  useFocusEffect(
    useCallback(() => {
      signUpForm.setFocus("first_name");
      return () => {
        signUpForm.reset();
        verifyUserForm.reset();
      };
    }, [])
  );

  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const stepList = [
    {
      content: (
        <StepOne
          form={signUpForm}
          wizard={wizard}
          isStepValid={isStepOneValid()}
        />
      ),

      isValid: isStepOneValid(),
    },
    {
      content: (
        <StepTwo
          form={signUpForm}
          wizard={wizard}
          isStepValid={isStepTwoValid()}
          setSignUpSuccessStatus={setSignUpSuccessStatus}
        />
      ),
      isValid: isStepTwoValid(),
    },
    {
      content: (
        <StepThree
          form={verifyUserForm}
          wizard={wizard}
          isStepValid={isStepThreeValid()}
          user_name={user_name}
          phone_number={phone_number}
        />
      ),
      isValid: isStepThreeValid(),
    },
  ];
  return (
    <>
      <View
        style={{
          width: "100%",
        }}
      >
        <Wizard
            // @ts-ignore
            ref={wizard}
          steps={stepList}
          isFirstStep={setIsFirstStep}
          isLastStep={setIsLastStep}
          currentStep={({ currentStep }) => {
            setCurrentStep(currentStep);
          }}
        />
      </View>
      <View style={styles.indicatorsWrapper}>
        {stepList.map(({ isValid }, index) => {
          const previousSteps = stepList.slice(0, index);
          const prevStepsAreValid: boolean = previousSteps.every(
            ({ isValid }) => isValid
          );
          const isStepThree = index == stepList.length - 1;

          const isAccessible = isStepThree
            ? prevStepsAreValid && signUpSuccessStatus
            : prevStepsAreValid;


          const isCurrentStep = index === currentStep;

          return (
            <Pressable
              key={index}
              onPress={() => {
                if (!wizard?.current || isCurrentStep || !isAccessible) return;
    
                wizard?.current.goTo(index);
              }}
            >
              <StepIndicator
                disabled={!isCurrentStep}
                isLastIndicator={index + 1 === stepList.length}
              />
            </Pressable>
          );
        })}
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
