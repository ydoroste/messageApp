import {IInputFieldProps} from "@followBack/GenericElements/InputField/types";

export interface IPasswordInputProps extends IInputFieldProps {
    showPassword?: boolean,
    setShowPassword?: (value: boolean) => void
}