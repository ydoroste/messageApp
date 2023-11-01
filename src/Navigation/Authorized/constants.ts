export enum AuthorizedScreensEnum {
  compose = "compose",
  threadDetails = "threadDetails",
  inbox = "inbox",
  bookMark = "bookMark",
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
