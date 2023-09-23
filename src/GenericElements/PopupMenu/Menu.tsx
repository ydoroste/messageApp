import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  Pressable,
  StyleSheet,
  Platform,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native";
import MenuItem from "./Components/MenuItem";
import { View } from "react-native";

import Emojis from "./Components/Emojis";
import BlurredModal from "../BlurredModal/BlurredModal";
import { iconsType } from "../IconButton/types";

const { width: layoutWidth, height: layoutHeight } = Dimensions.get("window");

type MenuOption = {
  text: string;
  onPress: (props: { item: any; index: number }) => void;
  iconName: iconsType;
};

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
  containerStyle,
}: {
  menuOptions: MenuOption[];
  children: React.ReactNode;
  item: any;
  onPress: () => void;
  onEmojiPress: (emojiName: string) => void;
  emojis: string[];
  MessageContent: React.ReactNode;
  index: number;
  disabled: boolean;
  containerStyle: StyleProp<ViewStyle>;
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
    <View style={containerStyle}>
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
        <View style={{ maxWidth: "80%" }}>{MessageContent}</View>

        <View style={[styles.activeSection]} collapsable={false}>
          <Emojis
            emojis={emojis}
            closeModal={closeModal}
            onEmojiPress={onEmojiPress}
          />

          {menuOptions.map((menuOption: MenuOption, menuIndex: number) => {
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
    </View>
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
