import {GetApi, PostApi} from "@followBack/Utils/httpApis/apis";
import {ApiEndpoints} from "@followBack/Apis";
import {ICreateAttachmentApiResponse, ICreateAttachmentRequest, IGetUploadLinkApiRequest, IGetUploadLinkApiResponse} from "./types";

export const getUploadLinkApi = (request: IGetUploadLinkApiRequest) => {
    return GetApi<IGetUploadLinkApiResponse>(`${ApiEndpoints.getAttachmentsLink}/${request.filename}`).then(res => res.data);
};

export const createAttachment = (request: ICreateAttachmentRequest) => {
    return PostApi<ICreateAttachmentRequest, ICreateAttachmentApiResponse>(ApiEndpoints.createAttachment, request).then(res => res.data);
}