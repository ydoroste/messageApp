import { IThreadMessage } from "@followBack/Apis/ThreadMessages/types";
import Typography from "@followBack/GenericElements/Typography";
import useMessageSenderDetails from "@followBack/Hooks/useMessageSenderDetails";
import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import generateColor from "../Avatar/utils";

interface AboveNameProps {
  children: React.ReactNode;
  isVisible: boolean;
  userFirstName: string;
}

const AboveNameWrapper = ({
  isVisible,
  children,
  userFirstName,
}: AboveNameProps) => {
  return (
    <>
      {isVisible && (
        <View style={styles.Container}>
          <View style={[styles.content, { backgroundColor: generateColor() }]}>
            <Typography type="smallRegularBody" color="chat" textAlign="center">
              {userFirstName.at(0)?.toUpperCase()}
            </Typography>
          </View>
          <Typography type="mediumRegularBody" color="secondary">
            {userFirstName}
          </Typography>
        </View>
      )}
      {children}
    </>
  );
};

export default AboveNameWrapper;

const styles = StyleSheet.create({
  Container: {
    marginBottom: 5.5,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    height: 20,
    width: 20,
    paddingTop: 4,
    marginRight: 5,
  },
});
