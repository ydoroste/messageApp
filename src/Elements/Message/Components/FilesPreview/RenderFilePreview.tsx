import IconButton from "@followBack/GenericElements/IconButton";
import Typography from "@followBack/GenericElements/Typography";
import useTheme from "@followBack/Hooks/useTheme";
import * as React from "react";
import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { saveFile } from "../../Utils";

interface RenderFilePreviewProps {
  uri: string;
  title: string;
  size: number;
  notConfirmedNewMessage: boolean;
  isMarginTop: boolean;
  isViewOnly: boolean;
}

const RenderFilePreview = ({
  uri,
  title,
  size,
  notConfirmedNewMessage,
  isMarginTop,
  isViewOnly,
}: RenderFilePreviewProps) => {
  const [isDownloadStarted, setIsDownloadStarted] = React.useState(false);

  const onDownloadPress = React.useCallback(async () => {
    try {
      setIsDownloadStarted(true);
      await saveFile(uri, title);
    } catch (error) {
    } finally {
      setIsDownloadStarted(false);
    }
  }, []);
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", marginTop: isMarginTop ? 20 : 0 }}>
      <IconButton name="file" width={64} height={64} color={colors.grey01} />

      <View style={{ justifyContent: "space-around" }}>
        <View style={styles.titleContainer}>
          <Typography type="mediumRegularBody" color="chat">
            {title}
          </Typography>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Typography type="mediumRegularBody" color="secondary">
            {`eps ${size || 0}mb`}
          </Typography>
          <Pressable
            disabled={notConfirmedNewMessage || isViewOnly}
            style={styles.footerIconContainer}
            onPress={onDownloadPress}
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
        </View>
      </View>

      {(notConfirmedNewMessage || isDownloadStarted) && (
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
  );
};

export default React.memo(
  RenderFilePreview,
  (prevProps, nextProps) =>
    prevProps.uri === nextProps.uri ||
    prevProps.title === nextProps.title ||
    prevProps.size === nextProps.size ||
    prevProps.notConfirmedNewMessage === nextProps.notConfirmedNewMessage ||
    prevProps.isMarginTop === nextProps.isMarginTop ||
    prevProps.isViewOnly === nextProps.isViewOnly
);

const styles = StyleSheet.create({
  footerIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  titleContainer: {
    alignSelf: "center",
    maxWidth: 220,
    minWidth: 220,
  },
});
