import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import React from "react";
import { View } from "react-native";

interface BorderWrapperProps {
  children: React.ReactNode;
  isReplying: boolean;
}

const BorderWrapper = ({ isReplying, children }: BorderWrapperProps) => {
  const { styles } = useStyles();

  return (
    <>
      {isReplying ? <View style={styles.container}>{children}</View> : children}
    </>
  );
};

export default BorderWrapper;

const useStyles = useStylesWithTheme((theme) => ({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: "flex-end",
    borderColor: "white",
  },
}));
