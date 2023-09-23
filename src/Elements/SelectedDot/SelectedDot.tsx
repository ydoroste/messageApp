import IconButton from "@followBack/GenericElements/IconButton";
import useTheme from "@followBack/Hooks/useTheme";
import * as React from "react";
import { View, StyleSheet } from "react-native";

interface SelectedDotProps {
  isSelected: boolean;
  onSelectPress: (index: number) => void;
  index: number;
}

const SelectedDot = ({
  isSelected,
  onSelectPress,
  index,
}: SelectedDotProps) => {
  const onPress = () => {
    onSelectPress(index);
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
