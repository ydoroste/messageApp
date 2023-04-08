import IconButton from "@followBack/GenericElements/IconButton";
import React, { useCallback, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import InputField from "@followBack/GenericElements/InputField";
import useTheme from "@followBack/Hooks/useTheme";
import useKeyboardOpenListner from "@followBack/Hooks/useKeyboardOpenListner";


const MailSender = ({ onChangeMailContent, onPressCompose, mail }) => {
  const { colors } = useTheme();
  const [focused, setFocused] = React.useState(false);
  const isKeyboardOpen = useKeyboardOpenListner();
  const inputMaxHeight = focused ? 300 : (isKeyboardOpen ? 100 : 200);
  
  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false)
  }

  return (
    <View style={styles.flexCenter}>
      <View style={styles.iconContainer}>
        <IconButton
          onPress={() => { }}
          name="add"
          width={17}
          height={17}
          color={colors.grey02}
        />
      </View>
      <View style={styles.input}>
        <InputField
          focused={focused}
          onFocus={onFocus}
          onBlur={onBlur}
          value={mail}
          inputMaxHeight={inputMaxHeight}
          textColor={colors.white}
          onChangeText={(mail) => onChangeMailContent({ value: mail })}
          multiline
          mode="outlined"
          placeholder="write a message..."
        />
      </View>
      <View style={styles.iconContainer}>
        <IconButton
          onPress={onPressCompose}
          name="send"
          width={17}
          height={17}
          color={colors.grey01}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  flexCenter: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 0,
    zIndex: 10,
    position: "absolute",
    bottom: 10,
    backgroundColor: "black",
    left: 20,
    width: "100%",
  },
  iconContainer: {
    marginBottom: 4
  }
});

export default MailSender;
