import * as React from "react";
import InputField from "@followBack/GenericElements/InputField";
import {IPasswordInputProps} from "@followBack/GenericElements/PasswordInput/types";
import IconButton from "@followBack/GenericElements/IconButton";
import {TextInput} from "react-native-paper";
import {StyleSheet} from "react-native";
import useTheme from "@followBack/Hooks/useTheme";
import {memo, useState} from "react";

const PasswordInput: React.FC<IPasswordInputProps> = (props) => {
    const {colors} = useTheme();
    const [showPassword, setShowPassword] = useState<boolean>();
    const iconPress = () => {
        setShowPassword(prevState => !prevState);
    };
    return <InputField {...props}
                       secureTextEntry={!showPassword}
                       right={<TextInput.Icon style={styles.iconStyle}
                                              name={() => <IconButton name={showPassword ? "shown" : "hidden"} width={18}
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