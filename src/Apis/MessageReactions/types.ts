export interface ICreateEmojiApiRequest {
  reaction: string;
  headerId: string;
}

export interface ICreateEmojiApiResponse {
  data: {
    reaction: {
      id: string;
      headerId: string;
      byUserId: string;
      reaction: string;
      createdAt: string;
    };
    message: string;
    statusCode: number;
  };
}

export interface IUpdateEmojiApiRequest {
  id: string;
  reaction: string;
}

export interface IDeleteEmojiApiRequest {
  id: string;
}

export interface IDeleteEmojiApiResponse {
  statusCode: number;
  message: string;
}
