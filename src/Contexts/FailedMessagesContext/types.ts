export interface IFailedMessagesContext {
  failedMessagesData: FailedMessagesDictionary;
  setFailedMessagesData?: React.Dispatch<
    React.SetStateAction<FailedMessagesDictionary>
  >;
}

export interface IFailedMEssage {
  text: string;
  messageId?: string;
}

export interface FailedMessagesDictionary {
  [key: string]: IFailedMEssage[];
}
