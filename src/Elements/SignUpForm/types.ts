import { UseFormReturn } from "react-hook-form";
import React from "react";
export interface ISignUpFormValues {
  first_name: string;
  last_name: string;
  gender: string;
  birth_date: string;
  user_name: string;
  password: string;
  passwordConfirmation: string;
  phone_number: string;
  formattedPhoneNumber: string;
  country: any;
}

export interface IVerifyUserFormValues {
  code: string;
  terms_and_conditions: boolean;
}

export interface IStepProps {
  form: UseFormReturn<ISignUpFormValues, any>;
  wizard: React.MutableRefObject<any>;
  isStepValid: boolean;
}

export interface IStepThreeProps {
  form: UseFormReturn<IVerifyUserFormValues, any>;
  wizard: React.MutableRefObject<any>;
  isStepValid: boolean;
  user_name: string;
  phone_number: string;
}

export const StepOneFileds = [
  "first_name",
  "last_name",
  "gender",
  "birth_date",
] as const;
export type StepOneFiledsType = typeof StepOneFileds[number];

export const StepTwoFileds = [
  "user_name",
  "password",
  "passwordConfirmation",
  "phone_number",
] as const;
export type StepTwoFiledsType = typeof StepTwoFileds[number];

export type StepThreeFiledsType = "code" | "terms_and_conditions";
