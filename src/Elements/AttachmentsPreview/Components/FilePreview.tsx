import IconButton from "@followBack/GenericElements/IconButton";
import Typography from "@followBack/GenericElements/Typography";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { makeid } from "@followBack/Utils/messages";
import * as React from "react";
import { View } from "react-native";
import { Pressable } from "react-native";
import FastImage from "react-native-fast-image";

interface FilePreviewProps {
  index: number;
  onRemovePress: (index: number) => void;
  fileExt: string;
}

const FilePreview = ({ index, onRemovePress, fileExt }: FilePreviewProps) => {
  const { styles } = useStyles();

  return (
    <View>
      <FastImage
        key={makeid(index)}
        source={require("./file.png")}
        style={styles.image}
        resizeMethod="resize"
        resizeMode="contain"
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

      <Typography type="mediumRegularBody" color="chat" textAlign="center">
        {fileExt}
      </Typography>
    </View>
  );
};

export default React.memo(
  FilePreview,
  (prev, next) => prev.fileExt === next.fileExt || prev.index === next.index
);

const useStyles = useStylesWithTheme((theme) => ({
  closeContainer: {
    position: "absolute",
    top: -3,
    right: 5,
  },
  close: {
    color: theme.colors.white,
  },
  image: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 10,
  },
}));
