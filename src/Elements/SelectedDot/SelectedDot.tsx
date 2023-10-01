import IconButton from "@followBack/GenericElements/IconButton";
import useTheme from "@followBack/Hooks/useTheme";
import * as React from "react";
import { View, StyleSheet } from "react-native";

interface SelectedDotProps {
  isSelected: boolean;
  onSelectPress: (messageId: string) => void;
  messageId: string;
}

const SelectedDot = ({
  isSelected,
  onSelectPress,
  messageId,
}: SelectedDotProps) => {
  const onPress = () => {
    onSelectPress(messageId);
  };

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <IconButton
        onPress={onPress}
        name={isSelected ? "selectmore" : "unselected"}
        width={24}
        height={24}
        color={colors.grey02}
      />
    </View>
  );
};

export default SelectedDot;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 100000000,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    left: 0,
  },
});
