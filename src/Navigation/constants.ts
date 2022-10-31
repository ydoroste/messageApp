export enum UnauthorizedScreensEnum {
    signIn = 'signIn',
    resetPassword = 'resetPassword',
    signUp = 'signUp',
    lockedAccount = 'lockedAccount',
    chooseAccount = 'chooseAccount',
    codeVerification = 'codeVerification',
    resetSuccessfully = 'resetSuccessfully',
}


export const UnauthorizedScreens: Record<UnauthorizedScreensEnum, IScreensDetails> = {
    [UnauthorizedScreensEnum.signIn]: {
        title: "sign in",
        name: "signIn"
    },
    [UnauthorizedScreensEnum.resetPassword]: {
        title: "reset password",
        name: "resetPassword"
    },
    [UnauthorizedScreensEnum.signUp]: {
        title: "sign up",
        name: "signUp"
    },
    [UnauthorizedScreensEnum.lockedAccount]: {
        title: "",
        name: "lockedAccount"
    },
    [UnauthorizedScreensEnum.chooseAccount]: {
        title: "reset password",
        name: "chooseAccount"
    },
    [UnauthorizedScreensEnum.codeVerification]: {
        title: "reset password",
        name: "codeVerification"
    },
    [UnauthorizedScreensEnum.resetSuccessfully]: {
        title: "",
        name: "resetSuccessfully"
    }
};

interface IScreensDetails {
    title: string,
    name: string
}