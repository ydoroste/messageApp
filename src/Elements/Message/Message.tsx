import Typography from "@followBack/GenericElements/Typography";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { formatMessageDate } from "@followBack/Utils/date";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { excludeUser } from "@followBack/Utils/messages";
import { emailNameParcer } from "@followBack/Utils/email";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
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
import { PanGestureHandler } from "react-native-gesture-handler";
import IconButton from "@followBack/GenericElements/IconButton";
import CloseWrapper from "../CloseWrapper/CloseWrapper";
import OriginalEmailWrapper from "../OriginalEmailWrapper/OriginalEmailWrapper";
import useTheme from "@followBack/Hooks/useTheme";
import useMessageSenderDetails from "@followBack/Hooks/useMessageSenderDetails";
import AboveNameWrapper from "../AboveNameWrapper/AboveNameWrapper";

const Message = ({
  item,
  senderMenu,
  receiverMenu,
  isReplying,
  isSelectAllActivated,
  isSelected,
  replyToMessageContent,
  isAllFromUnSend,
  isCurrentMessageEditing,
  onUnBookMarkedPress,
  onSelectPress,
  onNavigateToRepliedMessage,
  onPressReplyToMessage,
  onCloseEdit,
  onPressViewOriginalEmail,
}: {
  item: IThreadMessage;
  senderMenu: any;
  receiverMenu: any;
  isReplying: boolean;
  onUnBookMarkedPress: (item: IThreadMessage) => void;
  isSelectAllActivated: boolean;
  isSelected: boolean;
  onSelectPress: (index: string) => void;
  replyToMessageContent: IThreadMessage | undefined;
  onNavigateToRepliedMessage: (item: IThreadMessage) => void;
  onPressReplyToMessage: (threadMessage: IThreadMessage) => void;
  isAllFromUnSend: boolean;
  isCurrentMessageEditing: boolean;
  onCloseEdit: () => void;
  onPressViewOriginalEmail: (html: string) => void;
}) => {
  const { styles } = useStyles();
  const [reactions, setReactions] = useState<Reaction[] | []>(
    item.reactions || []
  );

  const { colors } = useTheme();

  useEffect(() => {
    setReactions(item.reactions || []);
  }, [JSON.stringify(item.reactions)]);

  const { userDetails } = useUserDetails();
  const isOwnMessage = !item?.from?.address
    ? true
    : userDetails.user_name === emailNameParcer(item?.from?.address);

  const isRepliedMessageMyOwn = !replyToMessageContent?.from?.address
    ? true
    : userDetails.user_name ===
      emailNameParcer(replyToMessageContent?.from?.address);

  const [showDate, setShowDate] = useState(false);

  const [isAttachmentsImageOpened, setIsAttachmentsImageOpened] =
    useState(false);

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

  const DateSection = !isSelectAllActivated && showDate && (
    <View
      style={[
        {
          alignSelf: isOwnMessage ? "flex-start" : "flex-end",
          position: "absolute",
          bottom: 0,
        },
      ]}
    >
      <Typography type="smallRegularBody" color="secondary">
        {formatMessageDate(item.createdAt ?? "")}
      </Typography>
    </View>
  );

  const adjustPositionStyle = {
    ...(isOwnMessage ? { marginLeft: "auto" } : { marginRight: "auto" }),
  };
  const menuProps = {
    key: `message-${item.messageId}`,
    menuOptions: isOwnMessage ? senderMenu : () => receiverMenu,
    item: item,
    onPress: () => {
      if (isSelectAllActivated) {
        onSelectPress(item.messageId as string);
      } else {
        setShowDate((prevState) => !prevState);
      }
    },
    onEmojiPress: _onEmojiPress,
    emojis: item?.promotional
      ? []
      : ["thumbsup", "heart", "joy", "open_mouth", "pray", "cry"],
    MessageContent: (
      <MessageContent
        item={item}
        isAllFromUnSend={isAllFromUnSend}
        isViewOnly
      />
    ),
    disabled: isSelectAllActivated,
    containerStyle: [
      adjustPositionStyle,
      {
        maxWidth: isAttachmentsImageOpened ? "100%" : "80%",
        ...(!isOwnMessage && isSelectAllActivated ? { marginLeft: 41 } : {}),
      },
    ],
    isAttachmentsImageOpened,
  };

  const uniqueReactions = [
    ...new Set(reactions.map((reaction) => reaction.reaction)),
  ];

  const _onUnBookMarkedPress = () => {
    onUnBookMarkedPress(item);
  };

  const _onNavigateToRepliedMessage = () => {
    onNavigateToRepliedMessage(item);
  };

  const { isGroupChat, text, userFirstName } = useMessageSenderDetails(item);

  const startPosition = 0;
  const x = useSharedValue(startPosition);

  const eventHandler = useAnimatedGestureHandler({
    onActive(event, context) {
      if (event.translationX >= 0) {
        x.value = event.translationX;
      }
    },
    onEnd(event, context) {
      x.value = withSpring(0);
      if (x.value >= 100) {
        runOnJS(onPressReplyToMessage)(item);
      }
    },
  });

  const uas = useAnimatedStyle(() => {
    const translatedX = interpolate(x.value, [0, 100], [0, 50]);

    return {
      transform: [{ translateX: translatedX }],
    };
  });

  const replyStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(x.value, [80, 100], [0, 1]),
    };
  });

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
    <PanGestureHandler
      onGestureEvent={eventHandler}
      failOffsetY={[-5, 5]}
      activeOffsetX={[-5, 5]}
      enabled={!isAttachmentsImageOpened}
    >
      <Animated.View style={[styles.swipeContainer, uas]}>
        <Animated.View style={[styles.replyIconContainer, replyStyle]}>
          <IconButton
            disabled
            name={"reply"}
            width={17}
            height={17}
            color={"white"}
          />
        </Animated.View>

        <RepliedToMessage
          isVisible={!!replyToMessageContent}
          isOwnMessage={isOwnMessage}
          onNavigateToRepliedMessage={_onNavigateToRepliedMessage}
        >
          <MessageContent
            item={replyToMessageContent as IThreadMessage}
            containerStyle={{
              ...styles.repliedToMessage,
              ...(!isRepliedMessageMyOwn ? { borderColor: colors.grey01 } : {}),
            }}
            isViewOnly
            textColor="secondary"
            isAllFromUnSend={isAllFromUnSend}
          />
        </RepliedToMessage>

        {isSelectAllActivated && (
          <SelectedDot
            isSelected={isSelected}
            onSelectPress={onSelectPress}
            messageId={item.messageId as string}
          />
        )}
        {DateSection}
        <Menu {...menuProps}>
          <AboveNameWrapper
            isVisible={isGroupChat && !isOwnMessage}
            userFirstName={userFirstName as string}
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
                <OriginalEmailWrapper
                  isPromotional={(item?.promotional && item.html) as boolean}
                  html={item.html}
                  onPressViewOriginalEmail={onPressViewOriginalEmail}
                >
                  <EmojiWrapper
                    onReactedEmojiPress={onReactedEmojiPress}
                    reactions={uniqueReactions}
                    reactionCount={reactions.length}
                    myReactionIndex={myReactionIndex}
                    isAllFromUnSend={isAllFromUnSend}
                    isOwnMessage={isOwnMessage}
                  >
                    <BorderWrapper isReplying={isReplying}>
                      <CloseWrapper
                        isCurrentMessageEditing={isCurrentMessageEditing}
                        onCloseEdit={onCloseEdit}
                      >
                        <MessageContent
                          item={item}
                          isAllFromUnSend={isAllFromUnSend}
                          setIsAttachmentsImageOpened={
                            setIsAttachmentsImageOpened
                          }
                        />
                      </CloseWrapper>
                    </BorderWrapper>
                  </EmojiWrapper>
                </OriginalEmailWrapper>
              </EditedWrapper>
            </BookMarkWrapper>
          </AboveNameWrapper>
        </Menu>
      </Animated.View>
    </PanGestureHandler>
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

  repliedToMessage: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.purple,
    maxWidth: 200,
    maxHeight: 200,
    overflow: "hidden",
    zIndex: 1000000,
  },
  replyIconContainer: {
    position: "absolute",
    left: -50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  swipeContainer: {
    marginVertical: 7,
  },
}));

export default React.memo(
  Message,
  (prevProps, nextProps) =>
    prevProps.isSelectAllActivated === nextProps.isSelectAllActivated &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.item === nextProps.item &&
    prevProps.isReplying === nextProps.isReplying &&
    prevProps.replyToMessageContent === nextProps.replyToMessageContent &&
    prevProps.isAllFromUnSend === nextProps.isAllFromUnSend &&
    prevProps.isCurrentMessageEditing === nextProps.isCurrentMessageEditing
);
