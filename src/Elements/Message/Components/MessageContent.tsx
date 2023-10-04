import React from "react";
import { View, Image, ImageStyle, StyleProp, ViewStyle } from "react-native";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { excludeUser } from "@followBack/Utils/messages";
import { emailNameParcer } from "@followBack/Utils/email";
import { IThreadMessage } from "@followBack/Apis/ThreadMessages/types";
import { ScrollView } from "react-native-gesture-handler";
import { MAIL_DOMAIN } from "@followBack/Apis/constants";
import { colorTypes } from "@followBack/GenericElements/Typography/types";
import RenderHTML, { MixedStyleDeclaration } from "react-native-render-html";
import { colorsToTheme } from "@followBack/GenericElements/Typography/utils";
import useTheme from "@followBack/Hooks/useTheme";
import useMessageSenderDetails from "@followBack/Hooks/useMessageSenderDetails";

const MessageContent = ({
  item,
  containerStyle,
  textColor = "chat",
  isAllFromUnSend,
}: {
  item: IThreadMessage;
  containerStyle?: StyleProp<ViewStyle>;
  textColor?: colorTypes;
  isAllFromUnSend: boolean;
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
        />
      )}
      {item.attachments && item.attachments.length > 0 && (
        <ScrollView horizontal style={{ maxHeight: 100 }}>
          {item.attachments.map((attachment) => {
            return (
              <Image
                key={attachment.id}
                style={styles.imageStyle as StyleProp<ImageStyle>}
                source={{ uri: attachment.url, cache: "force-cache" }}
                resizeMethod="scale"
                resizeMode="cover"
              />
            );
          })}
        </ScrollView>
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
    width: 80,
    height: 80,
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
