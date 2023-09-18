import React, { useState, useEffect, useRef, useCallback } from "react";
import { Pressable, StyleSheet, Platform, Dimensions } from "react-native";
import MenuItem from "./Components/MenuItem";
import { View } from "react-native";

import Emojis from "./Components/Emojis";
import BlurredModal from "../BlurredModal/BlurredModal";

const { width: layoutWidth, height: layoutHeight } = Dimensions.get("window");

const Menu = ({
  menuOptions,
  children,
  item,
  onPress,
  emojis,
  onEmojiPress,
  MessageContent,
  index,
  disabled,
}: {
  menuOptions: any;
  children: React.ReactNode;
  item: any;
  onPress: () => void;
  onEmojiPress: (emojiName: string) => void;
  emojis: string[];
  MessageContent: React.ReactNode;
  index: number;
  disabled: boolean;
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
          if (!disabled) {
            setMenuVisible(true);
          }
        }}
        onPress={onPress}
        ref={triggerWrapperRef}
      >
        {children}
      </Pressable>
      <BlurredModal
        closeModal={closeModal}
        menuVisible={menuVisible}
        triggerHeight={triggerHeight}
      >
        <View>{MessageContent}</View>

        <View style={[styles.activeSection]} collapsable={false}>
          <Emojis
            emojis={emojis}
            closeModal={closeModal}
            onEmojiPress={onEmojiPress}
          />
          {menuOptions.map((menuOption: any) => {
            return (
              <MenuItem
                closeModal={closeModal}
                text={menuOption.text}
                onPress={() => menuOption.onPress({ ...item, index })}
                iconName={menuOption.iconName}
              />
            );
          })}
        </View>
      </BlurredModal>
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
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.35,
        shadowRadius: 100,
      },
    }),
    width: layoutWidth * 0.7,
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
