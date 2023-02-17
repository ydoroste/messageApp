export enum AuthorizedScreensEnum {
  composeStack = "composeStack",
  compose = "compose",
  threadsListStack = "threadsListStack",
  threadsList = "threadsList",
  threadDetails = "threadDetails",
}

export const AuthorizedScreens: Record<AuthorizedScreensEnum, IScreensDetails> =
  {
    [AuthorizedScreensEnum.compose]: {
      title: "",
      name: "compose",
    },

    [AuthorizedScreensEnum.threadsList]: {
      title: "",
      name: "threadsList",
    },
    [AuthorizedScreensEnum.threadDetails]: {
      title: "",
      name: "threadDetails",
    },
  };

interface IScreensDetails {
  title: string;
  name: string;
}
