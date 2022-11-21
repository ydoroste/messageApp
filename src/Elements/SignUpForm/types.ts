import { UseFormReturn } from "react-hook-form";

export interface ISignUpFormValues {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date
}

export interface IStepOneProps {
  form: UseFormReturn<ISignUpFormValues, any>;
}
