import * as React from "react";
import InputField from "@followBack/GenericElements/InputField";
import {IPasswordInputProps} from "@followBack/GenericElements/PasswordInput/types";
import IconButton from "@followBack/GenericElements/IconButton";
import {TextInput} from "react-native-paper";
import {StyleSheet} from "react-native";
import useTheme from "@followBack/Hooks/useTheme";
import {memo, useEffect, useState} from "react";

const PasswordInput: React.FC<IPasswordInputProps> = ({showPassword = false, setShowPassword = ()=>{}, ...props}) => {
    const {colors} = useTheme();
    const [showPasswordValue, setPasswordValue] = useState<boolean>(showPassword);
    const iconPress = () => {
        setShowPassword(!showPasswordValue);
        setPasswordValue(prevState => !prevState);
    };
    useEffect(()=>{
        if(showPassword !== showPasswordValue){
            setPasswordValue(prevState => !prevState);
        }
    }, [showPassword]);
    return <InputField {...props}
                       secureTextEntry={!showPasswordValue}
                       right={<TextInput.Icon 
                        style={styles.iconStyle}
                                  name={() => <IconButton
                                      name={showPasswordValue ? "shown" : "hidden"} width={18}
                                      height={16} onPress={iconPress}
                                      color={colors.grey01}/>}/>}

    />
};

export default memo(PasswordInput);


const styles = StyleSheet.create({
    iconStyle: {
        alignItems: "flex-end",
        marginTop: 15,
        marginLeft: 25
    }
});