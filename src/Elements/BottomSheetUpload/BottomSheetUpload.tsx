import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import useTheme from "@followBack/Hooks/useTheme";
import { MenuOption } from "@followBack/GenericElements/PopupMenu/Menu";
import MenuItem from "@followBack/GenericElements/PopupMenu/Components/MenuItem";
import { View } from "react-native";
import { iconsType } from "@followBack/GenericElements/IconButton/types";
import { IThreadMessage } from "@followBack/Apis/ThreadMessages/types";
interface BottomSheetUploadProps {
  children: React.ReactNode;
  isBottomSheetActivated: boolean;
  bottomSheetOptions: {
    text: string;
    onPress: () => void;
    iconName: string;
  }[];
  toggleBottomSheet: () => void;
}

const BottomSheetUpload = ({
  isBottomSheetActivated,
  children,
  bottomSheetOptions,
  toggleBottomSheet,
}: BottomSheetUploadProps) => {
  const { styles } = useStyles();

  return (
    <>
      {children}
      {isBottomSheetActivated && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleBottomSheet}
          style={styles.modalWrapper}
        >
          {isBottomSheetActivated && (
            <BlurView
              style={styles.bottomContainer}
              intensity={Platform.OS === "ios" ? 30 : 120}
              tint="dark"
            >
              <View style={styles.bottomItemContainer}>
                {bottomSheetOptions.map(
                  (menuOption: MenuOption, menuIndex: number) => {
                    return (
                      <MenuItem
                        closeModal={() => {}}
                        text={menuOption.text}
                        onPress={() =>
                          menuOption.onPress({
                            item: undefined,
                            index: menuIndex,
                          })
                        }
                        isLastIndex={
                          bottomSheetOptions.length - 1 === menuIndex
                        }
                        iconName={menuOption.iconName}
                      />
                    );
                  }
                )}
              </View>
            </BlurView>
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

export default React.memo(BottomSheetUpload);

const useStyles = useStylesWithTheme((theme) => ({
  bottomContainer: {
    flexDirection: "column",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000000,
    paddingBottom: 50,
  },
  bottomItemContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  modalWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
}));
