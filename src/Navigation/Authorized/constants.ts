export enum AuthorizedScreensEnum {
  composeStack = "composeStack",
  compose = "compose",
  threadsListStack = "threadsListStack",
  threadsList = "threadsList",
  threadsListDetails = "threadsListDetails",
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
    [AuthorizedScreensEnum.threadsListDetails]: {
      title: "",
      name: "threadsListDetails",
    },
  };

interface IScreensDetails {
  title: string;
  name: string;
}
