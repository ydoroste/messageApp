import Typography from "@followBack/GenericElements/Typography";
import React, {useRef, useState} from "react";
import {View, StyleSheet, Pressable} from "react-native";
import {formatMessageDate} from "@followBack/Utils/date";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import {useUserDetails} from "@followBack/Hooks/useUserDetails";
import {excludeUser} from "@followBack/Utils/messages";

const Message = ({item}) => {
    const {styles} = useStyles();
    const {text, to, from, messageDateTime} = item;
    const {userDetails} = useUserDetails();
    const [showDate, setShowDate] = useState(false);
    const chatUsers = [...to, from];
    const itemPosition = useRef<number>(0);
    const others = excludeUser({
        users: chatUsers,
        userAddress: userDetails.email,
    });
    const isGroupChat = others.length > 1;
    const messageSender = from;
    const messageSenderLabel =
        messageSender.name.length > 0 ? messageSender.name : messageSender.address;

    const contentContainerStyles = isGroupChat
        ? [styles.contentContainer]
        : [styles.contentContainer, styles.groupContentContainer];

    return (
        <>
            <View onLayout={(event) => {
                const {height} = event.nativeEvent.layout;
                itemPosition.current = (height / 2) - 6;
            }} style={styles.container}>
                <Pressable onPress={() => {
                    setShowDate(prevState => !prevState)
                }} style={contentContainerStyles}>
                    {isGroupChat && (
                        <Typography type="largeBoldBody" color="chat">
                            {messageSenderLabel + " "}
                        </Typography>
                    )}
                    <Typography type="largeRegularBody" color="chat">
                        {text}
                    </Typography>

                </Pressable>
            </View>
            {showDate && <View style={[styles.date, {top: itemPosition.current}]}>
                <Typography type="smallRegularBody" color="secondary">
                    {formatMessageDate(messageDateTime)}
                </Typography>
            </View>}

        </>
    );
};

const useStyles = useStylesWithTheme((theme) => ({
    container: {
        // paddingVertical: 5
        //marginBottom: 16
        position: "relative"
    },
    date: {
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "center",
        textAlign: "center",
        position: "absolute",
//    bottom: 0,
        right: 0
    },
    contentContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: "80%",
        borderRadius: 20,
        backgroundColor: theme.colors.dark02,
    },

    groupContentContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
}));

export default Message;
