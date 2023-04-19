import Typography from "@followBack/GenericElements/Typography";
import React, { useRef, useState } from "react";
import { View, StyleSheet, Pressable, ViewStyle } from "react-native";
import { formatMessageDate } from "@followBack/Utils/date";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCompose } from "@followBack/Hooks/Apis/Compose";
import { composeApi } from "@followBack/Apis/Compose";
import { UIActivityIndicator } from "react-native-indicators";

const FailedMessage = ({ item, moveFromFailedToSuccess, createComposeRequest }) => {
    const { styles } = useStyles();
    const { text } = item;
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState(false);

    const onMessageClick = async () => {
        setIsLoading(true);
        const composeRequest = createComposeRequest(item.text);
        const data = await composeApi(composeRequest);
        if (data.success) {
            moveFromFailedToSuccess(item.messageId);
        };
        setIsLoading(false);
    }

    return (
        <>
            <Pressable
                onPress={onMessageClick}
                style={styles.container}
            >
                <View
                    style={{
                        ...styles.contentContainer,
                    }}
                >
                    <Typography type="largeRegularBody" color="error">
                        {text}
                    </Typography>
                </View>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="email-send-outline" size={20} color={colors.red} />
                    <Typography type="largeRegularBody" color="error">
                        resend
                    </Typography>
                </View>
                {isLoading && <View style={styles.activityIndicatorContainer}>
                    <UIActivityIndicator color={colors.red} size={15} />
                </View>}
            </Pressable>
        </>
    );
};

const useStyles = useStylesWithTheme((theme) => ({
    container: {
        position: "relative",
        marginLeft: "auto",
        borderColor: theme.colors.red
    },
    contentContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: "80%",
        borderRadius: 20,
        backgroundColor: theme.colors.dark02,
        marginLeft: "auto"
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 2
    },
    activityIndicatorContainer: {
        position: "absolute",
        left: -20,
        top: "23%",
       },
}));

export default FailedMessage;
