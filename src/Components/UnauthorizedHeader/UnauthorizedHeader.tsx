import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {NativeStackHeaderProps} from "@react-navigation/native-stack/lib/typescript/src/types";

const UnauthorizedHeader: React.FC<NativeStackHeaderProps> = ({ navigation, route, options, back })=>{
    const canGoBack = navigation.canGoBack();
    const onBackButtonPress = ()=>{
        canGoBack && navigation.goBack();
    };

    return(
        <View style={styles.headerStyle}>
            <Text style={styles.title}>{options.title}</Text>
            <Button color="#696969" title="back" onPress={onBackButtonPress}></Button>
        </View>
    )
};
const styles = StyleSheet.create({
    headerStyle: {
        height: 150,
        flexDirection: "row",
        backgroundColor: "#151515",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 0,
        paddingHorizontal: 50,


    },
    title: {
        color: "#696969"
    }
});
export default UnauthorizedHeader;

