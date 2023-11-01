import React from "react";
import { StyleSheet } from "react-native";

import { useSearch } from "@followBack/Hooks/useSearch";
import { useMailBoxes } from "@followBack/Hooks/useMailboxes";
import { Thread } from "@followBack/Apis/threadsList/type";
import CachingLayer from "@followBack/Classes/CachingLayer";
import ThreadsList from "./ThreadsList";
import { useBookmarksList } from "@followBack/Hooks/Apis/BookmarksList";
import useInternetFetchData from "@followBack/Hooks/useInternetFetchData";
import { useQueryClient } from "react-query";

interface BookMarkProps {}

const BookMark = (props: BookMarkProps) => {
  const { mailboxes } = useMailBoxes();

  const { id } = mailboxes?.find(
    (t) => t.mailbox.toLowerCase() === "inbox"
  ) ?? { id: "" };

  const queryClient = useQueryClient();

  const { searchValue } = useSearch();

  const apiData = useBookmarksList({
    searchValue,
  });

  const onCacheData = (threadsList: Thread[]) => {
    if (id?.length !== 0) {
      CachingLayer.saveBookMarkToDir(id, threadsList);
    }
  };

  useInternetFetchData(() => {
    queryClient.invalidateQueries({
      queryKey: ["bookmark"],
    });
  });

  const additionalConditionForUpdatingSockets = (Thread: Thread) => {
    return Thread.favorite;
  };

  return (
    <ThreadsList
      apiData={apiData}
      onCacheData={onCacheData}
      additionalConditionForUpdatingSockets={
        additionalConditionForUpdatingSockets
      }
      initialThreadsList={CachingLayer.mailBoxes?.bookMark?.data ?? []}
    />
  );
};

export default BookMark;

const styles = StyleSheet.create({
  container: {},
});
