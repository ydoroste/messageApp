import IconButton from "@followBack/GenericElements/IconButton";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
import React, { useCallback } from "react";
import { Pressable, Text } from "react-native";

import { iconsType } from "@followBack/GenericElements/IconButton/types";

interface MenuItem {
  onPress: () => void;
  closeModal: () => void;
  text: string;
  iconName: iconsType;
  isLastIndex?: boolean;
}

const MenuItem: React.FC<MenuItem> = ({
  text,
  onPress,
  closeModal,
  iconName,
  isLastIndex,
}) => {
  const handleOnPress = useCallback(() => {
    onPress();
    closeModal();
  }, [onPress, closeModal]);

  const { styles } = useStyles();

  const { colors } = useTheme();

  return (
    <Pressable
      onPress={handleOnPress}
      style={[
        styles.body,
        ...(isLastIndex ? [{ borderBottomWidth: 0 }] : [{}]),
      ]}
    >
      <Text allowFontScaling={false} style={styles.text}>
        {text}
      </Text>
      <IconButton
        onPress={handleOnPress}
        disabled
        name={iconName}
        width={16}
        height={16}
        color={colors.white}
      />
    </Pressable>
  );
};

export default React.memo(MenuItem);

const useStyles = useStylesWithTheme((theme) => ({
  body: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: theme.colors.grey01,
    borderBottomWidth: 1,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.small,
  },
}));
