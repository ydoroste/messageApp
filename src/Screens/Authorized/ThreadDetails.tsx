import Typography from "@followBack/GenericElements/Typography";
import * as React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import useTheme from "@followBack/Hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import ThreadDetailsHeader from "@followBack/Elements/Headers/Authorized/ThreadDetailsHeader/ThreadDetailsHeader";
import { useFetchThreadMessages } from "@followBack/Hooks/Apis/ThreadMessages";

const Compose: React.FC = ({ navigation, options, route }) => {
  const { id } = route.params;

  const { colors } = useTheme();
  const { data, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
    useFetchThreadMessages({ id });
  const tempData = [
    {
      messageId: "<830019f2-72b8-28df-3dad-fcaf50de4a13@iinboxx.com>",
      subject: "Test Contacts - 121",
      text: "This message has been updated 101",
      html: ["<p>Test Contacts - 121</p>"],
      intro: "Test Contacts - 121",
      mailbox: "638ba122d632f700074069c5",
      user: "638ba122d632f700074069c4",
      threadId: "63a72dadc4ec3000127e9c56",
      from: [
        {
          address: "yasser@iinboxx.com",
          name: "yasser mohammed",
        },
      ],
      to: [
        {
          address: "tarek@iinboxx.com",
          name: "tarek morshid",
        },
        {
          address: "john.doe@iinboxx.com",
          name: "",
        },
      ],
      messageDateTime: "2022-12-24 05:49:49 PM",
      messageSize: 1108,
      unseen: true,
      draft: false,
    },
  ];

  const firstMessage = tempData[0];
  const chatUsers = [...firstMessage.to, ...firstMessage.from];
  const { subject } = firstMessage;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
      style={{ flex: 1, backgroundColor: colors.black }}
    >
      <SafeAreaView style={styles.container}>
        <ThreadDetailsHeader
          chatUsers={chatUsers}
          subject={subject}
          navigation={navigation}
          route={route}
          options={options}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default Compose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
