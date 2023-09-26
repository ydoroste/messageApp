import Typography from "@followBack/GenericElements/Typography";
import React from "react";
import { StyleSheet, Pressable } from "react-native";

interface OriginalEmailProps {
  children: React.ReactNode;
  html?: string;
  isPromotional: boolean;
  onPressViewOriginalEmail: (html: string) => void;
}

const OriginalEmailWrapper = ({
  html,
  children,
  isPromotional,
  onPressViewOriginalEmail,
}: OriginalEmailProps) => {
  return (
    <>
      {children}
      {isPromotional && (
        <Pressable
          style={styles.promotionalContainer}
          onPress={() => onPressViewOriginalEmail(html as string)}
        >
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
