import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import React from "react";
import { Text, View } from "react-native";
import { Pressable, StyleSheet } from "react-native";
import Emoji from "react-native-emoji";

interface EmojiWrapperProps {
  children: React.ReactNode;
  onReactedEmojiPress: () => void;
  reactions: string[];
  myReactionIndex: number;
  reactionCount: number;
  isAllFromUnSend: boolean;
  isOwnMessage: boolean;
}

const EmojiWrapper = ({
  children,
  onReactedEmojiPress,
  reactions,
  myReactionIndex,
  reactionCount,
  isAllFromUnSend,
  isOwnMessage,
}: EmojiWrapperProps) => {
  const { styles } = useStyles();
  const messageStyle =
    !isAllFromUnSend && isOwnMessage
      ? styles.ownUnSendMessageStyle
      : isOwnMessage
      ? styles.ownMessageStyle
      : styles.otherMessagesStyle;

  const emojisContainer = isOwnMessage
    ? styles.ownEmojisContainer
    : styles.otherEmojisContainer;

  return (
    <>
      <View style={styles.childrenContainer}>{children}</View>
      {reactions?.length !== 0 && (
        <Pressable
          disabled={myReactionIndex === -1}
          onPress={onReactedEmojiPress}
        >
          <View style={emojisContainer}>
            {reactions.map((name) => {
              return (
                <View style={messageStyle}>
                  <Emoji name={name} />
                </View>
              );
            })}
            {reactionCount >= 2 && (
              <View style={messageStyle}>
                <Text allowFontScaling={false} style={[styles.text]}>
                  +{reactionCount}
                </Text>
              </View>
            )}
          </View>
        </Pressable>
      )}
    </>
  );
};

export default EmojiWrapper;

const useStyles = useStylesWithTheme((theme) => ({
  childrenContainer: {
    marginLeft: "auto",
  },
  ownEmojisContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: -10,
  },
  otherEmojisContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: -10,
  },
  text: {
    color: theme.colors.grey02,
    textAlign: "center",
  },
  ownMessageStyle: {
    backgroundColor: theme.colors.purple,
    borderRadius: 30,
    padding: 2,
    marginLeft: -11,
  },
  ownUnSendMessageStyle: {
    backgroundColor: theme.colors.green01,
    borderRadius: 30,
    padding: 2,
    marginLeft: -11,
  },
  otherMessagesStyle: {
    backgroundColor: theme.colors.dark04,
    borderRadius: 30,
    padding: 2,
    marginLeft: -11,
  },
}));
