export interface ImagePickerResponse {
    assets?: AssetResponseObject[] | null;
    canceled: boolean;
    cancelled: boolean;
  };

  export interface AssetResponseObject {
    assetId?: string | null;
    base64?: string | null,
    duration?: number | null,
    exif?: Record<string, any> | null;
    fileName?: string | null;
    fileSize?: number | null;
    height: number
    type?: string | null;
    uri: string;
    width: number;
  };