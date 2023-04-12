import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Keyboard,
    View,
    Text,
} from "react-native";
import React, {useState} from "react";
import {getTranslatedText} from "@followBack/Localization";
import {IthreadCardProps} from "@followBack/Elements/ThreadCard/types";
import Typography from "@followBack/GenericElements/Typography";
import Avatar from "@followBack/Elements/Avatar";
import {formatMessageDate} from "@followBack/Utils/date";
import {useUserDetails} from "@followBack/Hooks/useUserDetails";
import {excludeUser} from "@followBack/Utils/messages";
import {getThreadParticipantsUserName} from "@followBack/Utils/stringUtils";

const ThreadCard: React.FC<IthreadCardProps> = ({threadItem}) => {
    const {userDetails} = useUserDetails();

    const others = excludeUser({
        users: [threadItem.lastMessage.from, ...threadItem.lastMessage.to],
        userAddress: userDetails.email,
    });

    const isMessageSeen = !threadItem.lastMessage.unseen;
    const textColor = isMessageSeen ? "secondary" : "chat";
    return (
        <View style={styles.container}>
            <View style={{...styles.avatar}}>
                <Avatar users={others}/>
            </View>

            <View style={styles.content}>
                <View style={{flex: 0.7}}>
                    <Typography
                        type={isMessageSeen ? "mediumRegularTitle" : "mediumBoldTitle"}
                        color={textColor}
                        ellipsizeMode="tail"
                        numberOfLines={1}

                    >
                        {getThreadParticipantsUserName(others)}
                    </Typography>
                </View>

                <View style={{width: "82%", marginBottom: 3}}>
                    <Typography
                        type={isMessageSeen ? "largeRegularBody" : "largeBoldBody"}
                        color={textColor}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >
                        {threadItem.lastMessage.subject ?? "..."}
                    </Typography>
                </View>
                <View>
                    <Typography
                        type={isMessageSeen ? "mediumRegularBody" : "mediumBoldBody"}
                        color={textColor}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >
                        {threadItem.lastMessage.text}
                    </Typography>
                </View>
            </View>

            <View style={styles.date}>
                <Typography type={isMessageSeen ? "smallRegularBody" : "smallBoldBody"}
                            color={textColor}>
                    {formatMessageDate(threadItem.lastMessage.date)}
                </Typography>
            </View>
        </View>
    );
};
export default ThreadCard;

const styles = StyleSheet.create({
    container: {
        height: 86,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
        position: "relative",
    },

    avatar: {
        marginRight: 10,
        width: 52
    },
    content: {
        gap: 3,
        flex: 1,
        width: "100%"
    },
    date: {
        alignSelf: "flex-end",
        paddingBottom: 8,
        marginLeft: 10
        //flex: 1
        // position: "absolute",
        //  right: 0,
        //bottom: 8,
    },
});
