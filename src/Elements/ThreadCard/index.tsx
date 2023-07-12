import {
    StyleSheet,
    View,
} from "react-native";
import React, {} from "react";
import {IthreadCardProps} from "@followBack/Elements/ThreadCard/types";
import Typography from "@followBack/GenericElements/Typography";
import Avatar from "@followBack/Elements/Avatar";
import {useUserDetails} from "@followBack/Hooks/useUserDetails";
import {excludeUser} from "@followBack/Utils/messages";
import {getThreadParticipantsUserName} from "@followBack/Utils/stringUtils";

const ThreadCard: React.FC<IthreadCardProps> = ({ threadItem }) => {
    const {userDetails} = useUserDetails();
    
    let others = excludeUser({
        users: [threadItem.lastHeader.formContact, ...threadItem.lastHeader.toList, ...threadItem.lastHeader.ccList ?? [], ...threadItem.lastHeader.bccList ?? [] ],
        userAddress: "tarek@iinboxx.com"
    });
    
    others = others.length === 0  &&  threadItem?.lastHeader.formContact.address === userDetails.email ?  [threadItem.lastHeader.formContact]  : others;
    const message = threadItem.text?.trim() && threadItem.text?.trim() !== "" ? threadItem.text?.trim() : "\<no message\>";
    const subject = threadItem.subject?.trim() && threadItem.subject?.trim() !== "" ? threadItem.subject?.trim() : "\<no subject\>";
    const isMessageSeen = threadItem.seen;
    const textColor = isMessageSeen ? "secondary" : "chat";
    
    return (
        <View style={styles.container}>
            <View style={{...styles.avatar}}>
                <Avatar users={others}/>
            </View>

            <View style={[styles.content, {flex: 3.5}]}>
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
                <View style={{justifyContent: "center"}}>
                    <Typography
                        type={isMessageSeen ? "smallRegularBody" : "smallBoldBody"}
                        color={textColor}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        lineHeight={17}
                        textAlign="center"
                    >
                        {/* {formatMessageDate(threadItem.lastMessage.date)} */}
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
