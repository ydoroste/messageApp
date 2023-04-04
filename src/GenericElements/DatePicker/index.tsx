import React, { memo, useState } from "react";
import { TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { IDatePickerProps } from "@followBack/GenericElements/DatePicker/types";
import useTheme from "@followBack/Hooks/useTheme";
import DownArrow from "@followBack/Theme/Icons/DownArrow";
import moment from "moment";
import Typography from "@followBack/GenericElements/Typography";
import {StyleSheet} from 'react-native';

const DatePicker: React.FC<IDatePickerProps> = ({ error, date, onSelect, title, format }) => {
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
    hideDatePicker();
    onSelect(date);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={showDatePicker}
        style={{
          ...styles.buttonContainer,
          borderBottomColor: error ? colors.red : colors.grey02,
        }}
      >
        {!date && <Typography type="largeRegularBody" color="secondary">
          {title}
        </Typography>}
        {!!date && (
          <Typography type="largeRegularBody" color="primary">
            {moment(date).format(format ? format : "MM/DD/YYYY")}
          </Typography>
        )}

      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  buttonContainer: {
    width: "100%",
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 4,
    alignItems: "center"
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
