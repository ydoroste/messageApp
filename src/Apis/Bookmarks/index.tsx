import { PutApi } from "@followBack/Utils/httpApis/apis";
import { ApiEndpoints } from "@followBack/Apis";
import { IBookmarkApiResponse, IBookmarkRequest } from "./types";

export const editBookmark = (request: IBookmarkRequest) => {
    return PutApi<IBookmarkRequest, IBookmarkApiResponse>(ApiEndpoints.bookmarks, request).then(res => res.data);
}