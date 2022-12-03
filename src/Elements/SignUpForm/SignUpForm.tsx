import { View, Pressable } from "react-native";
import React, { useState, useRef, useCallback } from "react";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import StepOne from "@followBack/Elements/SignUpForm/Steps/StepOne";
import StepTwo from "@followBack/Elements/SignUpForm/Steps/StepTwo";
import StepThree from "@followBack/Elements/SignUpForm/Steps/StepThree";

import Wizard from "react-native-wizard";
import StepIndicator from "@followBack/GenericElements/StepIndicator";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UnauthorizedStackNavigationProps } from "@followBack/Navigation/Unauthorized/types";
import { ISignUpFormValues } from "@followBack/Elements/signUpForm/types";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  StepOneFiledsType,
  StepTwoFiledsType,
  StepThreeFiledsType,
} from "@followBack/Elements/SignUpForm/types";

export default function SignUp() {
  const wizard = useRef<React.MutableRefObject<any>>();
  const { styles } = useStyles();
  const nav = useNavigation<UnauthorizedStackNavigationProps["navigation"]>();

  const form: UseFormReturn<ISignUpFormValues, any> =
    useForm<ISignUpFormValues>({
      defaultValues: {
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        username: "",
        password: "",
        passwordConfirmation: "",
        phoneNumber: "",
        acceptsCoditionsAndTerms: false,
        country: null
      },
      mode: "onChange",
    });

  const { reset, setFocus, watch } = form;

  const values = watch();

  const isStepOneValid = () => {
    const stepOneKeys: StepOneFiledsType[] = [
      "firstName",
      "lastName",
      "gender",
      "birthDate",
    ];
    return stepOneKeys.every((key: StepOneFiledsType) => !!values[key]);
  };

  const isStepTwoValid = () => {
    const stepOneKeys: StepTwoFiledsType[] = [
      "username",
      "password",
      "passwordConfirmation",
      "phoneNumber",
    ];

    return stepOneKeys.every((key: StepTwoFiledsType) => !!values[key]);
  };

  const isStepThreeValid = () => {
    const stepThreeKeys: StepThreeFiledsType[] = [
      "code",
      "acceptsCoditionsAndTerms",
    ];

    return stepThreeKeys.every((key: StepThreeFiledsType) => !!values[key]);
  };

  useFocusEffect(
    useCallback(() => {
      setFocus("firstName");
      return () => {
        reset();
      };
    }, [])
  );

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
      content: (
        <StepOne form={form} wizard={wizard} isStepValid={isStepOneValid()} />
      ),

      isValid: isStepOneValid(),
    },
    {
      content: (
        <StepTwo form={form} wizard={wizard} isStepValid={isStepTwoValid()} />
      ),
      isValid: isStepTwoValid(),
    },
    {
      content: (
        <StepThree
          form={form}
          wizard={wizard}
          isStepValid={isStepThreeValid()}
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
          ref={wizard}
          steps={stepList}
          isFirstStep={(val) => setIsFirstStep(val)}
          isLastStep={(val) => setIsLastStep(val)}
          // nextStepAnimation={"slideRight"}
          currentStep={({ currentStep, isLastStep, isFirstStep }) => {
            setCurrentStep(currentStep);
          }}
        />
      </View>
      <View style={styles.indicatorsWrapper}>
        {stepList.map(({ isValid }, index) => {
          const previousSteps = stepList.slice(0, index);
          const isAccessable = previousSteps.every(({ isValid }) => isValid);
          const isCurrentStep = index === currentStep;
          console.log("isAccessable", isAccessable)
          return (
            <Pressable
              key={index}
              onPress={() => {
                if (!wizard?.current || isCurrentStep || !isAccessable) return;

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
