export enum AuthStackScreensEnum {
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


export const AuthStackScreens: Record<AuthStackScreensEnum, IScreensDetails> = {
    [AuthStackScreensEnum.signIn]: {
        title: "Sign in",
        name: "signIn"
    },
    [AuthStackScreensEnum.resetPassword]: {
        title: "Reset password",
        name: "resetPassword"
    },
    [AuthStackScreensEnum.signUp]: {
        title: "Sign up",
        name: "signUp"
    },
    [AuthStackScreensEnum.lockedAccount]: {
        title: "",
        name: "lockedAccount"
    },
    [AuthStackScreensEnum.chooseAccount]: {
        title: "Reset password",
        name: "chooseAccount"
    },
    [AuthStackScreensEnum.codeVerification]: {
        title: "Reset password",
        name: "codeVerification"
    },
    [AuthStackScreensEnum.resetSuccessfully]: {
        title: "",
        name: "resetSuccessfully"
    },
    [AuthStackScreensEnum.noSecondaryEmail]: {
        title: "",
        name: "noSecondaryEmail"
    },
    [AuthStackScreensEnum.createdSuccessfully]: {
        title: "",
        name: "createdSuccessfully"
    },
    [AuthStackScreensEnum.singUpVerification]: {
        title: "Sign up",
        name: "singUpVerification"
    }
};

interface IScreensDetails {
    title: string,
    name: string
}