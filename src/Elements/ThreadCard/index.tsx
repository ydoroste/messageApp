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
const ThreadCard: React.FC<IthreadCardProps> = ({ threadItem }) => {
  return (
    <View style={styles.container}>
      <View style={{ marginRight: 8 }}>
        <Avatar imageURL={null} />
      </View>

      <View style={styles.content}>
        <Typography
          type="largeRegularTitle"
          color="secondary"
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {threadItem.lastMessage.subject}
        </Typography>

        <Typography
          type="mediumRegularBody"
          color="secondary"
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {threadItem.lastMessage.content}
        </Typography>
      </View>

      <View style={{ position: "absolute", right: 0, bottom: 7 }}>
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

  content: { flex: 0.7 },
});
