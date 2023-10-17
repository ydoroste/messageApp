import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  InteractionManager,
  FlatList,
} from "react-native";

import { setStringAsync } from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";
import useTheme from "@followBack/Hooks/useTheme";
import { useFetchThreadMessages } from "@followBack/Hooks/Apis/ThreadMessages";
import Message from "@followBack/Elements/Message/Message";
import MailSender from "@followBack/Elements/MailSender/MailSender";
import ThreadDetailsHeader from "@followBack/Elements/Headers/Authorized/ThreadDetailsHeader/threadDetailsHeader.index";
import { excludeUser } from "@followBack/Utils/messages";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import {
  getFileDetails,
  getThreadParticipantsUserName,
} from "@followBack/Utils/stringUtils";
import {
  conversationDateTime,
  isTimelimitExceeded,
} from "@followBack/Utils/date";
import { IComposeApiRequest } from "@followBack/Apis/Compose/types";
import LoadingScreen from "@followBack/Elements/LoadingScreen/LoadingScreen.index";
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
import * as mime from "mime";
import { ICreateAttachmentRequest } from "@followBack/Apis/GetAttachmentUploadLink/types";
import { Thread } from "@followBack/Apis/threadsList/type";
import {
  deleteMessagesApi,
  unSendMessagesApi,
} from "@followBack/Apis/ThreadMessages";
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system";
import { MAIL_DOMAIN } from "@followBack/Apis/constants";
import ReplyToMessage from "@followBack/Elements/ReplyToMessage/ReplyToMessage";
import SelectAllWrapper from "@followBack/Elements/SelectAllWrapper/SelectAllWrapper";
import { BlurView } from "expo-blur";
import OriginalEmailViewContainerWrapper from "@followBack/Elements/OriginalEmailViewContainer/OriginalEmailViewContainer";
import BottomSheetUpload from "@followBack/Elements/BottomSheetUpload/BottomSheetUpload";
import AttachmentsPreview from "@followBack/Elements/AttachmentsPreview/AttachmentsPreview";
import CachingLayer from "@followBack/Classes/CachingLayer";

const ThreadDetails: React.FC = ({ navigation, route }) => {
  const { threadInfo } = route.params;

  const {
    threadId: id,
    topicId,
    subject,
    lastHeader,
    favicon,
  } = threadInfo as Thread;
  const [allMessages, setAllMessages] = useState<
    (IThreadMessage | undefined)[]
  >(() => {
    return CachingLayer.messages[id] ?? [];
  });

  const [failedMessages, setFailedMessages] = useState<
    (IThreadMessage | undefined)[]
  >([]);
  const { colors } = useTheme();
  const [mail, setMail] = useState("");
  const { userDetails } = useUserDetails();
  const { failedMessagesData, setFailedMessagesData } = useFailedMessages();
  const onChangeMailContent = ({ value }: { value: string }) => setMail(value);
  const [lastMessageData, setLastMessageData] = useState<IThreadMessage>();
  const { data, isError, hasNextPage, fetchNextPage } = useFetchThreadMessages({
    id,
    refetchData: true,
  });
  const [isUploadingAttachment, setIsUploadingAttachment] =
    useState<boolean>(false);
  const [attachmentsLocalURI, setAttachmentsLocalURI] = useState<any[]>([]);
  const [originalHtml, setOriginalHtml] = useState("");
  const [messageToEdit, setIsEditingMessage] = useState<
    IThreadMessage | undefined
  >(undefined);
  const [replyToMessage, setReplyTo] = useState<IThreadMessage | undefined>(
    undefined
  );

  const [isSelectAllActivated, setIsSelectAllActivated] =
    useState<boolean>(false);

  const [selectedMessageIds, setSelectedMessageIds] = useState<
    Record<string, boolean>
  >({});
  const [renderCount, setRenderCount] = useState(10);
  const [isBottomSheetActivated, setIsBottomSheetActivated] =
    useState<boolean>(false);

  const scrollViewRef = useRef<FlatList<any> | null>(null);
  const hasData = allMessages.length > 0;

  const firstMessage = allMessages[0];
  const isFirstTimeRender = useRef(true);

  const firstMessageDate = hasData
    ? conversationDateTime(firstMessage?.createdAt ?? "")
    : "";
  const getOthers = useCallback(() => {
    let others = excludeUser({
      users: [
        lastHeader.formContact,
        ...lastHeader.toList,
        ...(lastHeader.ccList ?? []),
        ...(lastHeader.bccList ?? []),
      ],
      userAddress: `${userDetails.user_name}@${MAIL_DOMAIN}`,
    });
    others =
      others.length === 0 &&
      lastHeader.formContact.address ===
        `${userDetails.user_name}@${MAIL_DOMAIN}`
        ? [
            {
              name: userDetails.user_name,
              address: `${userDetails.user_name}@${MAIL_DOMAIN}`,
            },
          ]
        : others;

    const isAllFromUnSend = others.every((other) =>
      /@unsend\.app$/.test(other.address)
    );
    return {
      others,
      isAllFromUnSend,
    };
  }, []);
  const others = useRef(getOthers()).current;

  const loadNextPageData = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

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
    setLastMessageData(flattenData[flattenData.length - 1]);
    const newMessages = [...flattenData].reverse();

    CachingLayer.saveMessagesToDir(id, newMessages);

    setAllMessages(newMessages);
  }, [data]);

  useEffect(() => {
    if (attachmentsLocalURI.length === 0) {
      setIsUploadingAttachment(false);
    }
  }, [attachmentsLocalURI.length]);

  const isEditingMessage = !!messageToEdit;

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
      attachments: [],
    };
    if (messageToEdit) {
      composeRequest = { ...composeRequest, id: messageToEdit?.messageId };
    }
    if (replyToMessage) {
      composeRequest = { ...composeRequest, replyTo: replyToMessage?.headerId };
    }
    return composeRequest;
  };

  const getAttachmentsIds = async () => {
    const ids = [];
    for (const asset of attachmentsLocalURI) {
      if (asset?.fileSize > 25 * 1024 * 1024) {
        Alert.alert("Error", "Attachment size is bigger than 25 MB!!!");
      } else {
        try {
          const attachmentId = await uploadProcess(asset);
          ids.push(attachmentId ?? "");
        } catch (error) {}
      }
    }

    return ids;
  };

  const onMessageSentSuccessfully = (
    allMessagesCopy: IThreadMessage[],
    newMessage: IThreadMessage
  ) => {
    const newMessageIndex = allMessagesCopy.findIndex(
      (message) => message?.messageId === newMessage.messageId
    );

    allMessagesCopy.splice(newMessageIndex, 1, {
      ...allMessagesCopy[newMessageIndex],
      notConfirmedNewMessage: false,
    });
    setAllMessages(allMessagesCopy);
  };

  const onMessageFailed = (
    allMessagesCopy: IThreadMessage[],
    newMessage: IThreadMessage
  ) => {
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
  };

  // MARK: - Send new message in chat/thread
  const onPressCompose = async () => {
    if (messageToEdit != undefined) {
      const allMessagesCopy = [];

      for (const message of allMessages) {
        if (message?.messageId !== messageToEdit.messageId) {
          allMessagesCopy.push(message);
        } else {
          allMessagesCopy.push({ ...message, text: mail });
        }
      }

      setAllMessages(allMessagesCopy);
      setMail("");
      setIsEditingMessage(undefined);
      await editMessageApi(createComposeRequest(mail?.trim()));
      scrollToIndex(0);
      return;
    }
    try {
      const newMessage = {
        text: mail?.trim(),
        messageId: new Date().getTime().toString(),
        notConfirmedNewMessage: true,
        ...(replyToMessage?.headerId
          ? { replyTo: { id: replyToMessage?.headerId } }
          : {}),
        attachments: attachmentsLocalURI,
      };

      let allMessagesCopy = [newMessage, ...allMessages];

      InteractionManager.runAfterInteractions(async () => {
        const request = createComposeRequest(mail?.trim());

        const attachmentsIds = await getAttachmentsIds();

        request.attachments = attachmentsIds;

        const data = await composeApi(request);
        if (data) {
          onMessageSentSuccessfully(
            allMessagesCopy as IThreadMessage[],
            newMessage as unknown as IThreadMessage
          );
        } else {
          onMessageFailed(
            allMessagesCopy as IThreadMessage[],
            newMessage as unknown as IThreadMessage
          );
        }
        scrollToIndex(0);
      });

      setMail("");
      setReplyTo(undefined);
      setAllMessages(allMessagesCopy as IThreadMessage[]);
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

  const uploadProcess = async (asset: any) => {
    try {
      let link = await getUploadLinkApi({
        filename: asset.fileName ?? "", //TODO::
      });
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
        return createRes.id;
      }

      return Promise.reject("error");
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const getTempFileName = (asset) => {
    const date = new Date();
    const fileExtension = getFileDetails(
      asset.fileName ?? asset.uri
    ).fileExtension;

    const tempTitle =
      Math.floor(date.getTime() + date.getSeconds() / 2) + "." + fileExtension;

    return tempTitle;
  };

  // MARK:- add new attachments
  const handleUploadImages = async () => {
    setIsUploadingAttachment(true);
    let attachmentsToShow: any[] = [];

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      orderedSelection: true,
    });
    if (result?.assets) {
      for (const asset of result.assets) {
        const tempTitle = getTempFileName(asset);

        attachmentsToShow.push({
          ...asset,
          url: asset.uri,
          title: asset.fileName ?? tempTitle,
          ...(asset?.fileName
            ? { fileName: asset?.fileName }
            : { fileName: tempTitle }),
        });
      }

      setAttachmentsLocalURI(attachmentsToShow);
    }
  };

  // MARK:- add new attachments
  const handleUploadFiles = async () => {
    setIsUploadingAttachment(true);
    let attachmentsToShow: any[] = [];

    const result = await DocumentPicker.getDocumentAsync();

    const tempTitle = getTempFileName(result);

    if (result.type === "success") {
      attachmentsToShow.push({
        ...result,
        type: "file",
        title: result.name,
        url: result.uri,
        fileName: result.name ?? tempTitle,
      });

      setAttachmentsLocalURI(attachmentsToShow);
    }
  };

  const onPressReplyToMessage = (threadMessage: IThreadMessage) => {
    setReplyTo(threadMessage);
  };

  const onUnSendPress = useCallback(
    async (threadMessage: IThreadMessage) => {
      const newMessages = JSON.parse(JSON.stringify(allMessages));

      const index = newMessages.findIndex(
        (message: IThreadMessage) =>
          message?.messageId === threadMessage.messageId
      );

      newMessages[index].isDeleted = true;

      setAllMessages([...newMessages]);
      await unSendMessagesApi({ ids: [threadMessage.messageId ?? ""] });
    },
    [allMessages]
  );

  const onDeletePress = useCallback(
    async (threadMessage: IThreadMessage) => {
      let newMessages = allMessages.filter(
        (message, i) => message?.messageId !== threadMessage.messageId
      );

      setAllMessages(newMessages);
      await deleteMessagesApi({ ids: [threadMessage.messageId ?? ""] });
    },
    [allMessages]
  );

  const onCopy = useCallback((threadMessage: IThreadMessage) => {
    setStringAsync(threadMessage.text);
  }, []);

  const onBookMarkPress = useCallback(
    async (threadMessage: IThreadMessage) => {
      const newMessages = JSON.parse(JSON.stringify(allMessages));

      const index = newMessages.findIndex(
        (message: IThreadMessage) =>
          message?.messageId === threadMessage.messageId
      );

      newMessages[index].isBookMarked = true;

      setAllMessages([...newMessages]);
      // await deleteMessagesApi({ ids: [threadMessage.messageId ?? ""] });
    },
    [allMessages]
  );

  const onUnBookMarkedPress = useCallback(
    async (threadMessage: IThreadMessage) => {
      const newMessages = JSON.parse(JSON.stringify(allMessages));

      const index = newMessages.findIndex(
        (message: IThreadMessage) =>
          message?.messageId === threadMessage.messageId
      );

      newMessages[index].isBookMarked = false;

      setAllMessages([...newMessages]);
      // await deleteMessagesApi({ ids: [threadMessage.messageId ?? ""] });
    },
    [allMessages]
  );

  const onSelectAllActivatedPress = useCallback((item: IThreadMessage) => {
    setIsSelectAllActivated(true);
    setSelectedMessageIds({ [item?.messageId as string]: true });
  }, []);

  const commonMenu = useMemo(
    () => [
      {
        text: "copy",
        onPress: onCopy,
        iconName: "copy",
      },
      {
        text: "forward",
        onPress: () => {},
        iconName: "forward",
      },
      {
        text: "more",
        onPress: onSelectAllActivatedPress,
        iconName: "selectmore",
      },
    ],
    [onCopy, onSelectAllActivatedPress]
  );

  const onEditPress = useCallback((threadMessage: IThreadMessage) => {
    setIsEditingMessage(threadMessage);
    setMail(threadMessage.text);
  }, []);

  const senderMenu = useCallback(
    (item: IThreadMessage) =>
      !isTimelimitExceeded(item.createdAt ?? "")
        ? [
            {
              text: "unsend",
              onPress: onUnSendPress,
              iconName: "unsend",
            },
            {
              text: "edit",
              onPress: onEditPress,
              iconName: "edit",
            },
            ...commonMenu,
          ]
        : [...commonMenu],
    [onUnSendPress]
  );

  const receiverMenu = useMemo(() => [...commonMenu], [commonMenu]);

  const onNavigateToRepliedMessage = useCallback(
    (item: IThreadMessage) => {
      const repliedMessageIndex = allMessages.findIndex(
        (message) => message?.headerId === item?.replyTo?.id
      );

      scrollViewRef?.current?.scrollToIndex({
        animated: true,
        index: repliedMessageIndex,
      });
    },
    [allMessages, scrollViewRef?.current?.scrollToIndex]
  );

  const onCloseEdit = useCallback(() => {
    setMail("");
    setIsEditingMessage(undefined);
  }, []);

  const renderMessageItem = ({ item }: { item: IThreadMessage }) => {
    const isNotCurrentMessageEditing =
      !!isEditingMessage && messageToEdit?.messageId !== item.messageId;
    const isCurrentMessageEditing =
      !!isEditingMessage && messageToEdit?.messageId === item.messageId;
    const replyToMessageContent = item?.replyTo
      ? allMessages.find((message) => message?.headerId === item?.replyTo?.id)
      : undefined;

    const isReplying =
      item.messageId !== undefined &&
      replyToMessage?.messageId === item.messageId;

    return (
      <>
        {isNotCurrentMessageEditing && (
          <BlurView
            intensity={Platform.OS === "ios" ? 30 : 120}
            tint="dark"
            style={styles.editBlurring}
          />
        )}
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
              isReplying={isReplying}
              onUnBookMarkedPress={onUnBookMarkedPress}
              isSelectAllActivated={isSelectAllActivated}
              isSelected={selectedMessageIds[item.messageId as string]}
              onSelectPress={onSelectPress}
              onPressReplyToMessage={onPressReplyToMessage}
              replyToMessageContent={replyToMessageContent}
              isAllFromUnSend={others.isAllFromUnSend}
              onNavigateToRepliedMessage={onNavigateToRepliedMessage}
              isCurrentMessageEditing={isCurrentMessageEditing}
              onCloseEdit={onCloseEdit}
              onPressViewOriginalEmail={onPressViewOriginalEmail}
            />
          )
        )}
      </>
    );
  };

  const endReached = useCallback(() => {
    loadNextPageData();
  }, []);

  const scrollIndicatorInsets = useMemo(() => ({ right: 1 }), []);

  const keyExtractor = useCallback(
    (item: IThreadMessage, index: number) => `message-${item?.messageId}`,
    []
  );

  const onEndReached = () => {
    if (!isFirstTimeRender.current) {
      setRenderCount((prevCount) => prevCount + 10);
    }
  };

  const onMomentumScrollBegin = () => {
    if (isFirstTimeRender.current) {
      isFirstTimeRender.current = false;
      onEndReached();
    }
  };

  const renderChat = () => {
    return (
      <View style={styles.chatWrapper}>
        {hasData && (
          <FlatList
            data={[...failedMessages, ...allMessages].slice(0, renderCount)}
            renderItem={renderMessageItem}
            keyExtractor={keyExtractor}
            scrollIndicatorInsets={scrollIndicatorInsets}
            indicatorStyle="white"
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator
            contentContainerStyle={styles.contentContainerStyle}
            estimatedItemSize={60}
            initialNumToRender={10}
            onMomentumScrollBegin={onMomentumScrollBegin}
            keyboardShouldPersistTaps="handled"
            inverted
            onEndReached={onEndReached}
            ref={scrollViewRef}
          />
        )}
        <AttachmentsPreview
          attachments={attachmentsLocalURI}
          setAttachmentsLocalURI={setAttachmentsLocalURI}
        />

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

  const onReplyToPress = useCallback(
    (messageId: string) => {
      const index = allMessages.findIndex(
        (message: IThreadMessage) => message?.messageId === messageId
      );

      scrollToIndex(index);
    },
    [allMessages, scrollToIndex]
  );
  const scrollToIndex = useCallback((index: number) => {
    scrollViewRef?.current?.scrollToIndex({
      animated: true,
      index,
    });
  }, []);
  const onCancelPress = useCallback(() => {
    setReplyTo(undefined);
  }, []);
  const onSelectAllCancelPress = useCallback(() => {
    setIsSelectAllActivated(false);
    setSelectedMessageIds({});
  }, []);
  const onSelectAllPress = useCallback(() => {
    const obj = {};

    allMessages.forEach((message) => {
      obj[message?.messageId] = true;
    });

    setSelectedMessageIds(obj);
  }, [allMessages]);
  const onSelectPress = useCallback((messageId: string) => {
    setSelectedMessageIds((prevSelectedIndexes) => ({
      ...prevSelectedIndexes,
      [messageId]: !prevSelectedIndexes[messageId],
    }));
  }, []);
  const onSelectAllDeletePress = useCallback(async () => {
    const deletedMessageIds: string[] = [];
    const unDeletedMessage = allMessages.slice().filter((message) => {
      if (
        selectedMessageIds[message?.messageId] === undefined ||
        selectedMessageIds[message?.messageId] === false
      ) {
        return true;
      } else {
        deletedMessageIds.push(message?.messageId);
      }
    });

    setAllMessages(unDeletedMessage);
    onSelectAllCancelPress();

    await deleteMessagesApi({
      ids: deletedMessageIds,
    });
  }, [allMessages, selectedMessageIds]);
  const onSelectAllBookMarkPress = useCallback(() => {
    onSelectAllCancelPress();
  }, []);
  const onPressViewOriginalEmail = useCallback((html: string) => {
    setOriginalHtml(html);
  }, []);
  const onPressViewSummarizedEmail = useCallback(() => {
    setOriginalHtml("");
  }, []);

  const receiver = useMemo(
    () => getThreadParticipantsUserName(others.others),
    [others.others]
  );

  const toggleBottomSheet = useCallback(() => {
    setIsBottomSheetActivated((prev) => !prev);
  }, []);

  const onSheetActionPress = useCallback((cb: () => {}) => {
    return () => {
      toggleBottomSheet();
      cb();
    };
  }, []);

  const bottomSheetOptions = useMemo(
    () => [
      {
        text: "camera",
        onPress: onSheetActionPress(() => {}),
        iconName: "camera",
      },
      {
        text: "photo & video album",
        onPress: onSheetActionPress(handleUploadImages),
        iconName: "photo",
      },
      {
        text: "gif",
        onPress: onSheetActionPress(() => {}),
        iconName: "gif",
      },
      {
        text: "files",
        onPress: onSheetActionPress(handleUploadFiles),
        iconName: "files",
      },
      {
        text: "contact",
        onPress: onSheetActionPress(() => {}),
        iconName: "contact",
      },
      {
        text: "location",
        onPress: onSheetActionPress(() => {}),
        iconName: "location",
      },
      {
        text: "voice note",
        onPress: onSheetActionPress(() => {}),
        iconName: "voicenote",
      },
    ],
    [handleUploadImages]
  );

  const ThreadHeaderComponent = hasData && (
    <ThreadDetailsHeader
      receiver={receiver}
      subject={subject}
      firtMessageDate={firstMessageDate}
      navigation={navigation}
      favicon={favicon}
    />
  );
  const shouldShowMailSender = !isSelectAllActivated && !isBottomSheetActivated;

  if (hasData) {
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
            <OriginalEmailViewContainerWrapper
              onPressViewSummarizedEmail={onPressViewSummarizedEmail}
              html={originalHtml}
              Header={ThreadHeaderComponent as JSX.Element}
            >
              <BottomSheetUpload
                bottomSheetOptions={bottomSheetOptions}
                isBottomSheetActivated={isBottomSheetActivated}
                toggleBottomSheet={toggleBottomSheet}
              >
                {ThreadHeaderComponent}

                {renderChat()}

                {shouldShowMailSender && (
                  <MailSender
                    text={mail}
                    disabled={
                      isUploadingAttachment
                        ? attachmentsLocalURI.length === 0
                        : !mail.trim()
                    }
                    onChangeMailContent={onChangeMailContent}
                    onPressCompose={onPressCompose}
                    onPressAttachments={toggleBottomSheet}
                    isUploadingAttachment={attachmentsLocalURI.length !== 0}
                    isEditingMessage={isEditingMessage}
                  />
                )}
              </BottomSheetUpload>
            </OriginalEmailViewContainerWrapper>
          </SelectAllWrapper>
        </View>
      </KeyboardAvoidingView>
    );
  } else if (!hasData || isError) {
    return (
      <LoadingScreen
        loadingText={isError ? "Something Wrong" : "Loading"}
        loadingIndecatorSize={20}
      />
    );
  }

  return null;
};
export default ThreadDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 20 : 0,
    position: "relative",
  },
  contentContainerStyle: {
    paddingHorizontal: 5,
    flexGrow: 1,
    justifyContent: "flex-end",
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
  editBlurring: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
});
