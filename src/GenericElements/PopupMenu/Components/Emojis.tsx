import React, { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Emoji from "react-native-emoji";

interface Emojis {
  emojis: string[];
  onEmojiPress: (emoji: string) => void;
  closeModal: () => void;
}

const Emojis: React.FC<Emojis> = ({ emojis, onEmojiPress, closeModal }) => {
  const handleOnPress = useCallback((emoji: string) => {
    onEmojiPress(emoji);
    closeModal();
  }, []);

  return (
    <View style={styles.emojisContainer}>
      {emojis.map((emoji) => (
        <Pressable key={String(emoji)} onPress={() => handleOnPress(emoji)}>
          <Emoji style={styles.emoji} name={emoji} />
        </Pressable>
      ))}
    </View>
  );
};

export default React.memo(Emojis);

const styles = StyleSheet.create({
  emojisContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emoji: {
    fontSize: 30,
  },
});
