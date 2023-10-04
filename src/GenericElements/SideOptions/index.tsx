import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
import { BlurView } from "expo-blur";
import React, { ReactNode } from "react";
import { Platform, StyleSheet, View, ViewStyle } from "react-native";
import IconButton from "../IconButton";

interface Props {
  style?: ViewStyle;
}

const SideOptions = ({ style }: Props) => {
  const { colors } = useTheme();
  const { styles } = useStyles();
  return (
    <View style={[styles.sideOptionsContainer, style]}>
      <BlurView
        intensity={Platform.OS === "ios" ? 30 : 120}
        style={styles.blurView}
        tint="dark"
      >
        <IconButton
          disabled
          name={"addwithcircle"}
          width={30}
          height={30}
          color={colors.grey01}
        />
        <IconButton
          disabled
          name={"message"}
          width={30}
          height={29}
          color={colors.white}
        />
        <IconButton
          disabled
          name={"bookmark"}
          width={30}
          height={31}
          color={colors.grey01}
        />
        <IconButton
          disabled
          name={"about"}
          width={30}
          height={31}
          color={colors.grey01}
        />
        <IconButton
          disabled
          name={"trash"}
          width={30}
          height={36}
          color={colors.grey01}
        />
        <IconButton
          disabled
          name={"settings"}
          width={30}
          height={31}
          color={colors.grey01}
        />
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
