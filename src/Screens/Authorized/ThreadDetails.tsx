import React, { useState, useEffect, useCallback } from "react";
import { View, KeyboardAvoidingView, Platform, StyleSheet, TouchableHighlight, Pressable, Keyboard, FlatList } from "react-native";
import useTheme from "@followBack/Hooks/useTheme";
import { useFetchThreadMessages } from "@followBack/Hooks/Apis/ThreadMessages";
import Message from "@followBack/Elements/Message/Message";
import MailSender from "@followBack/Elements/MailSender/MailSender";
import ThreadDetailsHeader from "@followBack/Elements/Headers/Authorized/ThreadDetailsHeader/threadDetailsHeader.index";
import { excludeUser } from "@followBack/Utils/messages";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { getThreadParticipantsUserName } from "@followBack/Utils/stringUtils";
import {conversationDateTime} from "@followBack/Utils/date";
import { useFocusEffect } from "@react-navigation/native";
import { IComposeApiRequest } from "@followBack/Apis/Compose/types";
import { useCompose } from "@followBack/Hooks/Apis/Compose";
import { HoldItem } from "react-native-hold-menu";
import LoadingScreen from "@followBack/Elements/LoadingScreen/LoadingScreen.index";

const ThreadDetails: React.FC = ({ navigation, options, route }) => {
  const { id } = route.params;
  const [allMessages, setAllMessages] = useState([]);
  const { colors } = useTheme();

  const [mail, setMail] = useState("");
  const { userDetails } = useUserDetails();
  const onChangeMailContent = ({ value }) => setMail(value);
  const [refetchData, setRefetchData] = useState(false);
  const [lastMessageData, setLastMessageData] = useState({});
  const { data, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
    useFetchThreadMessages({ id, refetchData });

  const hasData = allMessages?.length > 0;
  const firstMessage = allMessages?.[0];
  const sender = firstMessage?.from ?? {
    name: userDetails.user_name,
    address: userDetails.email,
  };

  const to = firstMessage?.to ?? [];
  const cc = firstMessage?.cc ?? [];
  const bcc = firstMessage?.bcc ?? [];

  const others =
      hasData
          ? excludeUser({
            users: [sender, ...to, ...cc, ...bcc],
            userAddress: userDetails.email,
          })
          : [];

  const receiver = hasData ? getThreadParticipantsUserName(others) : "";
  const subject = hasData ? firstMessage?.subject : "";
  const firstMessageDate = hasData ? conversationDateTime(firstMessage?.messageDateTime) : "";


  const loadNextPageData = async () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const MenuItems = [
    { text: 'unsend', onPress: () => { } },
    { text: 'edit', onPress: () => { } },
  ];

  useEffect(() => {
    if (!data || !data?.pages || data?.pages?.[0] === undefined) {
      return;
    };
    const flattenData = !!data?.pages && data?.pages?.[0] !== undefined
      ? data?.pages.flatMap((page) => page?.data)
      : [];
    setAllMessages(flattenData);
    setLastMessageData(flattenData[flattenData?.length - 1]);

  }, [data]);


  useFocusEffect(
    useCallback(() => {
      setRefetchData(true);
      return () => {
        setRefetchData(false);
      };
    }, [])
  );

  const formatEndPoints = (endPoint: { address: string, name: string }[]): { address: string }[] => endPoint?.map((obj) => ({ address: obj?.address?.trim() }))
  .filter(({address}) => address !==  userDetails.email);

  const createComposeRequest = (): IComposeApiRequest => {
    const lastFromEndPoint = lastMessageData?.from?.address || "";
    const toEndPoints = formatEndPoints(lastMessageData?.to)?.filter(({address})=> address !== lastFromEndPoint);
    if(lastFromEndPoint !== userDetails.email){
      toEndPoints?.push({address: lastFromEndPoint})
    }
    const composeRequest: IComposeApiRequest = {
      subject: lastMessageData?.subject,
      text: mail,
      to: toEndPoints,
      cc: formatEndPoints(lastMessageData?.cc || []),
      bcc: formatEndPoints(lastMessageData?.bcc || []),
      from: userDetails?.email,
      uid: lastMessageData?.uid
    };

    return composeRequest
  };
  const { refetch: recallComposeApi } = useCompose(createComposeRequest());
  const onPressCompose = async () => {
    const { data } = await recallComposeApi();

    if (data?.["success"]) {
      setMail("")
    }
  };

  if (!hasData || isError) {
    return(
      <LoadingScreen loadingText={isError ? "Something Wrong" : "Loading"} loadingIndecatorSize={20}/>
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
            <FlatList
              data={allMessages}
              ItemSeparatorComponent={() => <View style={{height: 16}} />}

              renderItem={({ item }) => <HoldItem  items={MenuItems}>
                  <Message item={item} />
              </HoldItem>}
              keyExtractor={(item) => item?.messageId}
              onStartReached={loadNextPageData}
              showDefaultLoadingIndicators={true}
              estimatedItemSize={20}
              onStartReachedThreshold={10}
              onEndReachedThreshold={10}
              activityIndicatorColor={"black"}
              enableAutoscrollToTop={false}
              inverted={true}
            />
                <View style={{height: 30}} />
            </>
          )}

        </View>
        <MailSender
          mail={mail}
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
    marginBottom: 48
  },
  emptyOrErrorMessageContainer: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    backgroundColor: "black",
    paddingTop: 50
  }

});
