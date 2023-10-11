import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import React from "react";

import IconButton from "@followBack/GenericElements/IconButton";
import { Pressable, View } from "react-native";

interface VideoPreviewProps {
  index: number;
  onRemovePress: (index: number) => void;
}

const VideoPreview = ({ index, onRemovePress }: VideoPreviewProps) => {
  const { styles } = useStyles();

  return (
    <View>
      <View style={styles.image} />
      <View style={styles.playContainer}>
        <IconButton name="play" width={22} height={22} color={"black"} />
      </View>

      <Pressable
        style={styles.closeContainer}
        onPress={() => onRemovePress(index)}
      >
        <IconButton
          name="closebold"
          width={15}
          height={15}
          color={styles.close.color}
        />
      </Pressable>
    </View>
  );
};

export default React.memo(VideoPreview);

const useStyles = useStylesWithTheme((theme) => ({
  closeContainer: {
    position: "absolute",
    top: 2,
    right: 5,
  },
  close: {
    color: theme.colors.white,
  },

  image: {
    width: 90,
    height: 90,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },

  playContainer: {
    position: "absolute",
  },
}));
