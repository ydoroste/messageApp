import IconButton from "@followBack/GenericElements/IconButton";
import Typography from "@followBack/GenericElements/Typography";
import useTheme from "@followBack/Hooks/useTheme";
import React, { useCallback, useState } from "react";
import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import RenderImageAttachment from "./RenderImageAttachment";

import { saveFile } from "../../Utils";
import MediaPreview from "@followBack/GenericElements/MediaPreview/MediaPreview";
import { FlashList } from "@shopify/flash-list";
import CachingLayer from "@followBack/Classes/CachingLayer";

interface ImagesPreviewProps {
  ImageAttachments: any[];
  notConfirmedNewMessage: boolean;
  setIsAttachmentsImageOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  isMarginTop: boolean;
  isViewOnly: boolean;
  onNavigateToRepliedMessage?: () => void;
}

const ImagesPreview = ({
  ImageAttachments,
  notConfirmedNewMessage,
  setIsAttachmentsImageOpened,
  isMarginTop,
  isViewOnly,
  onNavigateToRepliedMessage,
}: ImagesPreviewProps) => {
  const [isOpenImagesList, setIsOpenImagesList] = useState(false);
  const [isPreviewImagesOpened, setIsPreviewImagesOpened] = useState(false);
  const [openedImageIndex, setOpenedImageIndex] = useState(0);
  const [isDownloadStarted, setIsDownloadStarted] = useState(false);

  const { colors } = useTheme();

  const onOpenListPress = useCallback(() => {
    setIsOpenImagesList(true);
    if (setIsAttachmentsImageOpened) {
      setIsAttachmentsImageOpened(true);
    }
  }, []);

  const onCloseListPress = useCallback(() => {
    setIsOpenImagesList(false);
    if (setIsAttachmentsImageOpened) {
      setIsAttachmentsImageOpened(false);
    }
  }, []);

  const onImagePreviewPress = useCallback((index: number) => {
    setIsPreviewImagesOpened(true);
    setOpenedImageIndex(index);
  }, []);

  const onCloseImagePreviewPress = useCallback(() => {
    setIsPreviewImagesOpened(false);
    setOpenedImageIndex(0);
  }, []);

  const onDownloadAllPress = useCallback(async () => {
    try {
      setIsDownloadStarted(true);
      for (const attachment of ImageAttachments) {
        const url = CachingLayer.media[attachment.id] ?? attachment.url;
        await saveFile(url, attachment.title);
      }
      alert("All Media Have Been Saved Successfully");
    } catch (error) {
      alert(error);
    } finally {
      setIsDownloadStarted(false);
    }
  }, [ImageAttachments]);

  const footer = [
    {
      iconName: "saveall",
      onPress: onDownloadAllPress,
      title: "save all",
    },
    {
      iconName: "forward",
      onPress: () => {},
      title: "forward all",
    },
    {
      iconName: "close",
      onPress: onCloseListPress,
      title: "close",
    },
  ];

  return (
    <View style={[styles.container, { marginTop: isMarginTop ? 20 : 0 }]}>
      {!isOpenImagesList && (
        <>
          {ImageAttachments.map((attachment, index) => (
            <View
              style={{
                position: "absolute",
                left: index * 30,
              }}
            >
              <RenderImageAttachment
                key={index}
                title={attachment.title}
                url={attachment.url}
                id={attachment.id}
                index={index}
                notConfirmedNewMessage={notConfirmedNewMessage as boolean}
                onImagePreviewPress={
                  isViewOnly ? onNavigateToRepliedMessage : onImagePreviewPress
                }
              />
              {ImageAttachments.length === 1 && (
                <Pressable
                  disabled={notConfirmedNewMessage || isViewOnly}
                  style={styles.downloadContainer}
                  onPress={onDownloadAllPress}
                >
                  <IconButton
                    name="download"
                    width={16}
                    height={16}
                    color={colors.blue}
                    disabled={notConfirmedNewMessage}
                  />
                  <Typography type="mediumRegularBody" color="blue">
                    download
                  </Typography>
                </Pressable>
              )}

              {isDownloadStarted && (
                <ActivityIndicator
                  size="small"
                  color={colors.white}
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    position: "absolute",
                    alignSelf: "center",
                  }}
                />
              )}
            </View>
          ))}
          {ImageAttachments.length > 1 && (
            <Pressable
              disabled={notConfirmedNewMessage}
              onPress={
                isViewOnly ? onNavigateToRepliedMessage : onOpenListPress
              }
              style={styles.moreThanOne}
            >
              <Typography color="primary" type="largeBoldTitle">
                {`+${ImageAttachments.length}`}
              </Typography>
              {notConfirmedNewMessage && (
                <ActivityIndicator
                  size="small"
                  color={colors.white}
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    position: "absolute",
                    alignSelf: "center",
                  }}
                />
              )}
            </Pressable>
          )}
        </>
      )}
      {isOpenImagesList && (
        <View>
          <FlashList
            horizontal
            data={ImageAttachments}
            renderItem={({ item, index }) => (
              <RenderImageAttachment
                title={item.title}
                url={item.url}
                id={item.id}
                index={index}
                notConfirmedNewMessage={false}
                onImagePreviewPress={onImagePreviewPress}
              />
            )}
            keyExtractor={(item, index) => item.id?.toString()}
          />
          <View style={styles.footerContainer}>
            {footer.map(({ iconName, onPress, title }) => {
              return (
                <Pressable onPress={onPress} style={styles.footerIconContainer}>
                  <IconButton
                    name={iconName}
                    width={16}
                    height={16}
                    color={colors.blue}
                  />
                  <Typography type="mediumRegularBody" color="blue">
                    {title}
                  </Typography>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
      {isPreviewImagesOpened && (
        <MediaPreview
          mediaItems={ImageAttachments}
          onClose={onCloseImagePreviewPress}
          openedImageIndex={openedImageIndex}
        />
      )}
    </View>
  );
};

export default ImagesPreview;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    minWidth: 230,
    minHeight: 235,
    overflow: "hidden",
    borderRadius: 20,
  },
  moreThanOne: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(48, 48, 48, 0.60)",
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  footerIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  downloadContainer: {
    position: "absolute",
    bottom: -10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    right: 12,
  },
});
