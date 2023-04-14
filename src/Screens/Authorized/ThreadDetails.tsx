import React, { useState, useEffect, useCallback } from "react";
import { View, KeyboardAvoidingView, Platform, StyleSheet, TouchableHighlight, Pressable, Keyboard } from "react-native";
import useTheme from "@followBack/Hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetchThreadMessages } from "@followBack/Hooks/Apis/ThreadMessages";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import Message from "@followBack/Elements/Message/Message";
import Typography from "@followBack/GenericElements/Typography";
import MailSender from "@followBack/Elements/MailSender/MailSender";
import { useMailBoxes } from "@followBack/Hooks/useMailboxes";
import ThreadDetailsHeader from "@followBack/Elements/Headers/Authorized/ThreadDetailsHeader/threadDetailsHeader.index";
import { excludeUser } from "@followBack/Utils/messages";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { getThreadParticipantsUserName } from "@followBack/Utils/stringUtils";
import { formatMessageDate } from "@followBack/Utils/date";
import { useFocusEffect } from "@react-navigation/native";
import { IComposeApiRequest } from "@followBack/Apis/Compose/types";
import { isValidEmail } from "@followBack/Utils/validations";
import { useCompose } from "@followBack/Hooks/Apis/Compose";
import { FlashList } from "@shopify/flash-list";

const Compose: React.FC = ({ navigation, options, route }) => {
  const { id } = route.params;
  const [allMessages, setAllMessages] = useState([]);
  const { colors } = useTheme();

  const [mail, setMail] = useState("");
  const { userDetails } = useUserDetails();
  const onChangeMailContent = ({ value }) => setMail(value);
  const [refetchData, setRefetchData] = useState(true);
  const [lastMessageData, setLastMessageData] = useState({})
  const { sentMailThread } = useMailBoxes();
  const { data, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
    useFetchThreadMessages({ id, refetchData });
  // console.log("isLoading", isLoading)
  // console.log("data from thread details", data)
  const hasData = allMessages?.length > 0;
  const firstMessage = allMessages?.[0];
  const others = hasData ? excludeUser({
    users: [firstMessage?.from, ...firstMessage?.to],
    userAddress: userDetails.email,
  }) : "";
  const receiver = hasData ? getThreadParticipantsUserName(others) : "";
  const subject = hasData ? firstMessage?.subject : "";
  const firstMessageDate = hasData ? formatMessageDate(firstMessage?.messageDateTime) : "";


  const loadNextPageData = async () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (!data) {

      return;
    };
    const flattenData = !!data?.pages
      ? data?.pages.flatMap((page) => page?.data)
      : [];
    setAllMessages(flattenData.reverse());
    setLastMessageData(flattenData[flattenData?.length - 1]);

  }, [data]);

  console.log("flattenData from thread details", allMessages)
  console.log("lastMessageData", lastMessageData)

  useFocusEffect(
    useCallback(() => {
      hasData && setRefetchData(true);
      return () => {
        setRefetchData(false);
      };
    }, [])
  );

  const formatEndPoints = (endPoint: { address: string, name: string }[]): { address: string }[] => endPoint?.map((obj) => ({ address: obj?.address?.trim() }));

  const composeRequest: IComposeApiRequest = {
    subject: lastMessageData?.subject,
    text: mail,
    to: formatEndPoints(lastMessageData?.to || []),
    cc: formatEndPoints(lastMessageData?.cc || []),
    bcc: formatEndPoints(lastMessageData?.bcc || []),
    uid: lastMessageData?.uid
  };
  // console.log("composeRequest", composeRequest)

  const { refetch: recallComposeApi } = useCompose(composeRequest);
  const onPressCompose = async () => {
    const { data } = await recallComposeApi();
    console.log("data", data)
    if (data?.["success"]) {
      setMail("")
    }
  };


  if (!hasData) {
    return (
      <View style={styles.emptyOrErrorMessageContainer}>
        <Typography color="secondary" type="largeRegularBody">
          Loading          </Typography>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
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
            <FlashList
              data={allMessages}
              renderItem={({ item }) => <Message item={item} />}
              keyExtractor={(item) => item?.messageId}
              onStartReached={loadNextPageData}
              showDefaultLoadingIndicators={true}
              estimatedItemSize={20}
              onStartReachedThreshold={10}
              onEndReachedThreshold={10}
              activityIndicatorColor={"black"}
              enableAutoscrollToTop={false}
            />
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
export default Compose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleText: {
    height: 25,

  },
  chatWrapper: {
    flex: 1,
    paddingBottom: 48
  },
  emptyOrErrorMessageContainer: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    backgroundColor: "black",
    paddingTop: 50
  }

});
