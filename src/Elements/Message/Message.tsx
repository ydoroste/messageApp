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
  // const { userDetails } = useUserDetails();
  const userDetails = {
    "id": "64aa89d22d70c06d0f2d04b4",
    "first_name": "First",
    "last_name": "Last",
    "gender": "male",
    "birth_date": "1985-07-09T10:19:31.000Z",
    "user_name": "testsign",
    "email": "testsign@iinboxx.com",
    "phone_number": "+447859730937",
    "wildduck_user_id": null
  };
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
  const userFirstName = messageSender.name.length > 0 ?
      messageSender.name.split(' ')?.[0] : messageSender.address;
  const messageSenderLabel =
    messageSender.name.length > 0 ? messageSender.name : messageSender.address;

  const messageStyle = isOwnMessage ? styles.ownMessageStyle : styles.otherMessagesStyle;

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
          style={[styles.contentContainer, messageStyle]}
        >
          <Typography type="largeRegularBody" color="chat">
            {isGroupChat && !isOwnMessage && (
                <Typography type="largeBoldBody" color="chat">
                  {userFirstName + " "}
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
  activityIndicatorContainer: {
   position: "absolute",
   left: -20,
   top: "30%",
  },
  ownMessageStyle: {
   backgroundColor: theme.colors.dark02
  },
  otherMessagesStyle: {
    backgroundColor: theme.colors.dark04,
    borderColor: theme.colors.dark02,
    borderWidth: 1
  }
}));

export default React.memo(
  Message,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
