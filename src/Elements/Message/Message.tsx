import Typography from "@followBack/GenericElements/Typography";
import React, { useState } from "react";
import { View } from "react-native";
import { formatMessageDate } from "@followBack/Utils/date";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { excludeUser } from "@followBack/Utils/messages";
import { emailNameParcer } from "@followBack/Utils/email";
import {
  IThreadMessage,
  Reaction,
} from "@followBack/Apis/ThreadMessages/types";
import { MAIL_DOMAIN } from "@followBack/Apis/constants";
import Menu from "@followBack/GenericElements/PopupMenu/Menu";
import EmojiWrapper from "../EmojiWrapper/EmojiWrapper";
import EditedWrapper from "../EditedWrapper/EditedWrapper";
import BorderWrapper from "../BorderWrapper/BorderWrapper";
import RepliedToMessage from "../RepliedToMessage/RepliedToMessage";
import MessageContent from "./Components/MessageContent";
import BookMarkWrapper from "../BookMarkWrapper/BookMarkWrapper";
import SelectedDot from "../SelectedDot/SelectedDot";
import { ICreateEmojiApiResponse } from "@followBack/Apis/MessageReactions/types";
import {
  createEmojiApi,
  deleteEmojiApi,
  updateEmojiApi,
} from "@followBack/Apis/MessageReactions";

const Message = ({
  item,
  senderMenu,
  receiverMenu,
  index,
  isReplying,
  onUnBookMarkedPress,
  isSelectAllActivated,
  isSelected,
  onSelectPress,
  replyToMessageContent,
  onNavigateToRepliedMessage,
}: {
  item: IThreadMessage;
  senderMenu: any;
  receiverMenu: any;
  index: number;
  isReplying: boolean;
  onUnBookMarkedPress: (item: IThreadMessage) => void;
  isSelectAllActivated: boolean;
  isSelected: boolean;
  onSelectPress: (index: number) => void;
  replyToMessageContent: IThreadMessage | undefined;
  onNavigateToRepliedMessage: (item: IThreadMessage) => void;
}) => {
  const { styles } = useStyles();
  const [reactions, setReactions] = useState<Reaction[] | []>(
    item.reactions || []
  );

  const { to, from, cc, bcc, createdAt } = item;
  const { userDetails } = useUserDetails();
  const isOwnMessage = !item?.from?.address
    ? true
    : userDetails.user_name === emailNameParcer(item?.from?.address);

  const sender = from ?? {
    name: userDetails.user_name,
    address: userDetails.email,
  };
  const toList = to ?? [];
  const ccList = cc ?? [];
  const bccList = bcc ?? [];

  const chatUsers = [...toList, ...ccList, ...bccList, sender];
  const [showDate, setShowDate] = useState(false);

  const others = excludeUser({
    users: chatUsers,
    userAddress: `${userDetails.user_name}@${MAIL_DOMAIN}`,
  });

  const messageSender = sender;

  const myReactionIndex = reactions.findIndex(
    (reaction: Reaction) => reaction.byUserId === userDetails.wildduck_user_id
  );

  const _onEmojiPress = async (emojiName: string) => {
    let newReactions = reactions.slice();
    let emojiData: ICreateEmojiApiResponse | void =
      {} as ICreateEmojiApiResponse;
    try {
      if (myReactionIndex === -1) {
        // don't have any reaction for this
        emojiData = await createEmojiApi({
          reaction: emojiName,
          headerId: item.headerId as string,
        });
      } else {
        // have emoji to be updated
        emojiData = await updateEmojiApi({
          id: reactions[myReactionIndex].id,
          reaction: emojiName,
        });

        newReactions.splice(myReactionIndex, 1);
      }

      newReactions = [...newReactions, { ...emojiData }];

      setReactions(newReactions);
    } catch (error) {}
  };

  const onReactedEmojiPress = async () => {
    try {
      if (myReactionIndex !== -1) {
        await deleteEmojiApi({ id: item.reactions[myReactionIndex].id });
        const tempReactions = reactions.slice();
        tempReactions.splice(myReactionIndex, 1);

        setReactions(tempReactions);
      }
    } catch (error) {}
  };

  const DateSection = showDate && (
    <View
      style={[
        {
          alignSelf: isOwnMessage ? "flex-start" : "flex-end",
          position: "absolute",
        },
      ]}
    >
      <Typography type="smallRegularBody" color="secondary">
        {formatMessageDate(createdAt ?? "")}
      </Typography>
    </View>
  );

  const menuProps = {
    key: `message-${item.messageId}`,
    menuOptions: isOwnMessage ? senderMenu(item) : receiverMenu,
    item: item,
    onPress: () => {
      if (isSelectAllActivated) {
        onSelectPress(index);
      } else {
        setShowDate((prevState) => !prevState);
      }
    },
    onEmojiPress: _onEmojiPress,
    emojis: ["thumbsup", "heart", "joy", "open_mouth", "pray", "cry"],
    MessageContent: <MessageContent item={item} />,
    index: index,
    disabled: isSelectAllActivated,
  };

  const uniqueReactions = [
    ...new Set(reactions.map((reaction) => reaction.reaction)),
  ];

  const adjustPositionStyle = {
    ...(isOwnMessage ? { marginLeft: "auto" } : { marginRight: "auto" }),
  };

  const _onUnBookMarkedPress = () => {
    onUnBookMarkedPress({ ...item, index });
  };

  const _onNavigateToRepliedMessage = () => {
    onNavigateToRepliedMessage(item);
  };

  if (item.isDeleted) {
    //TODO:
    return (
      <View style={adjustPositionStyle}>
        <Typography type="mediumRegularBody" color="secondary">
          {"You unsent a message"}
        </Typography>
      </View>
    );
  }

  return (
    <View>
      <RepliedToMessage
        isVisible={!!replyToMessageContent}
        isOwnMessage={isOwnMessage}
        onNavigateToRepliedMessage={_onNavigateToRepliedMessage}
      >
        <MessageContent
          item={replyToMessageContent as IThreadMessage}
          containerStyle={styles.repliedToMessage}
          textColor="secondary"
        />
      </RepliedToMessage>

      <Menu {...menuProps}>
        {isSelectAllActivated && (
          <SelectedDot
            isSelected={isSelected}
            onSelectPress={onSelectPress}
            index={index}
          />
        )}
        <View
          style={[
            adjustPositionStyle,
            {
              ...(!isOwnMessage && isSelectAllActivated
                ? { marginLeft: 35 }
                : {}),
            },
          ]}
        >
          <BookMarkWrapper
            isBookMarked={item?.isBookMarked as boolean}
            isOwnMessage={isOwnMessage}
            onUnBookMarkedPress={_onUnBookMarkedPress}
          >
            <EditedWrapper
              isEdited={item?.edited}
              isOwnMessage={isOwnMessage}
              editedDate={item.updatedAt as string}
            >
              <EmojiWrapper
                onReactedEmojiPress={onReactedEmojiPress}
                reactions={uniqueReactions}
                myReactionIndex={myReactionIndex}
              >
                <BorderWrapper isReplying={isReplying}>
                  <MessageContent item={item} />
                </BorderWrapper>
              </EmojiWrapper>
            </EditedWrapper>
          </BookMarkWrapper>
        </View>
        {DateSection}
      </Menu>
    </View>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  date: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    position: "absolute",
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "80%",
    borderRadius: 20,
    backgroundColor: theme.colors.dark02,
  },
  activityIndicatorContainer: {
    position: "absolute",
    left: -20,
    top: "30%",
  },
  ownMessageStyle: {
    backgroundColor: theme.colors.purple,
  },
  otherMessagesStyle: {
    backgroundColor: theme.colors.dark04,
    borderColor: theme.colors.dark02,
    borderWidth: 1,
  },
  repliedToMessage: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: theme.colors.purple,
    maxWidth: 200,
    maxHeight: 200,
    overflow: "hidden",
  },
}));

export default React.memo(
  Message,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
