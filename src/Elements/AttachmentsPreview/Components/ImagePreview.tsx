import IconButton from "@followBack/GenericElements/IconButton";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { makeid } from "@followBack/Utils/messages";
import * as React from "react";
import { View } from "react-native";
import { Pressable } from "react-native";
import { Attachment } from "../AttachmentsPreview";
import FastImage from "react-native-fast-image";

interface ImagePreviewProps {
  attachment: Attachment;
  index: number;
  onRemovePress: (index: number) => void;
}

const ImagePreview = ({
  attachment,
  index,
  onRemovePress,
}: ImagePreviewProps) => {
  const { styles } = useStyles();
  return (
    <View>
      <FastImage
        key={makeid(index)}
        source={{ uri: attachment.url }}
        style={styles.image}
      />
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

export default React.memo(ImagePreview);

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
  },
}));
