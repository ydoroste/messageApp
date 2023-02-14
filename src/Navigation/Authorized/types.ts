import {AuthorizedScreensEnum} from "@followBack/Navigation/Authorized/constants";

export type AuthorizedParams = {
    [AuthorizedScreensEnum.compose]: undefined;
    [AuthorizedScreensEnum.threadsList]: IThreadListState;
};


export interface  IThreadListState {
    id: string,
    path: string,
    subscribed: boolean,
}