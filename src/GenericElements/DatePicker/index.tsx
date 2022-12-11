import React, { memo, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { IDatePickerProps } from "@followBack/GenericElements/DatePicker/types";
import useTheme from "@followBack/Hooks/useTheme";

const DatePicker: React.FC<IDatePickerProps> = ({ error, date, onSelect }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { colors } = useTheme();
  const { styles } = useStyles();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onSelect(date.toLocaleString().split(",")[0]);
    hideDatePicker();
  };

  const formatText = (date: string) =>
    date
      .split("/")
      .map((number) =>
        Number(number) < 10 && number.length === 1 ? `0${number}` : number
      )
      .join(" / ");

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={showDatePicker}
        style={{
          ...styles.buttonContainer,
          borderBottomColor: error ? colors.error : colors.grey02,
        }}
      >
        <Text style={{ ...styles.text, ...styles.placeholder }}>
          date of birth
        </Text>
        {!date && (
          <Text style={{ ...styles.text, ...styles.placeholder }}>
            mm / dd / yyyy
          </Text>
        )}
        {!!date && (
          <Text style={{ ...styles.text, ...styles.dateText }}>
            {formatText(date)}
          </Text>
        )}
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date(new Date().setFullYear(new Date().getFullYear() - 13))}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  buttonContainer: {
    width: "100%",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 4,
  },

  text: {
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fontFamilies.OpenSans_400Regular,
  },
  placeholder: {
    color: theme.colors.grey02,
    letterSpacing: 0,
  },

  dateText: {
    color: theme.colors.grey03,
    letterSpacing: 1,
  },
}));

export default memo(DatePicker);
