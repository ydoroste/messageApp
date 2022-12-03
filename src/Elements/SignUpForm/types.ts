import { UseFormReturn } from "react-hook-form";
import React from "react";
export interface ISignUpFormValues {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  username: string;
  password: string;
  passwordConfirmation: string;
  phoneNumber: string;
  formattedPhoneNumber: string;
  code: string;
  acceptsCoditionsAndTerms: boolean;
  country: any;
}

export interface IStepProps {
  form: UseFormReturn<ISignUpFormValues, any>;
  wizard: React.MutableRefObject<any>;
  isStepValid: boolean;
}

export type StepOneFiledsType =
  | "firstName"
  | "lastName"
  | "gender"
  | "birthDate";

export type StepTwoFiledsType =
  | "username"
  | "password"
  | "passwordConfirmation"
  | "phoneNumber";
export type StepThreeFiledsType = "code" | "acceptsCoditionsAndTerms";
