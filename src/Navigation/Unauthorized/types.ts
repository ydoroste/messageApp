import {NativeStackScreenProps} from "react-native-screens/lib/typescript/native-stack/types";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/constants";

export type UnauthorizedParams = {
    [UnauthorizedScreensEnum.signIn]: undefined;
    [UnauthorizedScreensEnum.resetPassword]: IResetPasswordState;
    [UnauthorizedScreensEnum.signUp]: undefined;
    [UnauthorizedScreensEnum.lockedAccount]: undefined;
    [UnauthorizedScreensEnum.chooseAccount]: undefined;
    [UnauthorizedScreensEnum.codeVerification]: ICodeVerificationState;
    [UnauthorizedScreensEnum.resetSuccessfully]: undefined;
    [UnauthorizedScreensEnum.noSecondaryEmail]: undefined;
};

export interface  ICodeVerificationState {
    phoneNumber: string,
    secondaryEmail?: string,
    verifyUsingPhone: boolean,
    userName: string
}
export interface IResetPasswordState {
    resetToken: string
}
export type UnauthorizedStackNavigationProps = NativeStackScreenProps<UnauthorizedParams>;
