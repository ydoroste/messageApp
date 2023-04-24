import Typography from "@followBack/GenericElements/Typography";
import React, { useRef, useState } from "react";
import { View, StyleSheet, Pressable, ViewStyle } from "react-native";
import { formatMessageDate } from "@followBack/Utils/date";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { excludeUser } from "@followBack/Utils/messages";
import { emailNameParcer } from "@followBack/Utils/email";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import useTheme from "@followBack/Hooks/useTheme";
import {
  UIActivityIndicator,
} from 'react-native-indicators';

const Message = ({ item }) => {
  const { styles } = useStyles();
  const { text, to, from, cc, bcc, messageDateTime, notConfirmedNewMessage } = item;
  const { userDetails } = useUserDetails();
  const { colors } = useTheme();
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
  const itemPosition = useRef<number>(0);
  const [showDate, setShowDate] = useState(false);

  const others = excludeUser({
    users: chatUsers,
    userAddress: userDetails.email,
  });

  const isGroupChat = others.length > 1;
  const messageSender = sender;
  const messageSenderLabel =
    messageSender.name.length > 0 ? messageSender.name : messageSender.address;

  const contentContainerStyles = isGroupChat
    ? [styles.contentContainer]
    : [styles.contentContainer, styles.groupContentContainer];
  return (
    <>
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          itemPosition.current = height / 2 - 4;
        }}
        style={{
          ...styles.container,
          ...(isOwnMessage ? { marginLeft: "auto" } : { marginRight: "auto" }),
          // opacity: notConfirmedNewMessage ? 0.6 : 1
        }}
      >
        <Pressable
          onPress={() => {
            setShowDate((prevState) => !prevState);
          }}
          style={contentContainerStyles}
        >
          <Typography type="largeRegularBody" color="chat">
            {isGroupChat && (
                <Typography type="largeBoldBody" color="chat">
                  {messageSenderLabel + ": "}
                </Typography>
            )}

            {text}
          </Typography>
        </Pressable>
        {
        // notConfirmedNewMessage 
        false
        && <View style={styles.activityIndicatorContainer}>
          <UIActivityIndicator color={colors.grey02} size={15} />
        </View>}
      </View>

      {showDate && (
        <View
          style={[
            styles.date,
            {
              top: itemPosition.current,
              left: isOwnMessage ? 0 : undefined,
              right: !isOwnMessage ? 0 : undefined,
            },
          ]}
        >
          <Typography type="smallRegularBody" color="secondary">
            {formatMessageDate(messageDateTime)}
          </Typography>
        </View>
      )}
    </>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  container: {
    position: "relative",
  },
  date: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    position: "absolute",
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "80%",
    borderRadius: 20,
    backgroundColor: theme.colors.dark02,
  },
  groupContentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityIndicatorContainer: {
   position: "absolute",
   left: -20,
   top: "30%",
  },
}));

export default React.memo(
  Message,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
