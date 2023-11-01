import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
import { BlurView } from "expo-blur";
import React, { ReactNode, useState } from "react";
import { Platform, StyleSheet, View, ViewStyle } from "react-native";
import IconButton from "../IconButton";

interface Props {
  style?: ViewStyle;
  onPress: (index: number) => void;
  selectedIndex: number;
}

const SideOptions = ({ style, onPress, selectedIndex }: Props) => {
  const { colors } = useTheme();
  const { styles } = useStyles();

  const _onPress = (index: number) => {
    onPress(index);
  };

  const icons = [
    { name: "addwithcircle", width: 30, height: 30, color: colors.grey01 },
    { name: "message", width: 30, height: 29, color: colors.grey01 },
    { name: "bookmark", width: 30, height: 31, color: colors.grey01 },
    { name: "about", width: 30, height: 31, color: colors.grey01 },
    { name: "trash", width: 30, height: 36, color: colors.grey01 },
    { name: "settings", width: 30, height: 31, color: colors.grey01 },
  ];
  return (
    <View style={[styles.sideOptionsContainer, style]}>
      <BlurView
        intensity={Platform.OS === "ios" ? 30 : 120}
        style={styles.blurView}
        tint="dark"
      >
        {icons.map((icon, index) => {
          return (
            <IconButton
              name={icon.name}
              width={icon.width}
              height={icon.height}
              color={selectedIndex === index ? colors.white : icon.color}
              onPress={() => _onPress(index)}
            />
          );
        })}
      </BlurView>
    </View>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  sideOptionsContainer: {
    width: 56,
    height: 340,
    position: "absolute",
    borderRadius: 29,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.white01,
    bottom: 33,
    right: 10,
  },
  blurView: {
    flexGrow: 1,
    paddingHorizontal: 13,
    paddingVertical: 8,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default SideOptions;
