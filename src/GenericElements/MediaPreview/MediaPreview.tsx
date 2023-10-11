import React, { useRef } from "react";

import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import IconButton from "../IconButton";
import FastImage from "react-native-fast-image";
import { getFileDetails } from "@followBack/Utils/stringUtils";

const { height, width } = Dimensions.get("window");

interface MediaPreviewProps {
  mediaItems: any[];
  onClose: () => void;
  openedImageIndex: number;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({
  mediaItems,
  onClose,
  openedImageIndex,
}) => {
  const ref = useRef(null);

  return (
    <Modal>
      <Pressable style={styles.closeButton} onPress={onClose}>
        <IconButton name="closebold" width={15} height={15} />
      </Pressable>
      <FlatList
        renderItem={({ item, index }) => {
          const { isVideo } = getFileDetails(item.title ?? item.fileName); //TODO:

          return isVideo ? (
            <Video
              style={styles.media}
              source={{
                uri: item.url,
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
            />
          ) : (
            <FastImage
              key={item.id}
              style={styles.media}
              source={{
                uri: item.url,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          );
        }}
        contentContainerStyle={styles.contentContainerStyle}
        pagingEnabled
        horizontal
        ref={ref}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        initialScrollIndex={openedImageIndex}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={mediaItems}
      />
    </Modal>
  );
};

export default MediaPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  media: {
    width: width,
    height: height,
  },
  closeButton: {
    position: "absolute",
    top: 70,
    right: 20,
    zIndex: 1000000,
  },
  contentContainerStyle: {
    alignItems: "center",
    backgroundColor: "black",
  },
});
