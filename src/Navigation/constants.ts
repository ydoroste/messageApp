export enum UnauthorizedScreensEnum {
    signIn = 'signIn',
    forgetPassword = 'forgetPassword',
    signUp = 'signUp',
    lockedAccount = 'lockedAccount'
}


export const UnauthorizedScreens: Record<UnauthorizedScreensEnum, IScreensDetails> = {
    [UnauthorizedScreensEnum.signIn]: {
        title: "sign in",
        name: "signIn"
    },
    [UnauthorizedScreensEnum.forgetPassword]: {
        title: "forget password",
        name: "forgetPassword"
    },
    [UnauthorizedScreensEnum.signUp]: {
        title: "sign up",
        name: "signUp"
    },
    [UnauthorizedScreensEnum.lockedAccount]: {
        title: "",
        name: "lockedAccount"
    }
};

interface IScreensDetails {
    title: string,
    name: string
}