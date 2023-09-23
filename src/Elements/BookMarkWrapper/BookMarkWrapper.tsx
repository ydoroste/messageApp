import IconButton from "@followBack/GenericElements/IconButton";
import useTheme from "@followBack/Hooks/useTheme";
import React from "react";
import { View, StyleSheet } from "react-native";

interface BookMarkWrapperProps {
  isBookMarked: boolean;
  isOwnMessage: boolean;
  children: React.ReactNode;
  onUnBookMarkedPress: () => void;
}

const BookMarkWrapper = ({
  isBookMarked,
  isOwnMessage,
  children,
  onUnBookMarkedPress,
}: BookMarkWrapperProps) => {
  const { colors } = useTheme();
  return (
    <>
      {children}
      {isBookMarked && (
        <View
          style={
            isOwnMessage ? styles.rightIconContainer : styles.leftIconContainer
          }
        >
          <IconButton
            onPress={onUnBookMarkedPress}
            name={"bookmark"}
            width={16}
            height={16}
            color={colors.white}
          />
        </View>
      )}
    </>
  );
};

export default BookMarkWrapper;

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    borderRadius: 20,
  },
  rightIconContainer: {
    position: "absolute",
    top: -8,
    right: -10,
  },
  leftIconContainer: {
    position: "absolute",
    top: -8,
    left: -10,
  },
});
