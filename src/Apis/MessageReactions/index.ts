import { DeleteApi, PostApi, PutApi } from "@followBack/Utils/httpApis/apis";
import { ApiEndpoints } from "@followBack/Apis";
import {
  IDeleteEmojiApiRequest,
  IDeleteEmojiApiResponse,
  ICreateEmojiApiRequest,
  ICreateEmojiApiResponse,
  IUpdateEmojiApiRequest,
} from "./types";

export const createEmojiApi = async ({
  reaction,
  headerId,
}: {
  reaction: string;
  headerId: string;
}) => {
  return PostApi<ICreateEmojiApiRequest, ICreateEmojiApiResponse, {}>(
    ApiEndpoints.Emoji,
    { reaction, headerId }
  )
    .then((res) => res.data.data.reaction)
    .catch((e) => console.log("error from createEmojiApi", e.response.data));
};

export const updateEmojiApi = async ({
  id,
  reaction,
}: {
  id: string;
  reaction: string;
}) => {
  return PutApi<IUpdateEmojiApiRequest, ICreateEmojiApiResponse>(
    ApiEndpoints.Emoji,
    {
      id,
      reaction,
    }
  )
    .then((res) => res.data.data.reaction)
    .catch((e) => console.log("error from updateEmojiApi", e.response.data));
};

export const deleteEmojiApi = async ({ id }: { id: string }) => {
  return DeleteApi<IDeleteEmojiApiResponse>(`${ApiEndpoints.Emoji}/${id}`)
    .then((res) => res.data)
    .catch((e) => console.log("error from deleteEmojiApi", e.response.data));
};
