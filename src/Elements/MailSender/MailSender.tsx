import IconButton from '@followBack/GenericElements/IconButton';
import React, { useEffect, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import InputField from '@followBack/GenericElements/InputField';
import useTheme from '@followBack/Hooks/useTheme';
import useKeyboardOpenListner from '@followBack/Hooks/useKeyboardOpenListner';
import { UIActivityIndicator } from 'react-native-indicators';

const MailSender = ({
  onChangeMailContent,
  onPressCompose,
  text,
  isLoading = false,
  onPressAttachments,
  tempAttachments,
  isUploading,
  isFocus = false,
}: {
  tempAttachments: string[];
  isLoading?: boolean;
  onPressCompose: (e: GestureResponderEvent) => void;
  onChangeMailContent: Function;
  text: string;
  onPressAttachments: (e: GestureResponderEvent) => void;
  isUploading?: boolean;
  isFocus?: boolean;
}) => {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(true);
  const isKeyboardOpen = useKeyboardOpenListner();
  const inputMaxHeight = focused ? 300 : isKeyboardOpen ? 100 : 200;

  const ref = useRef<TextInput | null>(null);
  useEffect(() => {
    if (isFocus) {
      ref.current?.focus();
    }
  }, []);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  return (
    <View style={styles.flexCenter}>
      <View style={styles.iconContainer}>
        <IconButton
          onPress={onPressAttachments}
          name='add'
          width={17}
          height={17}
          color={colors.grey02}
        />
      </View>
      <View style={styles.input}>
        <InputField
          ref={ref}
          focused={focused}
          onFocus={onFocus}
          onBlur={onBlur}
          value={text}
          inputMaxHeight={inputMaxHeight}
          textColor={colors.white}
          onChangeText={(text: string) => onChangeMailContent({ value: text })}
          multiline
          mode='outlined'
          placeholder='Write a message...'
        />
      </View>
      <View style={styles.iconContainer}>
        {isLoading ? (
          <View style={styles.loadingIconContainer}>
            <UIActivityIndicator color={colors.grey02} size={22} />
          </View>
        ) : (
          <IconButton
            onPress={onPressCompose}
            name='send'
            width={17}
            height={17}
            color={
              tempAttachments.length > 0 || text || isUploading
                ? colors.grey03
                : colors.grey01
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 0,
    zIndex: 10,
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'black',
    width: '100%',
  },
  iconContainer: {
    marginBottom: 4,
  },
  loadingIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 33,
    marginBottom: 2,
  },
});

export default MailSender;
