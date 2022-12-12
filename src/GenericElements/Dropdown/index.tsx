import React, { useRef } from "react";
import { Keyboard } from "react-native";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { IDropdownProps } from "@followBack/GenericElements/Dropdown/types";
import { memo } from "react";
import SelectDropdown from "react-native-select-dropdown";
import DownArrow from "@followBack/Theme/Icons/DownArrow";

const Dropdown: React.FC<IDropdownProps> = ({
  items,
  defaultText,
  onSelect,
  value
}) => {
  const { styles } = useStyles();
  const ref = useRef<SelectDropdown>(null);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const selectedItem =  items.find(item=> value === item.value)

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SelectDropdown
      data={items}
      onSelect={onSelect}
      onFocus={() => {
        if (isKeyboardVisible) {
          //ref?.current?.closeDropdown();
          Keyboard.dismiss();
          ref?.current?.openDropdown();
        }
      }}
      defaultValue={selectedItem}
      ref={ref}
      defaultButtonText={defaultText}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem.name;
      }}
      rowTextForSelection={(item, index) => {
        return item.name;
      }}
      buttonStyle={styles.dropdownButton}
      buttonTextStyle={{ ...styles.textStyle, ...styles.dropdownButtonText }}
      renderDropdownIcon={(isOpened) => {
        return <DownArrow width={16} height={16} color={"none"} />;
      }}
      dropdownIconPosition={"right"}
      dropdownStyle={styles.dropdown}
      rowStyle={styles.dropdownRow}
      rowTextStyle={{ ...styles.textStyle, ...styles.dropdownRowText }}
    />
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  dropdown: {
    paddingBottom: 4,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.dark03,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdownRow: {
    backgroundColor: theme.colors.dark03,
    borderBottomColor: theme.colors.dark02,
  },
  dropdownRowText: {
    color: theme.colors.grey02,
    paddingVertical: 3,
    letterSpacing: 0,
  },
  dropdownButton: {
    width: "100%",
    height: 36,
    backgroundColor: theme.colors.dark02,
    borderRadius: 12,
    margin: 0,
    padding: 0,
  },
  dropdownButtonText: {
    justifyContent: "flex-start",
    marginLeft: 4,
    letterSpacing: 0,
  },

  textStyle: {
    color: theme.colors.grey02,
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fontFamilies.OpenSans_400Regular,
    textAlign: "left",
  },
}));

export default memo(Dropdown);
