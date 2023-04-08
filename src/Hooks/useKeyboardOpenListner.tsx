import { Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
 
const useKeyboardOpenListner = () => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
 
  useEffect(() => {
    const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardShown(true);
    });
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardShown(false);
    });
 
    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);
 
  return isKeyboardShown;
};

export default useKeyboardOpenListner;