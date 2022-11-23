import {NativeStackScreenProps} from "react-native-screens/lib/typescript/native-stack/types";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/constants";
import {ResetMethod} from "@followBack/Apis/ForgetPassword/types";

export type UnauthorizedParams = {
    [UnauthorizedScreensEnum.signIn]: undefined;
    [UnauthorizedScreensEnum.resetPassword]: IResetPasswordState;
    [UnauthorizedScreensEnum.signUp]: undefined;
    [UnauthorizedScreensEnum.lockedAccount]: ILockScreenState;
    [UnauthorizedScreensEnum.chooseAccount]: undefined;
    [UnauthorizedScreensEnum.codeVerification]: ICodeVerificationState;
    [UnauthorizedScreensEnum.resetSuccessfully]: undefined;
    [UnauthorizedScreensEnum.noSecondaryEmail]: undefined;
    [UnauthorizedScreensEnum.verifiedSuccessfully]: IVerifiedSuccessfullyState;

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

export interface IVerifiedSuccessfullyState {
    userName: string
}