import Typography from "@followBack/GenericElements/Typography";
import React from "react";
import { View, StyleSheet } from "react-native";
import { formatMessageDate } from "@followBack/Utils/date";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { excludeUser } from "@followBack/Utils/messages";

const Message = ({ item }) => {
  const { styles } = useStyles();
  const { text, to, from, messageDateTime } = item;
  const { userDetails } = useUserDetails();

  const chatUsers = [...to, from];

  const others = excludeUser({
    users: chatUsers,
    userAddress: userDetails.email,
  });

  const isGroupChat = others.length > 1;
  const messageSender = from;
  const messageSenderLabel =
    messageSender.name.length > 0 ? messageSender.name : messageSender.address;

  const contentContainerStyles = isGroupChat
    ? [styles.contentContainer]
    : [styles.contentContainer, styles.groupContentContainer];

  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Typography type="smallRegularBody" color="secondary">
          {formatMessageDate(new Date(messageDateTime)).toLocaleLowerCase()}
        </Typography>
      </View>

      <View style={contentContainerStyles}>
        {isGroupChat && (
          <Typography type="largeBoldBody" color="chat">
            {messageSenderLabel + " "}
          </Typography>
        )}
        <Typography type="largeRegularBody" color="chat">
          {text}
        </Typography>
      </View>
    </View>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  container: {},
  date: {
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
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
}));

export default Message;
