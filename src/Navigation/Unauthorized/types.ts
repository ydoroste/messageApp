import {NativeStackScreenProps} from "react-native-screens/lib/typescript/native-stack/types";
import {UnauthorizedScreensEnum} from "@followBack/Navigation/constants";

export type UnauthorizedParams = {
    [UnauthorizedScreensEnum.signIn]: undefined;
    [UnauthorizedScreensEnum.resetPassword]: undefined;
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
    verifyUsingPhone: boolean
}

export type UnauthorizedStackNavigationProps = NativeStackScreenProps<UnauthorizedParams>;
