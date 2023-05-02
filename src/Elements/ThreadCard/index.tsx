import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Keyboard,
    View,
    Text,
} from "react-native";
import React, {useEffect, useState} from "react";
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

    let others = excludeUser({
        users: [threadItem.lastMessage.from, ...threadItem.lastMessage.to, ...threadItem.lastMessage.cc, ...threadItem.lastMessage.bcc ],
        userAddress: userDetails.email,
    });

    others = others.length === 0  &&  threadItem?.lastMessage?.from?.address === userDetails.email ?  [threadItem.lastMessage.from]  : others;
    const message = threadItem.lastMessage.text?.trim() && threadItem.lastMessage.text?.trim() !== "" ? threadItem.lastMessage.text?.trim() : "\<no message\>";
    const subject = threadItem.lastMessage.subject?.trim() && threadItem.lastMessage.subject?.trim() !== "" ? threadItem.lastMessage.subject?.trim() : "\<no subject\>";
    const isMessageSeen = !threadItem.lastMessage.unseen;
    const textColor = isMessageSeen ? "secondary" : "chat";
    return (
        <View style={styles.container}>
            <View style={{...styles.avatar}}>
                <Avatar users={others}/>
            </View>

            <View style={[styles.content, {flex: 4}]}>
                <View >
                    <Typography
                        type={isMessageSeen ? "mediumRegularTitle" : "mediumBoldTitle"}
                        color={textColor}
                        ellipsizeMode="tail"
                        numberOfLines={1}

                    >
                        {getThreadParticipantsUserName(others)}
                    </Typography>
                </View>

                <View style={{marginBottom: 3}}>
                    <Typography
                        type={isMessageSeen ? "largeRegularBody" : "largeBoldBody"}
                        color={textColor}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >
                        {subject}
                    </Typography>
                </View>
                <View>
                    <Typography
                        type={isMessageSeen ? "mediumRegularBody" : "mediumBoldBody"}
                        color={textColor}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >
                        {message}
                    </Typography>
                </View>
            </View>
            <View style={styles.content}>
                <View >
                    <Typography
                        type={isMessageSeen ? "mediumRegularTitle" : "mediumBoldTitle"}
                        color={"black"}
                        ellipsizeMode="tail"
                        numberOfLines={1}

                    >
                        {getThreadParticipantsUserName(others)}
                    </Typography>
                </View>

                <View style={{marginBottom: 3}}>
                    <Typography
                        type={isMessageSeen ? "largeRegularBody" : "largeBoldBody"}
                        color={"black"}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >
                        {subject}
                    </Typography>
                </View>
                <View style={{height: 17, justifyContent: "center"}}>
                    <Typography
                        type={isMessageSeen ? "smallRegularBody" : "smallBoldBody"}
                        color={textColor}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        lineHeight={17}
                    >
                        {formatMessageDate(threadItem.lastMessage.date)}
                    </Typography>
                </View>
            </View>
        </View>
    );
};
export default ThreadCard;

const styles = StyleSheet.create({
    container: {
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
       // position: "relative",
    },

    avatar: {
        marginRight: 10,
        width: 52
    },
    content: {
       // gap: 3,
        flex: 1,
        width: "100%",
    },
    date: {
      //  alignSelf: "flex-end",

     //   paddingBottom: 10,
      //  marginLeft: 10
/**/        //flex: 1
        // position: "absolute",
        //  right: 0,
        //bottom: 8,
    },
});
