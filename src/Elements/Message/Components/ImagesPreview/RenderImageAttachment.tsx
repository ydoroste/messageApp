import { ICreateAttachmentApiResponse } from "@followBack/Apis/GetAttachmentUploadLink/types";
import CachingLayer from "@followBack/Classes/CachingLayer";
import IconButton from "@followBack/GenericElements/IconButton";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
import { getFileDetails } from "@followBack/Utils/stringUtils";
import { Video, ResizeMode } from "expo-av";
import * as React from "react";
import { ImageStyle, Pressable, StyleProp } from "react-native";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import FastImage from "react-native-fast-image";

type RenderImageAttachmentProps = {
  index: number;
  notConfirmedNewMessage: boolean;
  onImagePreviewPress?: (index: number) => void;
} & Pick<ICreateAttachmentApiResponse, "url" | "title" | "id">;

const RenderImageAttachment = ({
  notConfirmedNewMessage,
  index,
  onImagePreviewPress,
  url,
  title,
  id,
}: RenderImageAttachmentProps) => {
  const { styles } = useStyles();
  const { colors } = useTheme();

  const isVideo = getFileDetails(title).isVideo;

  return (
    <Pressable onPress={() => onImagePreviewPress(index)}>
      {isVideo ? (
        <>
          <Video
            style={styles.imageStyle}
            source={{
              uri: CachingLayer.media[id] ?? url,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
          <View style={styles.playContainer}>
            <IconButton name="play" width={22} height={22} color={"black"} />
          </View>
        </>
      ) : (
        <FastImage
          key={id}
          style={styles.imageStyle as StyleProp<ImageStyle>}
          source={{
            uri: CachingLayer.media[id] ?? url,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          resizeMethod="scale"
          removeClippedSubviews
        />
      )}

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
  );
};

export default RenderImageAttachment;

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
    borderRadius: 15,
  },
  playContainer: {
    position: "absolute",
  },
}));
