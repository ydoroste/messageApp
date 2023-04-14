import React, { useState, useEffect } from "react";
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

const Compose: React.FC = ({ navigation, options, route }) => {
  const { id } = route.params;
  const [flattenData, setFlattenData] = useState([]);
  const { colors } = useTheme();

  const [mail, setMail] = useState("");
  const { userDetails } = useUserDetails();
  const onChangeMailContent = ({ value }) => setMail(value);
  const { sentMailThread } = useMailBoxes();
  const { data, isLoading, isError, isSuccess, hasNextPage, fetchNextPage, refetch } =
    useFetchThreadMessages({ id });

  const loadNextPageData = async () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (!data) {
      refetch();
      return;
    };
    const flattenData = !!data?.pages
      ? data.pages.flatMap((page) => page.data)
      : [];
    setFlattenData(flattenData.reverse());
  }, [data]);


  const hasData = flattenData.length > 0;
  const firstMessage = flattenData[0];
  const others = hasData ? excludeUser({
    users: [firstMessage?.from, ...firstMessage?.to],
    userAddress: userDetails.email,
  }) : "";
  const receiver = hasData ? getThreadParticipantsUserName(others) : "";
  const subject = hasData ? firstMessage?.subject : "";
  const firstMessageDate = hasData ? formatMessageDate(firstMessage?.messageDateTime) : "";


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
            <FlatList
              data={flattenData}
              renderItem={({ item }) => <Message item={item} />}
              keyExtractor={(item) => item?.messageId}
              onStartReached={loadNextPageData}
              showDefaultLoadingIndicators={true}
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
          onPressCompose={() => console.log("send")}
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
    // marginTop: 20,
  },
  emptyOrErrorMessageContainer: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    backgroundColor: "black",
    paddingTop: 50
  }

});
