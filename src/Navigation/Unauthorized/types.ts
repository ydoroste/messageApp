import {NativeStackScreenProps} from "react-native-screens/lib/typescript/native-stack/types";
import {AuthStackScreensEnum} from "@followBack/Navigation/Unauthorized/constants";
import {ResetMethod} from "@followBack/Apis/ForgetPassword/types";

export type UnauthorizedParams = {
    [AuthStackScreensEnum.signIn]: undefined;
    [AuthStackScreensEnum.resetPassword]: IResetPasswordState;
    [AuthStackScreensEnum.signUp]: undefined;
    [AuthStackScreensEnum.lockedAccount]: ILockScreenState;
    [AuthStackScreensEnum.chooseAccount]: undefined;
    [AuthStackScreensEnum.codeVerification]: ICodeVerificationState;
    [AuthStackScreensEnum.resetSuccessfully]: undefined;
    [AuthStackScreensEnum.noSecondaryEmail]: undefined;
    [AuthStackScreensEnum.createdSuccessfully]: ICreatedSuccessfullyState;
    [AuthStackScreensEnum.singUpVerification]: ICodeVerificationState;
};

export interface  ICodeVerificationState {
    phoneNumber: string,
    secondaryEmail?: string,
    resetMethod: ResetMethod,
    userName: string
}
export interface IResetPasswordState {
    resetToken: string
}
export type UnauthorizedStackNavigationProps = NativeStackScreenProps<UnauthorizedParams>;

export interface ILockScreenState {
    userName: string
}

export interface ICreatedSuccessfullyState {
    userName: string
}