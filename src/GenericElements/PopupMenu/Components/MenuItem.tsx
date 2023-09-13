import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface MenuItem {
  onPress: () => void;
  closeModal: () => void;
  text: string;
}

const MenuItem: React.FC<MenuItem> = ({ text, onPress, closeModal }) => {
  const handleOnPress = useCallback(() => {
    onPress();
    closeModal();
  }, []);

  const { styles } = useStyles();

  return (
    <Pressable onPress={handleOnPress} style={styles.body}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default React.memo(MenuItem);

const useStyles = useStylesWithTheme((theme) => ({
  body: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.colors.white,
  },
}));
