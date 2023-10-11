import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { getFileDetails } from "@followBack/Utils/stringUtils";
import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native";
import FilePreview from "./Components/FilePreview";
import ImagePreview from "./Components/ImagePreview";
import VideoPreview from "./Components/VideoPreview";

export interface Attachment {
  url: string;
  title: string;
  type: string;
}
interface AttachmentsPreviewProps {
  attachments: Attachment[];
  setAttachmentsLocalURI: React.Dispatch<React.SetStateAction<any[]>>;
}

const AttachmentsPreview = ({
  attachments,
  setAttachmentsLocalURI,
}: AttachmentsPreviewProps) => {
  const { styles } = useStyles();

  const onRemovePress = (index: number) => {
    const currentToCompare = attachments.slice();
    currentToCompare.splice(index, 1);
    setAttachmentsLocalURI(currentToCompare);
  };

  const renderAttachment = ({
    item: attachment,
    index,
  }: {
    item: Attachment;
    index: number;
  }) => {
    const FileDetails = getFileDetails(attachment.title);

    if (FileDetails.isImage) {
      return (
        <ImagePreview
          attachment={attachment}
          index={index}
          onRemovePress={onRemovePress}
        />
      );
    } else if (FileDetails.isVideo) {
      return <VideoPreview index={index} onRemovePress={onRemovePress} />;
    } else if (FileDetails.isFile) {
      return (
        <FilePreview
          index={index}
          onRemovePress={onRemovePress}
          fileExt={FileDetails.fileExtension as string}
        />
      );
    }

    return <></>;
  };

  return attachments.length > 0 ? (
    <View>
      <FlatList
        horizontal
        contentContainerStyle={styles.container}
        data={attachments}
        renderItem={renderAttachment}
        keyExtractor={(item, index) => item.title + index}
      />
    </View>
  ) : (
    <></>
  );
};

export default React.memo(
  AttachmentsPreview,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);

const useStyles = useStylesWithTheme((theme) => ({
  closeContainer: {
    position: "absolute",
    top: 2,
    right: 0,
  },
  close: {
    color: theme.colors.white,
  },
  scrollView: {
    maxHeight: 95,
  },
  container: {
    marginBottom: 10,
  },
  image: {
    width: 90,
    height: 90,
    margin: 5,
    borderRadius: 10,
  },
}));
