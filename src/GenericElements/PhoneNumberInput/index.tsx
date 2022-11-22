import React, { useState, useRef } from "react";

import PhoneInput from "react-native-phone-number-input";
import { IPhoneNumberInputProps } from "@followBack/GenericElements/PhoneNumberInput/types";
import { getTranslatedText } from "@followBack/Localization";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
const PhoneNumberInput: React.FC<IPhoneNumberInputProps> = ({
  onChangePhoneNumber,
  onChangeFormattedPhoneNumber,
  value,
}) => {
  const phoneInput = useRef<PhoneInput>(null);
  const { styles } = useStyles();
  return (
    <>
      <PhoneInput
        ref={phoneInput}
        value={value}
        layout="first"
        defaultCode="US"
        onChangeText={onChangePhoneNumber}
        onChangeFormattedText={onChangeFormattedPhoneNumber}
        withDarkTheme
        autoFocus
        placeholder={getTranslatedText("phoneNumber")}
        containerStyle={styles.container}
        flagButtonStyle={styles.flagButton}
        countryPickerButtonStyle={styles.countryPicker}
        codeTextStyle={{ ...styles.textStyle, ...styles.codeText }}
        textInputStyle={{ ...styles.textStyle, ...styles.textInput }}
      />
    </>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  container: {
    borderBottomColor: theme.colors.grey02,
    borderBottomWidth: 1,
    paddingBottom: 4,
    backgroundColor: "black"
  },
  textInput: {
    padding: 0
  },
  textStyle: {
    color: theme.colors.grey03,
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fontFamilies.OpenSans_400Regular,
    lineHeight: theme.lineHeights.medium,
    letterSpacing: 0,

  },
  codeText: {
    borderColor: "black",

  },
  flagButton: {
    borderColor: "black",

  },

  countryPicker: { 
    borderColor: "black",

   },
}));

export default PhoneNumberInput;
