import {AuthorizedScreensEnum} from "@followBack/Navigation/Authorized/constants";
import {NativeStackScreenProps} from "react-native-screens/lib/typescript/native-stack/types";
import {DrawerScreenProps} from "@react-navigation/drawer/lib/typescript/src/types";

export type AuthorizedParams = {
    [AuthorizedScreensEnum.compose]: undefined;
    [AuthorizedScreensEnum.threadsList]: IThreadListState;
};

export type authorizedStackNavigationProps = NativeStackScreenProps<AuthorizedParams>;
export type authorizedDrawerNavigationProps = DrawerScreenProps<AuthorizedParams>;
export interface  IThreadListState {
    id: string,
    path: string,
    subscribed: boolean,
}