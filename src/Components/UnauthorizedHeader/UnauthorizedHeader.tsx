import {StyleSheet, Text, View} from "react-native";
import * as React from "react";
import Close from "../../Theme/Icons/Close";
import {NativeStackHeaderProps} from "@react-navigation/native-stack/lib/typescript/src/types";

const UnauthorizedHeader: React.FC<NativeStackHeaderProps> = ({ navigation, route, options, back })=>{

    const canGoBack = navigation.canGoBack();
    const onBackButtonPress = ()=>{
        canGoBack && navigation.goBack();
    };

    return(
        <View style={styles.headerStyle}>
            <Text style={styles.title}>{options.title}</Text>
            <Close width={18} height={17} color="#696969" onPress={onBackButtonPress}/>
        </View>
    )
};
const styles = StyleSheet.create({
    headerStyle: {
        height: 150,
        flexDirection: "row",
        backgroundColor: "#000000",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 0,
        paddingHorizontal: 50

    },
    title: {
        color: "#696969",
        fontFamily: "OpenSans_400Regular",
        fontSize: 18,
        lineHeight: 25
    }
});
export default UnauthorizedHeader;

