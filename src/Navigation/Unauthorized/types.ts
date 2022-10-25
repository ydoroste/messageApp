import {NativeStackScreenProps} from "react-native-screens/lib/typescript/native-stack/types";
import {UnauthorizedScreens, UnauthorizedScreensEnum} from "@followBack/Navigation/constants";

export type UnauthorizedParams = {
    [UnauthorizedScreensEnum.signIn]: undefined;
    [UnauthorizedScreensEnum.forgetPassword]: undefined;
    [UnauthorizedScreensEnum.signUp]: undefined;
    [UnauthorizedScreensEnum.lockedAccount]: undefined;
};


export type UnauthorizedStackNavigationProps = NativeStackScreenProps<UnauthorizedParams>;
