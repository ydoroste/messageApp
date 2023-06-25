import {View} from "react-native";
import * as React from "react";
import {NativeStackHeaderProps} from "@react-navigation/native-stack/lib/typescript/src/types";
import Typography from "@followBack/GenericElements/Typography";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from "react-native-paper";

interface UnauthorizedHeaderProps extends NativeStackHeaderProps{
    handleBackButtonPress?: ()=> void;
}
const UnauthorizedHeader: React.FC<UnauthorizedHeaderProps> = ({handleBackButtonPress,  navigation, route, options, back })=>{

    const canGoBack = navigation.canGoBack();
    const onBackButtonPress = ()=>{
        if(handleBackButtonPress){
            handleBackButtonPress()
            return;
        }
        canGoBack && navigation.goBack();
    };
    const {colors} = useTheme();
    const useStyles = useStylesWithTheme((theme)=> ({
        headerStyle: {
            height: 85,
            flexDirection: "row",
            backgroundColor: theme.colors.black,
            justifyContent: "center",
            alignItems: "flex-end",
            paddingTop: 0,
            paddingHorizontal: 50
    
        },
        iconButton: {
            margin: 0,
            position: "absolute",
            bottom: -10
        }
    }));
    const {styles} = useStyles();
    return(
        <>
        <View style={styles.headerStyle}>
            <Typography type="mediumRegularTitle" color="secondary">{options.title}</Typography>
        </View>
            <IconButton
                style={styles.iconButton}
                rippleColor={colors.grey02}
                size={24}
                disabled={!canGoBack}
                onPress={onBackButtonPress}
                icon={({size, color})=> <Ionicons name="ios-chevron-back" size={size} color={color}  />}
            />

        </>
    )
};

export default UnauthorizedHeader;

