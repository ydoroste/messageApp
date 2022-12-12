import React, { useState, useRef } from "react";
import PhoneInput from "react-native-phone-number-input";
import { IPhoneNumberInputProps } from "@followBack/GenericElements/PhoneNumberInput/types";
import { getTranslatedText } from "@followBack/Localization";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
const PhoneNumberInput: React.FC<IPhoneNumberInputProps> = ({
  onChangePhoneNumber,
  onChangeFormattedPhoneNumber,
  onChangeCountry,
  country,
  value,
  error,
}) => {
  const phoneInput = useRef<PhoneInput>(null);
  const { styles } = useStyles();
  const { colors } = useTheme();
  const [isFocused, setFocus] = useState(false);

  return (
    <>
      <PhoneInput
        ref={phoneInput}
        value={value}
        layout="first"
        defaultCode={country?.cca2 || "US"}
        withShadow
        textInputProps={{
          placeholderTextColor: colors.grey02,
          onFocus: () => setFocus(true),
          onBlur: () => setFocus(false),
        }}
        filterProps={{autoFocus: true}}
        onChangeCountry={onChangeCountry}
        onChangeText={onChangePhoneNumber}
        onChangeFormattedText={onChangeFormattedPhoneNumber}
        withDarkTheme
        autoFocus
        placeholder={getTranslatedText("phoneNumber")}
        containerStyle={{
          ...styles.container,
          borderBottomColor: error ? colors.red : colors.grey02,
          borderBottomWidth: isFocused ? 2 : 1,
        }}
        flagButtonStyle={styles.flagButton}
        countryPickerButtonStyle={styles.countryPicker}
        codeTextStyle={{ ...styles.textStyle, ...styles.codeText }}
        textInputStyle={{ ...styles.textStyle, ...styles.textInput }}
        textContainerStyle={{
          ...styles.textContainer,
        }}
      />
    </>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  container: {
    paddingBottom: 4,
    backgroundColor: "transparent",
    width: "100%",
  },
  textContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  textInput: {
    padding: 0,
  },
  textStyle: {
    color: theme.colors.grey03,
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fontFamilies.OpenSans_400Regular,
    lineHeight: theme.lineHeights.medium,
    letterSpacing: 0,
  },
  codeText: {},
  flagButton: {
    width: 50,
  },
  countryPicker: {},
}));

export default PhoneNumberInput;
