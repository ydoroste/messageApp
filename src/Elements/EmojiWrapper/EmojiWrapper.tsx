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
}

const EmojiWrapper = ({
  children,
  onReactedEmojiPress,
  reactions,
  myReactionIndex,
}: EmojiWrapperProps) => {
  const reactionCount = reactions.length;

  const { styles } = useStyles();
  return (
    <>
      <View style={styles.childrenContainer}>{children}</View>
      {reactions?.length !== 0 && (
        <Pressable
          disabled={myReactionIndex === -1}
          onPress={onReactedEmojiPress}
        >
          <View style={styles.emojisContainer}>
            {reactions.map((name) => (
              <Emoji name={name} />
            ))}
            {reactionCount >= 2 && (
              <Text style={styles.text}>{reactionCount}</Text>
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
  emojisContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  text: {
    color: theme.colors.grey01,
    marginLeft: 5,
  },
}));
