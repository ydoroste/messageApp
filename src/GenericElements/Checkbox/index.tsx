import React, { useState, useRef } from "react";
import Checkbox from "expo-checkbox";
import { Pressable, View } from "react-native";
import Typography from "@followBack/GenericElements/Typography";
import { ICheckboxPorps } from "@followBack/GenericElements/CheckBox/types";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
const EmlsCheckbox: React.FC<ICheckboxPorps> = ({
  isChecked,
  text,
  onValueChange,
  disabled,
}) => {
  const { styles } = useStyles();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Checkbox
        disabled={disabled}
        style={styles.checkbox}
        value={isChecked}
        onValueChange={onValueChange}
        color={colors.grey02}
      />

      <Pressable onPress={() => onValueChange(!isChecked)}>
        <Typography type="mediumRegularTitle" color="secondary">
          {text}
        </Typography>
      </Pressable>
    </View>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  container: {
    flexDirection: "row",
  },

  checkbox: {
    marginRight: 15,
    width: 16,
    height: 16,
    borderRadius: 2,
    opacity: .8,
    backgroundColor: "red",

    marginTop: 5,
  },
}));

export default EmlsCheckbox;
