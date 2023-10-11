import React from "react";
import RenderFilePreview from "./RenderFilePreview";

interface FilesPreviewProps {
  FileAttachments: any[];
  notConfirmedNewMessage: boolean;
  isMarginTop: boolean;
  isViewOnly: boolean;
}

const FilesPreview = ({
  FileAttachments,
  notConfirmedNewMessage,
  isMarginTop,
  isViewOnly,
}: FilesPreviewProps) => {
  return (
    <>
      {FileAttachments.map((attachment) => {
        return (
          <RenderFilePreview
            size={attachment.size}
            uri={attachment.url || attachment.uri}
            title={attachment.title ?? attachment.fileName}
            notConfirmedNewMessage={notConfirmedNewMessage}
            isMarginTop={isMarginTop}
            isViewOnly={isViewOnly}
          />
        );
      })}
    </>
  );
};

export default React.memo(
  FilesPreview,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
