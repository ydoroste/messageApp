export enum AuthorizedScreensEnum {
    compose = 'compose',
}


export const AuthorizedScreens: Record<AuthorizedScreensEnum, IScreensDetails> = {
    [AuthorizedScreensEnum.compose]: {
        title: "",
        name: "compose"
    },
};

interface IScreensDetails {
    title: string,
    name: string
}