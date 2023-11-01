import React from "react";
import { StyleSheet } from "react-native";
import { useFetchthreadsList } from "@followBack/Hooks/Apis/ThreadsList";
import { useSearch } from "@followBack/Hooks/useSearch";
import { useMailBoxes } from "@followBack/Hooks/useMailboxes";
import { Thread } from "@followBack/Apis/threadsList/type";
import CachingLayer from "@followBack/Classes/CachingLayer";
import ThreadsList from "./ThreadsList";
import useInternetFetchData from "@followBack/Hooks/useInternetFetchData";
import { useQueryClient } from "react-query";

interface InboxProps {}

const Inbox = (props: InboxProps) => {
  const { mailboxes } = useMailBoxes();

  const { id } = mailboxes?.find(
    (t) => t.mailbox.toLowerCase() === "inbox"
  ) ?? { id: "" };

  const queryClient = useQueryClient();

  const { searchValue } = useSearch();

  const apiData = useFetchthreadsList({
    id,
    searchValue,
  });

  const onCacheData = (threadsList: Thread[]) => {
    if (id?.length !== 0) {
      CachingLayer.saveInBoxToDir(id, threadsList);
    }
  };

  useInternetFetchData(() => {
    queryClient.invalidateQueries({
      queryKey: [`threadsList-${id}`, searchValue],
    });
  });

  return (
    <ThreadsList
      apiData={apiData}
      onCacheData={onCacheData}
      initialThreadsList={CachingLayer.mailBoxes.inbox.data ?? []}
    />
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {},
});
