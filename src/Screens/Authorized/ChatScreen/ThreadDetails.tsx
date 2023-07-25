import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  Image,
  Pressable,
  Keyboard,
  TextInput,
} from 'react-native';
import useTheme from '@followBack/Hooks/useTheme';
import { useFetchThreadMessages } from '@followBack/Hooks/Apis/ThreadMessages';
import Message from '@followBack/Elements/Message/Message';
import MailSender from '@followBack/Elements/MailSender/MailSender';
import ThreadDetailsHeader from '@followBack/Elements/Headers/Authorized/ThreadDetailsHeader/threadDetailsHeader.index';
import { excludeUser, makeid } from '@followBack/Utils/messages';
import { useUserDetails } from '@followBack/Hooks/useUserDetails';
import { getThreadParticipantsUserName } from '@followBack/Utils/stringUtils';
import {
  conversationDateTime,
  isTimelimitExceeded,
} from '@followBack/Utils/date';
import { useFocusEffect } from '@react-navigation/native';
import { IComposeApiRequest } from '@followBack/Apis/Compose/types';
import LoadingScreen from '@followBack/Elements/LoadingScreen/LoadingScreen.index';
import { FlashList } from '@shopify/flash-list';
import { useFailedMessages } from '@followBack/Hooks/useFailedMessages';
import FailedMessage from '@followBack/Elements/FailedMessage/FailedMessage.index';
import { composeApi, editMessageApi } from '@followBack/Apis/Compose';
import { IThreadMessage } from '@followBack/Apis/ThreadMessages/types';
import { IContact } from '@followBack/Apis/ContactsList/types';
import * as ImagePicker from 'expo-image-picker';
import {
  createAttachment,
  getUploadLinkApi,
} from '@followBack/Apis/GetAttachmentUploadLink';
import { ScrollView } from 'react-native-gesture-handler';
import * as mime from 'mime';
import { ICreateAttachmentRequest } from '@followBack/Apis/GetAttachmentUploadLink/types';
import { emailNameParcer } from '@followBack/Utils/email';
import Typography from '@followBack/GenericElements/Typography';
import { Thread } from '@followBack/Apis/threadsList/type';
import { deleteMessagesApi } from '@followBack/Apis/ThreadMessages';
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import _ from 'lodash';

const ThreadDetails: React.FC = ({ navigation, route }) => {
  const { threadInfo } = route.params;
  const { threadId: id, topicId, subject, lastHeader } = threadInfo as Thread;
  const params = route.params;
  const [allMessages, setAllMessages] = useState<IThreadMessage[]>([]);
  const [failedMessages, setFailedMessages] = useState([]);
  const { colors } = useTheme();
  const [mail, setMail] = useState('');
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

  const scrollViewRef = useRef<ScrollView | null>(null);
  const hasData = allMessages?.length > 0;
  const firstMessage = allMessages?.[0];
  const sender = lastMessageData?.from ?? {
    name: userDetails.user_name,
    address: `${userDetails.user_name}@iinboxx.com`,
  };
  const initiator = data?.pages?.[0]?.initiator;
  const composeTo = params.to ?? [];
  const composeCc = params.cc ?? [];
  const composeBcc = params.bcc ?? [];
  const to = lastMessageData?.to ?? composeTo;
  const cc = lastMessageData?.cc ?? composeCc;
  const bcc = lastHeader?.bccList ?? composeBcc;

  let others = hasData
    ? excludeUser({
        users: [sender, ...to, ...cc, ...bcc],
        userAddress: `${userDetails.user_name}@iinboxx.com`,
      })
    : [];
  others =
    others.length === 0 &&
    sender.address === `${userDetails.user_name}@iinboxx.com`
      ? [sender]
      : others;

  const receiver = hasData
    ? getThreadParticipantsUserName(others, initiator)
    : '';
  const firstMessageDate = hasData
    ? conversationDateTime(firstMessage.createdAt ?? '')
    : '';

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
    flattenData = flattenData.sort(function (a, b) {
      var dateA = new Date(a?.createdAt || '');
      var dateB = new Date(b?.createdAt || '');
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });
    setAllMessages(flattenData);
    setLastMessageData(flattenData[0]);
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
      'keyboardDidShow',
      () => {
        scrollViewRef.current?.scrollToEnd();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        scrollViewRef.current?.scrollToEnd();
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
        ({ address }) => address !== `${userDetails.user_name}@iinboxx.com`
      );

  const createComposeRequest = (messageText: string): IComposeApiRequest => {
    const lastFromEndPoint = lastMessageData?.from?.address ?? '';
    console.log('LM data: ---->', lastMessageData);
    const toEndPoints = formatEndPoints(lastMessageData?.to ?? [])?.filter(
      ({ address }) => address !== lastFromEndPoint
    );
    if (replyToMessage) {
      replyToMessage.to?.forEach((contact) => {
        toEndPoints?.push({ address: contact.address });
      });
    }
    if (lastFromEndPoint !== `${userDetails.user_name}@iinboxx.com`) {
      toEndPoints?.push({ address: lastFromEndPoint });
    }
    let composeRequest: IComposeApiRequest = {
      topicId: topicId,
      subject: subject,
      text: messageText,
      toList: toEndPoints,
      ccList: formatEndPoints(lastMessageData?.cc ?? []),
      bccList: formatEndPoints(lastHeader?.bccList ?? []),
      from: `${userDetails?.user_name}@iinboxx.com`,
      attachments: attachments,
    };
    if (messageToEdit) {
      composeRequest = { ...composeRequest, id: messageToEdit?.messageId };
    }
    if (replyToMessage) {
      composeRequest = { ...composeRequest, replyTo: replyToMessage?.headerId };
    }
    console.log('Compose request' + JSON.stringify(composeRequest));
    return composeRequest;
  };

  // MARK: - Send new message in chat/thread
  const onPressCompose = async () => {
    console.log(mail);
    if (messageToEdit != undefined) {
      const allMessagesCopy = [...allMessages];
      let index = allMessagesCopy.findIndex((message) => {
        if (message.messageId == messageToEdit.messageId) {
          return true;
        }
      });
      allMessagesCopy.splice(index, 1);
      const message = { ...messageToEdit };
      message.text = mail;
      allMessagesCopy.splice(index, 0, message);
      await setAllMessages(allMessagesCopy);
      setMail('');
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
      setMail('');
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
        (message) => message.messageId === newMessage.messageId
      );
      if (data) {
        allMessagesCopy.splice(newMessageIndex, 1, {
          ...allMessagesCopy[newMessageIndex],
          notConfirmedNewMessage: false,
        });
        setAllMessages(allMessagesCopy);
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
    } catch (error) {
      console.log('error', error);
    }
  };

  const moveFromFailedToSuccess = (messageTempId) => {
    const clickedFailedMessage = failedMessages.find(
      (message) => message.messageId === messageTempId
    );
    const allFailedMessagesWithoutClicked = failedMessages.filter(
      (message) => message.messageId !== messageTempId
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
    });
    if (result) {
      result.assets?.forEach(async (asset) => {
        attachmentsToShow.push(asset.uri);
      });
      await setAttachmentsLocalURI(attachmentsToShow);
      await result.assets?.forEach(async (asset) => {
        if (asset.fileSize && asset.fileSize > 25 * 1024 * 1024) {
          Alert.alert('Error', 'Attachment size is bigger than 25 MB!!!');
        } else {
          let link = await getUploadLinkApi({ filename: asset.fileName ?? '' });
          const mimeType = mime.getType(asset.fileName ?? ''); // => 'application/pdf'
          const base64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const buffer = Buffer.from(base64 ?? '', 'base64');
          let res = await fetch(link.link, {
            method: 'PUT',
            body: buffer,
            headers: {
              'Content-Type': `${mimeType}`,
            },
          });
          console.log(JSON.stringify(res));
          if (res.status == 200) {
            let createAttachmentReq: ICreateAttachmentRequest = {
              url: link.link,
              title: asset.fileName ?? '',
              type: mimeType ?? '',
              size: asset.fileSize ?? 0,
            };
            let createRes = await createAttachment(createAttachmentReq);
            console.log('Create attachment response: ', createRes);
            attachmentsToUpload.push(createRes.id ?? '');
          }
        }
      });
    }
    setAttachments(attachmentsToUpload);
  };

  const unsendForMe = async (threadMessage: IThreadMessage) => {
    console.log(JSON.stringify(threadMessage));
    let newMessages = allMessages
      .slice()
      .filter((message, i) => message.messageId !== threadMessage.messageId);
    setAllMessages(newMessages);
    await deleteMessagesApi({ ids: [threadMessage.messageId ?? ''] }, false);
  };

  const onPressReplyToMessage = (threadMessage: IThreadMessage) => {
    setReplyTo(threadMessage);
  };

  const unsendForAll = useCallback(async (threadMessage: IThreadMessage) => {
    console.log(JSON.stringify(threadMessage));
    let newMessages = allMessages
      .slice()
      .filter((message, i) => message.messageId !== threadMessage.messageId);
    setAllMessages(newMessages);
    await deleteMessagesApi({ ids: [threadMessage.messageId ?? ''] }, true);
  }, []);

  const senderMenu = (messageDate: string) =>
    !isTimelimitExceeded(messageDate)
      ? [
          {
            text: 'Unsend for all',
            onPress: unsendForAll,
          },
          {
            text: 'Edit',
            onPress: async (threadMessage: IThreadMessage) => {
              setIsEditingMessage(threadMessage);
              setMail(threadMessage.text);
            },
          },
          {
            text: 'Reply',
            onPress: onPressReplyToMessage,
          },
          {
            text: 'Unsend for me',
            onPress: unsendForMe,
          },
        ]
      : [
          {
            text: 'Reply',
            onPress: onPressReplyToMessage,
          },
          {
            text: 'Unsend for me',
            onPress: unsendForMe,
          },
        ];

  const receiverMenu = [
    {
      text: 'Reply',
      onPress: onPressReplyToMessage,
    },
  ];

  const renderMessageItem = useCallback(
    ({ item }: { item: IThreadMessage }) => (
      <View style={{ marginVertical: 8 }}>
        {item?.failedToSend ? (
          <FailedMessage
            item={item}
            createComposeRequest={createComposeRequest}
            moveFromFailedToSuccess={moveFromFailedToSuccess}
          />
        ) : (
          (item.text || (item.attachments && item.attachments.length > 0)) && (
            <Message
              item={item}
              senderMenu={senderMenu}
              receiverMenu={receiverMenu}
            />
          )
        )}
      </View>
    ),
    [senderMenu, receiverMenu]
  );

  if (!hasData || isError) {
    return (
      <LoadingScreen
        loadingText={isError ? 'Something Wrong' : 'Loading'}
        loadingIndecatorSize={20}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 35 : 100}
      style={{ flex: 1, backgroundColor: colors.black }}
    >
      <View style={styles.container}>
        {hasData && (
          <ThreadDetailsHeader
            receiver={receiver}
            subject={subject}
            firtMessageDate={firstMessageDate}
            navigation={navigation}
          />
        )}

        <View style={styles.chatWrapper}>
          {hasData && (
            <>
              <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={true}
                indicatorStyle='white'
                style={{ minHeight: 2, minWidth: 2 }}
              >
                <View style={{ minHeight: 2, minWidth: 2 }}>
                  <FlashList
                    data={[...failedMessages, ...allMessages]}
                    renderItem={renderMessageItem}
                    keyExtractor={(item, _) => `message-${item?.messageId}`}
                    onEndReachedThreshold={0.2}
                    estimatedItemSize={100}
                    scrollIndicatorInsets={{ right: 1 }}
                    inverted={false}
                    onEndReached={async () => {
                      await loadNextPageData();
                    }}
                    indicatorStyle='white'
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={{ padding: 0 }}
                  />
                </View>
                <View style={{ height: 20 }} />
              </ScrollView>
            </>
          )}
        </View>
        {attachmentsLocalURI.length > 0 && (
          <>
            <ScrollView
              horizontal
              style={{ maxHeight: 95, marginBottom: 60 }}
              showsHorizontalScrollIndicator
              scrollIndicatorInsets={{ bottom: 1 }}
            >
              <View style={{ height: 90, flexDirection: 'row' }}>
                {attachmentsLocalURI.map((att, index) => {
                  return (
                    <Pressable
                      key={`attachment-${index}`}
                      onPress={() => {
                        var currentToCompare = attachmentsLocalURI.slice();
                        currentToCompare.splice(index, 1);
                        setAttachmentsLocalURI(currentToCompare);
                        var newAttachments = attachments.slice();
                        newAttachments.splice(index, 1);
                        setAttachments(newAttachments);
                      }}
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
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          </>
        )}
        {replyToMessage !== undefined && (
          <View style={{ height: 80 }}>
            <Typography type='largeBoldBody' color='chat'>
              {'Replying to: ' + replyToMessage.text.trimEnd()}
            </Typography>
          </View>
        )}
        <MailSender
          text={mail}
          onChangeMailContent={onChangeMailContent}
          onPressCompose={onPressCompose}
          onPressAttachments={onPressAttachments}
          tempAttachments={attachments}
          isFocus={true}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
export default ThreadDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  titleText: {
    height: 25,
  },
  chatWrapper: {
    flex: 1,
    marginBottom: 30,
  },
  emptyOrErrorMessageContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    backgroundColor: 'black',
    paddingTop: 50,
  },
});
