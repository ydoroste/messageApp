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

const Compose: React.FC = ({ navigation, options, route }) => {
  const { id } = route.params;
  const [flattenData, setFlattenData] = useState([]);
  const { colors } = useTheme();

  const [mail, setMail] = useState("");
  const onChangeMailContent = ({ value }) => setMail(value);
  const { sentMailThread } = useMailBoxes();
  const { data, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
    useFetchThreadMessages({ id });

  const loadNextPageData = async () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
console.log("data from thread details", data)
  useEffect(() => {
    if (!data) return;
    const flattenData = !!data?.pages
      ? data.pages.flatMap((page) => page.data)
      : [];

    setFlattenData(flattenData);
  }, [data]);

  const hasData = flattenData.length > 0;

  if (!hasData)
    return (
        <View style={styles.emptyOrErrorMessageContainer}>
          <Typography color="secondary" type="largeRegularBody">
            Loading          </Typography>
        </View>
    );

  const firstMessage = flattenData[0];
  const chatUsers = [...firstMessage.to, firstMessage.from];
  const { subject } = firstMessage;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
      style={{ flex: 1, backgroundColor: colors.black }}
    >
      <View style={styles.container}>

        {hasData && (
          <ThreadDetailsHeader
            chatUsers={chatUsers}
            subject={subject}
            navigation={navigation}
            route={route}
            options={options}
          />
        )}

        <View style={styles.chatWrapper}>
          {hasData && (
            <FlatList
              data={flattenData}
              renderItem={({ item }) => <Message item={item} />}
              keyExtractor={(item) => item.toString()}
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
