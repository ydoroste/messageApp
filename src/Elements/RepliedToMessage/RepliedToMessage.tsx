import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import * as React from "react";
import { View, Pressable } from "react-native";

interface RepliedToMessageProps {
  children: React.ReactNode;
  isOwnMessage: boolean;
  isVisible: boolean;
  onNavigateToRepliedMessage: () => void;
}

const RepliedToMessage = ({
  children,
  isOwnMessage,
  isVisible,
  onNavigateToRepliedMessage,
}: RepliedToMessageProps) => {
  const { styles } = useStyles();
  return (
    <Pressable onPress={onNavigateToRepliedMessage}>
      {isVisible && (
        <View
          style={isOwnMessage ? styles.rightContainer : styles.leftContainer}
        >
          <View
            style={
              isOwnMessage
                ? styles.rightChildrenContainer
                : styles.leftChildrenContainer
            }
          >
            {React.cloneElement(children, { onNavigateToRepliedMessage })}
          </View>
          <View style={isOwnMessage ? styles.rightLine : styles.leftLine} />
        </View>
      )}
    </Pressable>
  );
};

export default RepliedToMessage;

const useStyles = useStylesWithTheme((theme) => ({
  rightContainer: {
    marginLeft: "auto",
    marginRight: 50,
  },
  leftContainer: {
    marginLeft: 50,
    marginRight: "auto",
  },
  rightChildrenContainer: {
    width: "100%",
    marginLeft: 4,
  },
  leftChildrenContainer: {
    width: "100%",
    marginRight: 4,
  },
  rightLine: {
    height: 50,
    marginTop: -20,
    marginBottom: -20,
    borderLeftWidth: 1,
    borderTopLeftRadius: 7,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderColor: theme.colors.grey01,
  },
  leftLine: {
    height: 50,
    marginTop: -20,
    marginBottom: -30,
    borderRightWidth: 1,
    borderTopRightRadius: 7,
    borderBottomWidth: 1,
    borderBottomRightRadius: 10,
    borderColor: theme.colors.grey01,
  },
}));
