import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { IthreadCardProps } from "@followBack/Elements/ThreadCard/types";
import Typography from "@followBack/GenericElements/Typography";
import Avatar from "@followBack/Elements/Avatar";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { excludeUser } from "@followBack/Utils/messages";
import { getThreadParticipantsUserName } from "@followBack/Utils/stringUtils";
import { formatMessageDate } from "@followBack/Utils/date";
import IconButton from "@followBack/GenericElements/IconButton";
import useTheme from "@followBack/Hooks/useTheme";
import { IContact } from "@followBack/Apis/Contacts/types";
import { MAIL_DOMAIN } from "@followBack/Apis/constants";
import VerifiedIcon from "@followBack/GenericElements/VerifiedIcon/VerifiedIcon";

const ThreadCard: React.FC<IthreadCardProps> = ({ threadItem }) => {
  if (!threadItem) return <></>;
  const { userDetails } = useUserDetails();
  const { colors } = useTheme();

  let others: IContact[] = [];
  others = excludeUser({
    users: [
      threadItem.lastHeader.formContact,
      ...threadItem.lastHeader.toList,
      ...(threadItem.lastHeader.ccList ?? []),
      ...(threadItem.lastHeader.bccList ?? []),
    ],
    userAddress: `${userDetails.user_name}@${MAIL_DOMAIN}`,
  });
  others =
    others.length === 0 &&
    threadItem?.lastHeader.formContact.address ===
      `${userDetails.user_name}@${MAIL_DOMAIN}`
      ? [
          {
            name: userDetails.user_name,
            address: `${userDetails.user_name}@${MAIL_DOMAIN}`,
          },
        ]
      : others;

  const message =
    threadItem.text?.trim() && threadItem.text?.trim() !== ""
      ? threadItem.text?.trim()
      : "<no message>";
  const subject =
    threadItem.subject?.trim() && threadItem.subject?.trim() !== ""
      ? threadItem.subject?.trim()
      : "<no subject>";
  const isMessageSeen = threadItem.seen;
  const textColor = isMessageSeen ? "secondary" : "chat";

  const adjustMessage = (text: string, length: number) => {
    return text
      .substring(0, length)
      .trim()
      .concat(text.length > length ? "..." : "");
  };

  const attachmentsLength = threadItem.lastHeader.attachments.length;

  return (
    <View style={styles.container}>
      <View style={{ ...styles.avatar }}>
        <Avatar users={others} imageURL={threadItem.favicon} />
      </View>

      <View style={[styles.content, { flex: 3.5 }]}>
        <View style={styles.headerIconContainer}>
          <Typography
            type={isMessageSeen ? "mediumRegularTitle" : "mediumBoldTitle"}
            color={textColor}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {getThreadParticipantsUserName(others)}
          </Typography>
          {threadItem.favicon && (
            <View style={styles.iconContainer}>
              <VerifiedIcon />
            </View>
          )}

          {threadItem.favorite && (
            <IconButton
              name={"smallpin"}
              width={10}
              disabled
              height={16}
              color={colors.purple}
            />
          )}
        </View>

        <View style={{ marginBottom: 3, flexDirection: "row" }}>
          <Typography
            type={isMessageSeen ? "largeRegularBody" : "largeBoldBody"}
            color={textColor}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {adjustMessage(subject, 30)}
          </Typography>
          {attachmentsLength > 0 && (
            <IconButton
              onPress={() => {}}
              name="attachment"
              width={9}
              height={16}
              color={colors.skyBlue}
            />
          )}

          <View style={styles.draftAndMuteContainer}>
            {threadItem.isDraft && ( //TODO:
              <Typography type={"smallBoldBody"} color={"error"}>
                draft
              </Typography>
            )}

            {threadItem.isMute && ( //TODO:
              <IconButton
                onPress={() => {}}
                name="alert"
                width={14}
                disabled
                height={16}
                color={colors.yellow}
              />
            )}
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography
            type={isMessageSeen ? "mediumRegularBody" : "mediumBoldBody"}
            color={textColor}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {message === "<no message>" && attachmentsLength
              ? `${attachmentsLength} attachments`
              : adjustMessage(message, 30)}
          </Typography>
          <Typography
            type={isMessageSeen ? "smallRegularBody" : "smallBoldBody"}
            color={textColor}
            ellipsizeMode="tail"
            numberOfLines={1}
            lineHeight={17}
            textAlign="center"
          >
            {formatMessageDate(threadItem.createdAt)}
          </Typography>
        </View>
      </View>
      <View style={{ alignSelf: "flex-end" }}></View>
    </View>
  );
};

export default memo(ThreadCard);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    marginVertical: 16,
  },

  avatar: {
    marginRight: 10,
    width: 52,
  },
  content: {
    flex: 1,
    width: "100%",
  },
  headerIconContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    top: -3,
    marginRight: "auto",
  },
  draftAndMuteContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: 15,
  },
});
