import Typography from "@followBack/GenericElements/Typography";
import React, { useCallback, useState } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, Pressable, Modal, ScrollView } from "react-native";
import IconButton from "@followBack/GenericElements/IconButton";
import { useWindowDimensions } from "react-native";

interface OriginalEmailProps {
  children: React.ReactNode;
  html?: string;
  isPromotional: boolean;
}

const OriginalEmailWrapper = ({
  html,
  children,
  isPromotional,
}: OriginalEmailProps) => {
  const { width } = useWindowDimensions();
  const [isOriginalEmailViewPressed, setIsOriginalEmailViewPressed] =
    useState(false);
  const toggleModal = useCallback(() => {
    setIsOriginalEmailViewPressed((preState) => !preState);
  }, []);
  return (
    <>
      {children}
      {isOriginalEmailViewPressed && (
        <Modal>
          <Pressable style={styles.iconContainer} onPress={toggleModal}>
            <IconButton
              onPress={toggleModal}
              disabled
              name={"close"}
              width={20}
              height={20}
              color={"black"}
            />
          </Pressable>
          <WebView originWhitelist={["*"]} source={{ html: html as string }} />
        </Modal>
      )}
      {isPromotional && false && (
        <Pressable style={styles.promotionalContainer} onPress={toggleModal}>
          <Typography type="mediumRegularBody" color="blue">
            {`view original email >`}
          </Typography>
        </Pressable>
      )}
    </>
  );
};

export default OriginalEmailWrapper;

const styles = StyleSheet.create({
  promotionalContainer: {
    marginTop: 8,
    marginLeft: 15,
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 10000,
  },
});
