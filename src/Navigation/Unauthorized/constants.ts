export enum UnauthorizedScreensEnum {
    signIn = 'signIn',
    resetPassword = 'resetPassword',
    signUp = 'signUp',
    lockedAccount = 'lockedAccount',
    chooseAccount = 'chooseAccount',
    codeVerification = 'codeVerification',
    resetSuccessfully = 'resetSuccessfully',
    noSecondaryEmail = 'noSecondaryEmail',
    createdSuccessfully = 'createdSuccessfully',
    singUpVerification = 'singUpVerification',
}


export const UnauthorizedScreens: Record<UnauthorizedScreensEnum, IScreensDetails> = {
    [UnauthorizedScreensEnum.signIn]: {
        title: "Sign in",
        name: "signIn"
    },
    [UnauthorizedScreensEnum.resetPassword]: {
        title: "Reset password",
        name: "resetPassword"
    },
    [UnauthorizedScreensEnum.signUp]: {
        title: "Sign up",
        name: "signUp"
    },
    [UnauthorizedScreensEnum.lockedAccount]: {
        title: "",
        name: "lockedAccount"
    },
    [UnauthorizedScreensEnum.chooseAccount]: {
        title: "Reset password",
        name: "chooseAccount"
    },
    [UnauthorizedScreensEnum.codeVerification]: {
        title: "Reset password",
        name: "codeVerification"
    },
    [UnauthorizedScreensEnum.resetSuccessfully]: {
        title: "",
        name: "resetSuccessfully"
    },
    [UnauthorizedScreensEnum.noSecondaryEmail]: {
        title: "",
        name: "noSecondaryEmail"
    },
    [UnauthorizedScreensEnum.createdSuccessfully]: {
        title: "",
        name: "createdSuccessfully"
    },
    [UnauthorizedScreensEnum.singUpVerification]: {
        title: "Sign up",
        name: "singUpVerification"
    }
};

interface IScreensDetails {
    title: string,
    name: string
}