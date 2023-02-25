import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  View,
  Text,
} from "react-native";
import React, { useState } from "react";
import { getTranslatedText } from "@followBack/Localization";
import { IthreadCardProps } from "@followBack/Elements/ThreadCard/types";
import Typography from "@followBack/GenericElements/Typography";
import Avatar from "@followBack/Elements/Avatar";
import { formatMessageDate } from "@followBack/Utils/date";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { excludeUser } from "@followBack/Utils/messages";
const ThreadCard: React.FC<IthreadCardProps> = ({ threadItem }) => {
  const { userDetails } = useUserDetails();

  const others = excludeUser({
    users: [threadItem.lastMessage.from, ...threadItem.lastMessage.to],
    userAddress: userDetails.email,
  });
  return (
    <View style={styles.container}>
      <View style={{ ...styles.avatar }}>
        <Avatar users={others} />
      </View>

      <View style={styles.content}>
        <View style={{ marginBottom: 6 }}>
          <Typography
            type="largeRegularTitle"
            color="secondary"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {threadItem.lastMessage.subject}
          </Typography>
        </View>

        <Typography
          type="mediumRegularBody"
          color="secondary"
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {threadItem.lastMessage.text}
        </Typography>
      </View>

      <View style={styles.date}>
        <Typography type="smallRegularBody" color="secondary">
          {formatMessageDate(threadItem.lastMessage.date)}
        </Typography>
      </View>
    </View>
  );
};
export default ThreadCard;

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 7,
    marginBottom: 20,
    position: "relative",
  },

  avatar: { flex: 0.18 },
  content: { flex: 0.7 },
  date: {
    position: "absolute",
    right: 0,
    bottom: 7,
  },
});
