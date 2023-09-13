import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Pressable,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import MenuItem from "./Components/MenuItem";
import { View } from "react-native";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";

import { BlurView } from "expo-blur";

const { width: layoutWidth, height: layoutHeight } = Dimensions.get("window");

const Menu = ({
  menuOptions,
  children,
  actionParamsProps,
  onPress,
}: {
  menuOptions: any;
  children: React.ReactNode;
  actionParamsProps: Record<string, object>;
  onPress: () => void;
}) => {
  const triggerWrapperRef = useRef<View | null>(null);

  const [triggerHeight, setTriggerHeight] = useState(0);

  const [menuVisible, setMenuVisible] = useState(false);

  const calculateTriggerHeight = () => {
    triggerWrapperRef?.current?.measureInWindow((x, y, width, height) => {
      setTriggerHeight(height);
    });
  };

  const closeModal = useCallback(() => {
    setMenuVisible(false);
    setTriggerHeight(0);
  }, []);

  useEffect(() => {
    if (menuVisible) {
      if (triggerWrapperRef?.current) calculateTriggerHeight();
    }
  }, [menuVisible]);

  return (
    <>
      <Pressable
        onLongPress={() => {
          setMenuVisible(true);
        }}
        onPress={onPress}
        ref={triggerWrapperRef}
      >
        {children}
      </Pressable>
      <Modal transparent visible={menuVisible}>
        {menuVisible && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={closeModal}
            style={styles.modalWrapper}
          >
            <BlurView
              intensity={Platform.OS === "ios" ? 30 : 120}
              tint="dark"
              style={{
                paddingBottom:
                  triggerHeight > layoutHeight - 100 ? 200 : undefined,
                ...styles.modalContent,
              }}
            >
              <View>{children}</View>
              <View style={[styles.activeSection]} collapsable={false}>
                {menuOptions.map((menuOption: any) => {
                  return (
                    <MenuItem
                      closeModal={closeModal}
                      text={menuOption.text}
                      onPress={() =>
                        menuOption.onPress(actionParamsProps[menuOption.text])
                      }
                    />
                  );
                })}
              </View>
            </BlurView>
          </TouchableOpacity>
        )}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activeSection: {
    ...Platform.select({
      ios: {
        width: layoutWidth * 0.5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.35,
        shadowRadius: 100,
      },
      android: {
        maxWidth: layoutWidth * 0.7,
      },
    }),
    zIndex: 99,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 13,
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default Menu;
