import React, { useState, useEffect, useCallback } from "react";
import { View, KeyboardAvoidingView, Platform, StyleSheet, TouchableHighlight, Pressable, Keyboard, FlatList, TextInput } from "react-native";
import useTheme from "@followBack/Hooks/useTheme";
import { useFetchThreadMessages } from "@followBack/Hooks/Apis/ThreadMessages";
import Message from "@followBack/Elements/Message/Message";
import MailSender from "@followBack/Elements/MailSender/MailSender";
import ThreadDetailsHeader from "@followBack/Elements/Headers/Authorized/ThreadDetailsHeader/threadDetailsHeader.index";
import { excludeUser } from "@followBack/Utils/messages";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { getThreadParticipantsUserName } from "@followBack/Utils/stringUtils";
import { conversationDateTime } from "@followBack/Utils/date";
import { useFocusEffect } from "@react-navigation/native";
import { IComposeApiRequest } from "@followBack/Apis/Compose/types";
import { useCompose } from "@followBack/Hooks/Apis/Compose";
import { HoldItem } from "react-native-hold-menu";
import LoadingScreen from "@followBack/Elements/LoadingScreen/LoadingScreen.index";
import { FlashList } from "@shopify/flash-list";
import { useFailedMessages } from "@followBack/Hooks/useFailedMessages";
import FailedMessage from "@followBack/Elements/FailedMessage/FailedMessage.index";
import { getAccessToken } from "@followBack/Utils/accessToken";
import { composeApi } from "@followBack/Apis/Compose";
import { IThreadMessage } from "@followBack/Apis/ThreadMessages/types";

const ThreadDetails: React.FC = ({ navigation, options, route }) => {
  const { id, topicId, subject } = route.params;
  const params = route.params;
  const [allMessages, setAllMessages] = useState<IThreadMessage[]>([]);
  const [failedMessages, setFailedMessages] = useState([]);
  const { colors } = useTheme();

  const [mail, setMail] = useState("");
  // const { userDetails } = useUserDetails();
  const userDetails = {
    "id": "64aa89d22d70c06d0f2d04b4",
    "first_name": "First",
    "last_name": "Last",
    "gender": "male",
    "birth_date": "1985-07-09T10:19:31.000Z",
    "user_name": "testsign",
    "email": "testsign@iinboxx.com",
    "phone_number": "+447859730937",
    "wildduck_user_id": null
  };
  const { failedMessagesData, setFailedMessagesData } = useFailedMessages();
  const onChangeMailContent = ({ value }: {value: string}) => setMail(value);
  const [refetchData, setRefetchData] = useState(false);
  const [lastMessageData, setLastMessageData] = useState<IThreadMessage>();
  const { data, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
    useFetchThreadMessages({ id, refetchData });

  const hasData = allMessages?.length > 0;
  const firstMessage = allMessages?.[allMessages.length - 1];
  const sender = lastMessageData?.from ?? {
    name: userDetails.user_name,
    address: userDetails.email,
  };
  const initiator = data?.pages?.[0]?.initiator;
  const composeTo = params.to ?? [];
  const composeCc = params.cc ?? [];
  const composeBcc = params.bcc ?? [];
  const to = lastMessageData?.to ?? composeTo;
  const cc = lastMessageData?.cc ?? composeCc;
  const bcc = lastMessageData?.bcc ?? composeBcc;

  let others =
    hasData
      ? excludeUser({
        users: [sender, ...to, ...cc, ...bcc],
        userAddress: userDetails.email,
      })
      : [];
  others = others.length === 0  &&  sender.address === userDetails.email ?  [sender]  : others;

  const receiver = hasData ? getThreadParticipantsUserName(others, initiator) : "";
  const firstMessageDate = hasData ? conversationDateTime(firstMessage.createdAt ?? "") : "";


  const loadNextPageData = async () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const MenuItems = [
    { text: 'unsend', onPress: () => { } },
    { text: 'edit', onPress: () => { } },
  ];

  // MARK: - Load thread messages from API
  useEffect(() => {
    if (failedMessagesData[id]) {
      setFailedMessages(failedMessagesData[id].reverse())
    };

    if (!data || !data?.pages || data?.pages?.[0] === undefined) {
      return;
    };

    let flattenData = !!data?.pages && data?.pages?.[0] !== undefined
      ? data?.pages.flatMap((page) => page?.data)
      : [];
      flattenData = flattenData.sort(function(a, b) {
        var dateA = new Date(a?.createdAt || "");
        var dateB = new Date(b?.createdAt || "");
        if (dateA < dateB ) {
          return 1;
        }
        if (dateA > dateB ) {
          return -1;
        }
        return 0;
      });
    setAllMessages(flattenData);
    setLastMessageData(flattenData[0]);
  }, [data]);

  // Test temp solution
  useEffect(() => {
    setRefetchData(false);
    const stopFetchingTimer = setTimeout(() => {
      setRefetchData(true);
    }, 5000);
    return () => {
      clearTimeout(stopFetchingTimer)
    }
  }, [mail]);

  useFocusEffect(
    useCallback(() => {
      setRefetchData(true);
      return () => {
        setRefetchData(false);
      };
    }, [])
  );

  const formatEndPoints = (endPoint: { address: string, name: string }[]): { address: string }[] => endPoint?.map((obj) => ({ address: obj?.address?.trim() }))
    .filter(({ address }) => address !== userDetails.email);

  const createComposeRequest = (messageText: string): IComposeApiRequest => {
    const lastFromEndPoint = lastMessageData?.from?.address || "";
    const toEndPoints = formatEndPoints(lastMessageData?.to)?.filter(({ address }) => address !== lastFromEndPoint);
    if (lastFromEndPoint !== userDetails.email) {
      toEndPoints?.push({ address: lastFromEndPoint })
    }
    const composeRequest: IComposeApiRequest = {
      topicId: topicId,
      subject: subject,
      text: messageText,
      toList: toEndPoints,
      ccList: formatEndPoints(lastMessageData?.cc || []),
      bccList: formatEndPoints(lastMessageData?.bcc || []),
      from: `${userDetails?.user_name}@iinboxx.com`
    };

    return composeRequest
  };

  const onPressCompose = async () => {
    try {
      if (!mail) return;
      setMail("");
      // let newMessageComponent = {} as IThreadMessage;
      const allMessagesCopy = [...allMessages];
      const newMessage = { text: mail?.trim(), messageId: (new Date()).getTime().toString(), notConfirmedNewMessage: true };
      // newMessageComponent = [...newMessage];
      allMessagesCopy.unshift(newMessage);

      setAllMessages(allMessagesCopy);
      const data = (await composeApi(createComposeRequest(mail?.trim()))).data;
      const newMessageIndex = allMessagesCopy.findIndex((message) => message.messageId === newMessage.messageId);
      if (data !== undefined) {
        allMessagesCopy.splice(newMessageIndex, 1, { ...allMessagesCopy[newMessageIndex], notConfirmedNewMessage: false });
        setAllMessages(allMessagesCopy);
      } else {
        const allMessagesWithoutTheFailed = allMessagesCopy.filter(item => !item?.notConfirmedNewMessage);
        setAllMessages(allMessagesWithoutTheFailed)
        const failedMeessage = { ...newMessage, failedToSend: true };
        setFailedMessages((prev) => {
          const faildMessagesCopy = [...failedMessages]
          faildMessagesCopy.unshift(failedMeessage);
          return faildMessagesCopy
        });
        const newFailedMEssagesObj = { ...failedMessagesData, [id]: [...(failedMessagesData?.[id] ? failedMessagesData?.[id] : []), failedMeessage] }
        setFailedMessagesData && setFailedMessagesData(newFailedMEssagesObj)
      }
    } catch (error) {
      console.log("error", error)
    }

  };

  const moveFromFailedToSuccess = (messageTempId) => {
    const clickedFailedMessage = failedMessages.find(message => message.messageId === messageTempId);
    const allFailedMessagesWithoutClicked = failedMessages.filter(message => message.messageId !== messageTempId);
    setFailedMessages(allFailedMessagesWithoutClicked);
    const allsuccessMessagesCopy = [...allMessages];
    allsuccessMessagesCopy.unshift({ ...clickedFailedMessage, failedToSend: false, notConfirmedNewMessage: true });
    setAllMessages(allsuccessMessagesCopy)
    // remove data from the failed messages context
    const failedMessagesFromContext = failedMessagesData[id].filter(message => message.messageId !== messageTempId);
    // set the failed context with the new data
    setFailedMessagesData && setFailedMessagesData({ ...failedMessagesData, [id]: failedMessagesFromContext })
  };

  if (!hasData || isError) {
    return (
      <LoadingScreen loadingText={isError ? "Something Wrong" : "Loading"} loadingIndecatorSize={20} />
    )
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 100}
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
              <FlashList
                data={[...failedMessages, ...allMessages]}
                renderItem={({ item }) =>
                  <HoldItem items={MenuItems}>
                    <View style={{ marginVertical: 8 }}>
                      {item?.failedToSend ? <FailedMessage item={item}
                        createComposeRequest={createComposeRequest}
                        moveFromFailedToSuccess={moveFromFailedToSuccess}
                      /> : (item.text && <Message item={item} />)}
                    </View>
                  </HoldItem>
                }
                keyExtractor={(item) => item?.messageId}
                onEndReachedThreshold={0.2}
                estimatedItemSize={100}
                scrollIndicatorInsets={{ right: 1 }}
                inverted={true}
                onEndReached={async () => {
                  await loadNextPageData()
                }}
              />
              <View style={{ height: 20 }} />
            </>
          )}

        </View>
        <MailSender
          text={mail}
          onChangeMailContent={onChangeMailContent}
          onPressCompose={onPressCompose}
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
    marginTop: Platform.OS === "ios" ? 20 : 0
  },
  titleText: {
    height: 25,

  },
  chatWrapper: {
    flex: 1,
    marginBottom: 48,
  },
  emptyOrErrorMessageContainer: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    backgroundColor: "black",
    paddingTop: 50
  }

});
