import IconButton from "@followBack/GenericElements/IconButton";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import React from "react";
import { Pressable, View } from "react-native";

interface CloseWrapperProps {
  children: React.ReactNode;
  isCurrentMessageEditing: boolean;
  onCloseEdit: () => void;
}

const CloseWrapper = ({
  isCurrentMessageEditing,
  children,
  onCloseEdit,
}: CloseWrapperProps) => {
  const { styles } = useStyles();

  return (
    <>
      {children}
      {isCurrentMessageEditing && (
        <Pressable style={styles.closeContainer} onPress={onCloseEdit}>
          <IconButton
            onPress={onCloseEdit}
            disabled
            name={"close"}
            width={10}
            height={10}
            color={styles.close.color}
          />
        </Pressable>
      )}
    </>
  );
};

export default CloseWrapper;

const useStyles = useStylesWithTheme((theme) => ({
  closeContainer: {
    position: "absolute",
    left: -39,
    top: 0,
    borderWidth: 1,
    borderColor: theme.colors.grey02,
    borderRadius: 25,
  },
  close: {
    color: theme.colors.grey02,
  },
}));
