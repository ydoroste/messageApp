import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform, Pressable, View } from "react-native";
import Typography from "@followBack/GenericElements/Typography";
import IconButton from "@followBack/GenericElements/IconButton";
import useTheme from "@followBack/Hooks/useTheme";
interface SelectAllWrapperProps {
  children: React.ReactNode;
  isSelectAllActivated: boolean;
  onSelectAllCancelPress: () => void;
  onSelectAllPress: () => void;
  onSelectAllBookMarkPress: () => void;
  onSelectAllDeletePress: () => void;
}

const SelectAllWrapper = ({
  isSelectAllActivated,
  children,
  onSelectAllCancelPress,
  onSelectAllPress,
  onSelectAllBookMarkPress,
  onSelectAllDeletePress,
}: SelectAllWrapperProps) => {
  const { styles } = useStyles();
  const { colors } = useTheme();

  return (
    <>
      {isSelectAllActivated && (
        <>
          <BlurView
            style={styles.headerContainer}
            intensity={Platform.OS === "ios" ? 30 : 120}
            tint="dark"
          >
            <Pressable onPress={onSelectAllCancelPress}>
              <Typography type="mediumRegularBody" color="error">
                cancel
              </Typography>
            </Pressable>
            <Pressable onPress={onSelectAllPress}>
              <View style={styles.rightHeaderContainer}>
                <IconButton
                  onPress={onSelectAllPress}
                  name="selectmore"
                  width={16}
                  height={16}
                  color={colors.white}
                />
                <Typography type="mediumRegularBody" color="primary">
                  select all
                </Typography>
              </View>
            </Pressable>
          </BlurView>
          <View style={styles.bottomContainer}>
            <Pressable onPress={() => {}} style={styles.bottomItemContainer}>
              <IconButton
                onPress={() => {}}
                name="forward"
                width={16}
                height={16}
                color={colors.grey02}
              />

              <Typography type="mediumRegularBody" color="secondary">
                forward
              </Typography>
            </Pressable>
            <Pressable
              onPress={onSelectAllBookMarkPress}
              style={styles.bottomItemContainer}
            >
              <IconButton
                onPress={onSelectAllBookMarkPress}
                name="bookmark"
                width={16}
                height={16}
                color={colors.grey02}
              />
              <Typography type="mediumRegularBody" color="secondary">
                bookmark
              </Typography>
            </Pressable>
            <Pressable
              onPress={onSelectAllDeletePress}
              style={styles.bottomItemContainer}
            >
              <IconButton
                onPress={onSelectAllDeletePress}
                name="delete"
                width={16}
                height={16}
                color={colors.grey02}
              />

              <Typography type="mediumRegularBody" color="secondary">
                delete
              </Typography>
            </Pressable>
          </View>
        </>
      )}

      {children}
    </>
  );
};

export default React.memo(SelectAllWrapper);

const useStyles = useStylesWithTheme((theme) => ({
  headerContainer: {
    height: 80,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100000000,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  rightHeaderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: "flex-end",
    borderColor: "white",
  },
  bottomContainer: {
    height: 56,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 1000000,
    backgroundColor: "black",
  },
  bottomItemContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
}));
