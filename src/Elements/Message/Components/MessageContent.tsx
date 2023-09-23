import Typography from "@followBack/GenericElements/Typography";
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

  const { text, to, from, cc, bcc } = item;
  const { userDetails } = useUserDetails();
  const isOwnMessage = !item?.from?.address
    ? true
    : userDetails.user_name === emailNameParcer(item?.from?.address);

  const sender = from ?? {
    name: userDetails.user_name,
    address: userDetails.email,
  };
  const toList = to ?? [];
  const ccList = cc ?? [];
  const bccList = bcc ?? [];

  const chatUsers = [...toList, ...ccList, ...bccList, sender];

  const others = excludeUser({
    users: chatUsers,
    userAddress: `${userDetails.user_name}@${MAIL_DOMAIN}`,
  });

  const isGroupChat = others.length > 1;
  const messageSender = sender;
  const userFirstName =
    messageSender?.name?.length ?? -1 > 0
      ? messageSender?.name?.split(" ")?.[0]
      : messageSender.address;

  const messageStyle =
    !isAllFromUnSend && isOwnMessage
      ? styles.ownUnSendMessageStyle
      : isOwnMessage
      ? styles.ownMessageStyle
      : styles.otherMessagesStyle;

  return (
    <View style={[styles.contentContainer, messageStyle, containerStyle]}>
      {text && (
        <Typography type="largeRegularBody" color={textColor}>
          {isGroupChat && !isOwnMessage && (
            <Typography type="largeBoldBody" color={textColor}>
              {userFirstName + " "}
            </Typography>
          )}
          {text}
        </Typography>
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
}));

export default React.memo(
  MessageContent,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
