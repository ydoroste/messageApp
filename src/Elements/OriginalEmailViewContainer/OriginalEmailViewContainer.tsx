import React, { useCallback } from "react";
import { WebView } from "react-native-webview";
import { Linking, Pressable, StyleSheet } from "react-native";
import { View } from "react-native";
import Typography from "@followBack/GenericElements/Typography";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";

interface OriginalEmailViewContainerProps {
  children: React.ReactNode;
  html: string;
  onPressViewSummarizedEmail: () => void;
  Header: JSX.Element;
}

const OriginalEmailViewContainerWrapper = ({
  html,
  children,
  onPressViewSummarizedEmail,
  Header,
}: OriginalEmailViewContainerProps) => {
  const { styles } = useStyles();

  const handleShouldStartLoadWithRequest = useCallback((event: any) => {
    const url = event.url;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      Linking.openURL(url);
      return false;
    }
    return true;
  }, []);
  return (
    <>
      {children}
      {html && (
        <View style={styles.container}>
          {Header}
          <WebView
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
            originWhitelist={["*"]}
            source={{ html: html as string }}
          />
          <View style={styles.blackContainer} />
          <View style={styles.bottomContainer}>
            <Pressable onPress={onPressViewSummarizedEmail}>
              <Typography
                type="smallRegularBody"
                textDecoration={"underline"}
                color="black"
              >
                {"view summarized email"}
              </Typography>
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default React.memo(OriginalEmailViewContainerWrapper);

const useStyles = useStylesWithTheme((theme) => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100000000000000,
    paddingBottom: 84,
  },
  bottomContainer: {
    height: 24,
    backgroundColor: theme.colors.blue,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingVertical: 4,
    paddingHorizontal: 32,
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
  },
  blackContainer: {
    height: 60,
    zIndex: 10000000000000,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.black,
    position: "absolute",
    bottom: 0,
  },
}));
