import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  Image,
  Pressable,
  Keyboard,
} from "react-native";

import { setStringAsync } from "expo-clipboard";
import useTheme from "@followBack/Hooks/useTheme";
import { useFetchThreadMessages } from "@followBack/Hooks/Apis/ThreadMessages";
import Message from "@followBack/Elements/Message/Message";
import MailSender from "@followBack/Elements/MailSender/MailSender";
import ThreadDetailsHeader from "@followBack/Elements/Headers/Authorized/ThreadDetailsHeader/threadDetailsHeader.index";
import { excludeUser, makeid } from "@followBack/Utils/messages";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { getThreadParticipantsUserName } from "@followBack/Utils/stringUtils";
import {
  conversationDateTime,
  isTimelimitExceeded,
} from "@followBack/Utils/date";
import { useFocusEffect } from "@react-navigation/native";
import { IComposeApiRequest } from "@followBack/Apis/Compose/types";
import LoadingScreen from "@followBack/Elements/LoadingScreen/LoadingScreen.index";
import { FlashList } from "@shopify/flash-list";
import { useFailedMessages } from "@followBack/Hooks/useFailedMessages";
import FailedMessage from "@followBack/Elements/FailedMessage/FailedMessage.index";
import { composeApi, editMessageApi } from "@followBack/Apis/Compose";
import { IThreadMessage } from "@followBack/Apis/ThreadMessages/types";
import { IContact } from "@followBack/Apis/Contacts/types";
import * as ImagePicker from "expo-image-picker";
import {
  createAttachment,
  getUploadLinkApi,
} from "@followBack/Apis/GetAttachmentUploadLink";
import { ScrollView } from "react-native-gesture-handler";
import * as mime from "mime";
import { ICreateAttachmentRequest } from "@followBack/Apis/GetAttachmentUploadLink/types";
import { Thread } from "@followBack/Apis/threadsList/type";
import {
  deleteMessagesApi,
  unSendMessagesApi,
} from "@followBack/Apis/ThreadMessages";
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system";
import { ActivityIndicator } from "react-native-paper";
import { MAIL_DOMAIN } from "@followBack/Apis/constants";
import ReplyToMessage from "@followBack/Elements/ReplyToMessage/ReplyToMessage";
import SelectAllWrapper from "@followBack/Elements/SelectAllWrapper/SelectAllWrapper";

const ThreadDetails: React.FC = ({ navigation, route }) => {
  const { threadInfo } = route.params;
  const { threadId: id, topicId, subject, lastHeader } = threadInfo as Thread;
  const params = route.params;
  const [allMessages, setAllMessages] = useState<
    (IThreadMessage | undefined)[]
  >([]);
  const [failedMessages, setFailedMessages] = useState<
    (IThreadMessage | undefined)[]
  >([]);
  const { colors } = useTheme();
  const [mail, setMail] = useState("");
  const { userDetails } = useUserDetails();
  const { failedMessagesData, setFailedMessagesData } = useFailedMessages();
  const onChangeMailContent = ({ value }: { value: string }) => setMail(value);
  const [refetchData, setRefetchData] = useState(false);
  const [lastMessageData, setLastMessageData] = useState<IThreadMessage>();
  const { data, isError, hasNextPage, fetchNextPage } = useFetchThreadMessages({
    id,
    refetchData,
  });
  const [isUploadingAttachment, setIsUploadingAttachment] =
    useState<boolean>(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [attachmentsLocalURI, setAttachmentsLocalURI] = useState<string[]>([]);
  const [messageToEdit, setIsEditingMessage] = useState<
    IThreadMessage | undefined
  >(undefined);
  const [replyToMessage, setReplyTo] = useState<IThreadMessage | undefined>(
    undefined
  );
  const [lastMessages, setLastMessages] = useState<string | undefined>(
    undefined
  );
  const [usernames, setUsernames] = useState<string | undefined>("");

  const [isSelectAllActivated, setIsSelectAllActivated] =
    useState<boolean>(false);

  const [selectedIndexes, setSelectedIndexes] = useState<
    Record<string, boolean>
  >({});

  const scrollViewRef = useRef<FlashList<IThreadMessage[]> | undefined>(null);
  const hasData = allMessages.length > 0;
  const firstMessage = allMessages[0];

  const firstMessageDate = hasData
    ? conversationDateTime(firstMessage?.createdAt ?? "")
    : "";

  let others = excludeUser({
    users: [
      threadInfo.lastHeader.formContact,
      ...threadInfo.lastHeader.toList,
      ...(threadInfo.lastHeader.ccList ?? []),
      ...(threadInfo.lastHeader.bccList ?? []),
    ],
    userAddress: `${userDetails.user_name}@${MAIL_DOMAIN}`,
  });
  others =
    others.length === 0 &&
    threadInfo?.lastHeader.formContact.address ===
      `${userDetails.user_name}@${MAIL_DOMAIN}`
      ? [
          {
            name: userDetails.user_name,
            address: `${userDetails.user_name}@${MAIL_DOMAIN}`,
          },
        ]
      : others;

  const loadNextPageData = async () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  // MARK: - Load thread messages from API
  useEffect(() => {
    if (typeof data === typeof undefined) return;
    if (failedMessagesData[id]) {
      setFailedMessages(failedMessagesData[id].reverse());
    }
    let flattenData =
      !!data?.pages && data?.pages?.[0] !== undefined
        ? data?.pages.flatMap((page) => page?.data)
        : [];
    setAllMessages(flattenData);
    setLastMessageData(flattenData[flattenData.length - 1]);
    scrollViewRef.current?.scrollToEnd();
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      setRefetchData(true);
      setReplyTo(undefined);
      return () => {
        setRefetchData(false);
        setReplyTo(undefined);
      };
    }, [])
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const formatEndPoints = (endPoint: IContact[]) =>
    endPoint
      ?.map((obj) => ({ address: obj?.address?.trim() }))
      .filter(
        ({ address }) => address !== `${userDetails.user_name}@${MAIL_DOMAIN}`
      );

  const createComposeRequest = (messageText: string): IComposeApiRequest => {
    const lastFromEndPoint = lastMessageData?.from?.address ?? "";
    const toEndPoints = formatEndPoints(lastMessageData?.to ?? [])?.filter(
      ({ address }) => address !== lastFromEndPoint
    );
    if (replyToMessage) {
      replyToMessage.to?.forEach((contact) => {
        toEndPoints?.push({ address: contact.address });
      });
    }
    if (lastFromEndPoint !== `${userDetails.user_name}@${MAIL_DOMAIN}`) {
      toEndPoints?.push({ address: lastFromEndPoint });
    }
    let composeRequest: IComposeApiRequest = {
      topicId: topicId,
      subject: subject,
      text: messageText,
      toList: toEndPoints,
      ccList: formatEndPoints(lastMessageData?.cc ?? []),
      bccList: formatEndPoints(lastHeader?.bccList ?? []),
      from: `${userDetails?.user_name}@${MAIL_DOMAIN}`,
      attachments: attachments,
    };
    if (messageToEdit) {
      composeRequest = { ...composeRequest, id: messageToEdit?.messageId };
    }
    if (replyToMessage) {
      composeRequest = { ...composeRequest, replyTo: replyToMessage?.headerId };
    }
    return composeRequest;
  };

  // MARK: - Send new message in chat/thread
  const onPressCompose = async () => {
    if (messageToEdit != undefined) {
      const allMessagesCopy = [...allMessages];
      let index = allMessagesCopy.findIndex((message) => {
        if (message?.messageId == messageToEdit.messageId) {
          return true;
        }
      });
      allMessagesCopy.splice(index, 1);
      const message = { ...messageToEdit };
      message.text = mail;
      allMessagesCopy.splice(index, 0, message);
      await setAllMessages(allMessagesCopy);
      setMail("");
      setIsEditingMessage(undefined);
      await editMessageApi(createComposeRequest(mail?.trim()));
      return;
    }
    try {
      if (!mail && !(attachments.length > 0)) return;
      if (
        isUploadingAttachment &&
        attachments.length != attachmentsLocalURI.length
      ) {
        return;
      }
      setMail("");
      setReplyTo(undefined);
      const allMessagesCopy = [...allMessages];
      const newMessage = {
        text: mail?.trim(),
        messageId: new Date().getTime().toString(),
        notConfirmedNewMessage: true,
      };
      allMessagesCopy.push(newMessage);
      setAllMessages(allMessagesCopy);
      const data = await composeApi(createComposeRequest(mail?.trim()));
      const newMessageIndex = allMessagesCopy.findIndex(
        (message) => message?.messageId === newMessage.messageId
      );
      if (data) {
        allMessagesCopy.splice(newMessageIndex, 1, {
          ...allMessagesCopy[newMessageIndex],
          notConfirmedNewMessage: false,
        });
        setAllMessages(allMessagesCopy);
        scrollViewRef.current?.scrollToEnd({ animated: false });
      } else {
        const allMessagesWithoutTheFailed = allMessagesCopy.filter(
          (item) => !item?.notConfirmedNewMessage
        );
        setAllMessages(allMessagesWithoutTheFailed);
        const failedMeessage = { ...newMessage, failedToSend: true };
        setFailedMessages(() => {
          const faildMessagesCopy = [...failedMessages];
          faildMessagesCopy.unshift(failedMeessage);
          return faildMessagesCopy;
        });
        const newFailedMEssagesObj = {
          ...failedMessagesData,
          [id]: [
            ...(failedMessagesData?.[id] ? failedMessagesData?.[id] : []),
            failedMeessage,
          ],
        };
        setFailedMessagesData && setFailedMessagesData(newFailedMEssagesObj);
      }
      scrollViewRef.current?.scrollToEnd();
      setAttachments([]);
      setAttachmentsLocalURI([]);
      setIsUploadingAttachment(false);
    } catch (error) {}
  };

  const moveFromFailedToSuccess = (messageTempId: string) => {
    const clickedFailedMessage = failedMessages.find(
      (message) => message?.messageId === messageTempId
    );
    const allFailedMessagesWithoutClicked = failedMessages.filter(
      (message) => message?.messageId !== messageTempId
    );
    setFailedMessages(allFailedMessagesWithoutClicked);
    const allsuccessMessagesCopy = [...allMessages];
    allsuccessMessagesCopy.unshift({
      ...clickedFailedMessage,
      failedToSend: false,
      notConfirmedNewMessage: true,
    });
    setAllMessages(allsuccessMessagesCopy);
    // remove data from the failed messages context
    const failedMessagesFromContext = failedMessagesData[id].filter(
      (message) => message.messageId !== messageTempId
    );
    // set the failed context with the new data
    setFailedMessagesData &&
      setFailedMessagesData({
        ...failedMessagesData,
        [id]: failedMessagesFromContext,
      });
  };

  // MARK:- add new attachments
  const onPressAttachments = async () => {
    setIsUploadingAttachment(true);
    let attachmentsToUpload: string[] =
      attachments.length > 0 ? attachments : [];
    let attachmentsToShow: string[] =
      attachmentsLocalURI.length > 0 ? attachmentsLocalURI : [];
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      orderedSelection: true,
      quality: 0,
    });
    if (result) {
      result.assets?.forEach(async (asset) => {
        attachmentsToShow.push(asset.uri);
      });
      await setAttachmentsLocalURI(attachmentsToShow);
      await result.assets?.forEach(async (asset) => {
        if (asset.fileSize && asset.fileSize > 25 * 1024 * 1024) {
          Alert.alert("Error", "Attachment size is bigger than 25 MB!!!");
        } else {
          let link = await getUploadLinkApi({ filename: asset.fileName ?? "" });
          const mimeType = mime.getType(asset.fileName ?? ""); // => 'application/pdf'
          const base64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const buffer = Buffer.from(base64 ?? "", "base64");
          let res = await fetch(link.link, {
            method: "PUT",
            body: buffer,
            headers: {
              "Content-Type": `${mimeType}`,
            },
          });
          if (res.status == 200) {
            let createAttachmentReq: ICreateAttachmentRequest = {
              url: link.link,
              title: asset.fileName ?? "",
              type: mimeType ?? "",
              size: asset.fileSize ?? 0,
            };
            let createRes = await createAttachment(createAttachmentReq);
            attachmentsToUpload.push(createRes.id ?? "");
          }
        }
      });
    }
    setAttachments(attachmentsToUpload);
  };

  const onPressReplyToMessage = (threadMessage: IThreadMessage) => {
    setReplyTo(threadMessage);
  };

  const onUnSendPress = useCallback(
    async (threadMessage: IThreadMessage) => {
      const newMessages = JSON.parse(JSON.stringify(allMessages));

      newMessages[threadMessage.index].isDeleted = true;

      setAllMessages([...newMessages]);
      await unSendMessagesApi({ ids: [threadMessage.messageId ?? ""] });
    },
    [allMessages]
  );

  const onDeletePress = useCallback(
    async (threadMessage: IThreadMessage) => {
      let newMessages = allMessages
        .slice()
        .filter((message, i) => message?.messageId !== threadMessage.messageId);

      setAllMessages(newMessages);
      await deleteMessagesApi({ ids: [threadMessage.messageId ?? ""] });
    },
    [allMessages]
  );

  const onCopy = (threadMessage: IThreadMessage) => {
    setStringAsync(threadMessage.text);
  };

  const onBookMarkPress = useCallback(
    async (threadMessage: IThreadMessage) => {
      const newMessages = JSON.parse(JSON.stringify(allMessages));

      newMessages[threadMessage.index].isBookMarked = true;

      setAllMessages([...newMessages]);
      // await deleteMessagesApi({ ids: [threadMessage.messageId ?? ""] });
    },
    [allMessages]
  );

  const onUnBookMarkedPress = useCallback(
    async (threadMessage: IThreadMessage) => {
      const newMessages = JSON.parse(JSON.stringify(allMessages));

      newMessages[threadMessage.index].isBookMarked = false;

      setAllMessages([...newMessages]);
      // await deleteMessagesApi({ ids: [threadMessage.messageId ?? ""] });
    },
    [allMessages]
  );

  const onSelectAllActivatedPress = (item: IThreadMessage) => {
    setIsSelectAllActivated(true);
    setSelectedIndexes({ [item?.index]: true });
  };

  const senderMenu = (item: IThreadMessage) =>
    !isTimelimitExceeded(item.createdAt ?? "")
      ? [
          {
            text: "unsend",
            onPress: onUnSendPress,
            iconName: "unsend",
          },
          {
            text: "edit",
            onPress: async (threadMessage: IThreadMessage) => {
              setIsEditingMessage(threadMessage);
              setMail(threadMessage.text);
            },
            iconName: "edit",
          },
          {
            text: "copy",
            onPress: onCopy,
            iconName: "copy",
          },
          {
            text: "reply",
            onPress: onPressReplyToMessage,
            iconName: "reply",
          },
          {
            text: "delete",
            onPress: onDeletePress,
            iconName: "delete",
          },
          {
            text: "bookmark",
            onPress: onBookMarkPress,
            iconName: "bookmark",
          },
          {
            text: "selectmore",
            onPress: onSelectAllActivatedPress,
            iconName: "selectmore",
          },
        ]
      : [
          {
            text: "reply",
            onPress: onPressReplyToMessage,
            iconName: "reply",
          },
        ];

  const receiverMenu = [
    {
      text: "reply",
      onPress: onPressReplyToMessage,
      iconName: "reply",
    },
  ];

  const onContentSizeChange = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const onNavigateToRepliedMessage = (item: IThreadMessage) => {
    const repliedMessageIndex = allMessages.findIndex(
      (message) => message?.headerId === item?.replyTo?.id
    );

    scrollViewRef?.current?.scrollToIndex({
      animated: true,
      index: repliedMessageIndex,
    });
  };

  const renderMessageItem = ({
    item,
    index,
  }: {
    item: IThreadMessage;
    index: number;
  }) => (
    <Pressable
      style={{ marginVertical: 7 }}
      onLongPress={(e) => Keyboard.dismiss()}
    >
      {item?.failedToSend ? (
        <FailedMessage
          item={item}
          createComposeRequest={createComposeRequest}
          moveFromFailedToSuccess={moveFromFailedToSuccess}
        />
      ) : (
        (item.text || (item.attachments && item.attachments.length > 0)) && (
          <Message
            key={item.messageId}
            item={item}
            senderMenu={senderMenu}
            receiverMenu={receiverMenu}
            index={index}
            isReplying={replyToMessage?.index === index}
            onUnBookMarkedPress={onUnBookMarkedPress}
            isSelectAllActivated={isSelectAllActivated}
            isSelected={selectedIndexes[index]}
            onSelectPress={onSelectPress}
            replyToMessageContent={
              item?.replyTo
                ? allMessages.find(
                    (message) => message?.headerId === item?.replyTo?.id
                  )
                : undefined
            }
            onNavigateToRepliedMessage={onNavigateToRepliedMessage}
          />
        )
      )}
    </Pressable>
  );

  if (!hasData || isError) {
    return (
      <LoadingScreen
        loadingText={isError ? "Something Wrong" : "Loading"}
        loadingIndecatorSize={20}
      />
    );
  }

  const keyExtractor = (item: IThreadMessage, index: number) =>
    `message-${item?.messageId}`;
  const endReached = async () => {
    await loadNextPageData();
  };
  const renderChat = () => {
    return (
      <View style={styles.chatWrapper}>
        {hasData && (
          <View style={{ flex: 1 }}>
            <View style={{ minHeight: 2, minWidth: 2, flex: 1 }}>
              <FlashList
                ref={scrollViewRef}
                data={[...failedMessages, ...allMessages]}
                renderItem={renderMessageItem}
                keyExtractor={keyExtractor}
                onEndReachedThreshold={0.5}
                scrollIndicatorInsets={{ right: 1 }}
                onEndReached={endReached}
                indicatorStyle="white"
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{ paddingHorizontal: 5 }}
                estimatedItemSize={60}
                overrideItemLayout={(_, data, index) => ({
                  length: 150,
                  offset: 150 * index,
                  index,
                })}
                keyboardShouldPersistTaps="handled"
                removeClippedSubviews={true}
                onContentSizeChange={() => {
                  scrollViewRef.current?.scrollToEnd({ animated: false });
                }}
              />
            </View>
            <View style={{ height: 35 }} />
          </View>
        )}
        {attachmentsLocalURI.length > 0 && (
          <>
            <ScrollView
              horizontal
              style={{ maxHeight: 95, marginBottom: 60 }}
              showsHorizontalScrollIndicator
              scrollIndicatorInsets={{ bottom: 1 }}
            >
              <View style={{ height: 90, flexDirection: "row" }}>
                {attachmentsLocalURI.map((att, index) => {
                  return (
                    <Pressable
                      key={`attachment-${att}`}
                      onPress={() => {
                        var currentToCompare = attachmentsLocalURI.slice();
                        currentToCompare.splice(index, 1);
                        setAttachmentsLocalURI(currentToCompare);
                        var newAttachments = attachments.slice();
                        newAttachments.splice(index, 1);
                        setAttachments(newAttachments);
                      }}
                      style={{ justifyContent: "center" }}
                    >
                      <Image
                        key={makeid(index)}
                        source={{ uri: att }}
                        style={{
                          width: 80,
                          height: 80,
                          margin: 5,
                          borderRadius: 5,
                        }}
                      />
                      {attachments.length < attachmentsLocalURI.length && (
                        <ActivityIndicator
                          size="small"
                          color={colors.white}
                          style={{
                            position: "absolute",
                            alignSelf: "center",
                          }}
                        />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          </>
        )}
        {replyToMessage !== undefined && (
          <ReplyToMessage
            item={replyToMessage}
            onReplyToPress={onReplyToPress}
            onCancelPress={onCancelPress}
          />
        )}
      </View>
    );
  };
  const onReplyToPress = (index: number) => {
    scrollViewRef?.current?.scrollToIndex({
      animated: true,
      index,
    });
  };

  const onCancelPress = () => {
    setReplyTo(undefined);
  };
  const onSelectAllCancelPress = () => {
    setIsSelectAllActivated(false);
    setSelectedIndexes({});
  };
  const onSelectAllPress = () => {
    const obj = Object.fromEntries(
      Array.from({ length: allMessages.length }, (_, i) => [i, true])
    );

    setSelectedIndexes(obj);
  };
  const onSelectPress = (index: number) => {
    setSelectedIndexes((prevSelectedIndexes) => ({
      ...prevSelectedIndexes,
      [index]: !prevSelectedIndexes[index],
    }));
  };

  const onSelectAllDeletePress = async () => {
    const deletedMessageIds: string[] = [];
    const unDeletedMessage = allMessages.slice().filter((message, i) => {
      if (selectedIndexes[i] === undefined || selectedIndexes[i] === false) {
        return true;
      } else {
        deletedMessageIds.push(message?.messageId);
      }
    });

    setAllMessages(unDeletedMessage);

    await deleteMessagesApi({
      ids: deletedMessageIds,
    });

    onSelectAllCancelPress();
  };

  const onSelectAllBookMarkPress = () => {
    onSelectAllCancelPress();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 35 : 100}
      style={{ flex: 1, backgroundColor: colors.black }}
    >
      <View style={styles.container}>
        <SelectAllWrapper
          isSelectAllActivated={isSelectAllActivated}
          onSelectAllCancelPress={onSelectAllCancelPress}
          onSelectAllPress={onSelectAllPress}
          onSelectAllDeletePress={onSelectAllDeletePress}
          onSelectAllBookMarkPress={onSelectAllBookMarkPress}
        >
          {hasData && (
            <ThreadDetailsHeader
              receiver={getThreadParticipantsUserName(others)}
              subject={subject}
              firtMessageDate={firstMessageDate}
              navigation={navigation}
            />
          )}

          {renderChat()}

          <MailSender
            text={mail}
            onChangeMailContent={onChangeMailContent}
            onPressCompose={onPressCompose}
            onPressAttachments={onPressAttachments}
            tempAttachments={attachments}
            isEditingMessage={!!messageToEdit}
          />
        </SelectAllWrapper>
      </View>
    </KeyboardAvoidingView>
  );
};
export default ThreadDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 20 : 0,
    position: "relative",
  },
  titleText: {
    height: 25,
  },
  chatWrapper: {
    flex: 1,
    marginBottom: 60,
  },
  emptyOrErrorMessageContainer: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    backgroundColor: "black",
    paddingTop: 50,
  },
});
