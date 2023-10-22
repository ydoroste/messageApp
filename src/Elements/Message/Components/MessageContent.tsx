import React from "react";
import { View, StyleProp, ViewStyle, Dimensions } from "react-native";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { IThreadMessage } from "@followBack/Apis/ThreadMessages/types";
import { colorTypes } from "@followBack/GenericElements/Typography/types";
import RenderHTML, { MixedStyleDeclaration } from "react-native-render-html";
import { colorsToTheme } from "@followBack/GenericElements/Typography/utils";
import useTheme from "@followBack/Hooks/useTheme";
import useMessageSenderDetails from "@followBack/Hooks/useMessageSenderDetails";
import { getFileDetails } from "@followBack/Utils/stringUtils";
import ImagesPreview from "./ImagesPreview/ImagesPreview";
import FilesPreview from "./FilesPreview/FilesPreview";
import CachingLayer from "@followBack/Classes/CachingLayer";

const { width } = Dimensions.get("window");

const MessageContent = ({
  item,
  containerStyle,
  textColor = "chat",
  isAllFromUnSend,
  setIsAttachmentsImageOpened,
  isViewOnly,
  onNavigateToRepliedMessage,
}: {
  item: IThreadMessage;
  containerStyle?: StyleProp<ViewStyle>;
  textColor?: colorTypes;
  isAllFromUnSend: boolean;
  isViewOnly?: boolean;
  setIsAttachmentsImageOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  onNavigateToRepliedMessage?: () => void;
}) => {
  const { styles } = useStyles();

  const color = colorsToTheme[textColor];

  const { colors } = useTheme();

  const { isOwnMessage, text } = useMessageSenderDetails(item);

  const messageStyle =
    !isAllFromUnSend && isOwnMessage
      ? styles.ownUnSendMessageStyle
      : isOwnMessage
      ? styles.ownMessageStyle
      : styles.otherMessagesStyle;

  const ImageAttachments = [],
    FileAttachments = [];

  if (item.attachments?.length > 0) {
    for (const attachment of item.attachments) {
      const FileDetails = getFileDetails(attachment.title);

      if (FileDetails.isImage || FileDetails.isVideo) {
        if (attachment.id) {
          CachingLayer.saveMediaToDir(
            attachment.id,
            FileDetails.fileExtension,
            attachment.url
          );
        }
        ImageAttachments.push(attachment);
      } else {
        FileAttachments.push(attachment);
      }
    }
  }

  return (
    <View style={[styles.contentContainer, messageStyle, containerStyle]}>
      {text && (
        <RenderHTML
          baseStyle={
            { ...styles.html, color: colors[color] } as MixedStyleDeclaration
          }
          source={{
            html: text,
          }}
          contentWidth={width}
        />
      )}

      {ImageAttachments.length > 0 && (
        <ImagesPreview
          ImageAttachments={ImageAttachments}
          notConfirmedNewMessage={item.notConfirmedNewMessage as boolean}
          setIsAttachmentsImageOpened={setIsAttachmentsImageOpened}
          isMarginTop={!!text}
          isViewOnly={!!isViewOnly}
          onNavigateToRepliedMessage={onNavigateToRepliedMessage}
        />
      )}

      {FileAttachments.length > 0 && (
        <FilesPreview
          FileAttachments={FileAttachments}
          notConfirmedNewMessage={item.notConfirmedNewMessage as boolean}
          isMarginTop={!!text}
          isViewOnly={!!isViewOnly}
        />
      )}
    </View>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: theme.colors.dark02,
  },
  imageStyle: {
    width: 224,
    height: 224,
    margin: 5,
    borderRadius: 5,
  },
  ownMessageStyle: {
    backgroundColor: theme.colors.purple,
  },
  ownUnSendMessageStyle: {
    backgroundColor: theme.colors.green01,
  },
  otherMessagesStyle: {
    backgroundColor: theme.colors.dark04,
    borderColor: theme.colors.dark02,
    borderWidth: 1,
  },
  html: {
    fontFamily: theme.fontFamilies.OpenSans_700Bold,
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.lineHeights.medium,
  },
}));

export default React.memo(
  MessageContent,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
