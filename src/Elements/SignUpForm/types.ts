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
}

export interface IStepOneProps {
  form: UseFormReturn<ISignUpFormValues, any>;
  wizard: React.MutableRefObject<any>;
}

export interface IStepThreeProps {
  form: UseFormReturn<ISignUpFormValues, any>;
  wizard: React.MutableRefObject<any>;
}
