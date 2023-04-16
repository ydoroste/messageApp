import Typography from "@followBack/GenericElements/Typography";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import useTheme from "@followBack/Hooks/useTheme";
import { ILoadingScreen } from "./LoadingScreen.types";


const LoadingScreen: React.FC<ILoadingScreen> = ({loadingText, loadingIndecatorSize}) => {
    const { colors } = useTheme();

    return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.black }}>
        <ActivityIndicator size={loadingIndecatorSize} color={colors.grey01} />
        <Typography color="secondary" type="largeRegularBody">{loadingText}</Typography>
    </View>)

};

export default LoadingScreen;