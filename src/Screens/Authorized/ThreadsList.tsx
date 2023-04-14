import Typography from "@followBack/GenericElements/Typography";
import React, {memo, useCallback, useEffect, useState} from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from "react-native";

import useTheme from "@followBack/Hooks/useTheme";
import { FlashList } from "@shopify/flash-list";
import ThreadCard from "@followBack/Elements/ThreadCard";
import { useFetchthreadsList } from "@followBack/Hooks/Apis/ThreadsList";
import { useSearch } from "@followBack/Hooks/useSearch";
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  authorizedStackNavigationProps} from "@followBack/Navigation/Authorized/types";
import {useMailBoxes} from "@followBack/Hooks/useMailboxes";

let timer;
const ThreadList: React.FC = () => {
  const nav = useNavigation<authorizedStackNavigationProps['navigation']>();
   //route = useRoute<authorizedStackNavigationProps['route']>();
  const {data: mail} = useMailBoxes();
  const {id, path} = mail?.mailboxes?.find(t => t.path === "INBOX");
 // const { id, path } = route.params as IThreadListState;
  const { colors } = useTheme();
  const { searchValue } = useSearch();
  const [isIitialLoading, setIsInitialLoading] = React.useState(true);
  const [threadsList, setthreadsList] = React.useState([]);
  const [refetchData, setRefetchData] = useState(false);
  const { data, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
    useFetchthreadsList({ id, searchValue, refetchData });
  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  React.useEffect(() => {
    if (!isIitialLoading) return;
    setIsInitialLoading(isLoading);
  }, [isLoading]);

  useFocusEffect(

      useCallback(() => {
        setRefetchData(true);
        return () => {
          setRefetchData(false);
        };
      }, [])
  );

  React.useEffect(() => {
    if (typeof data === typeof undefined) return;

    const flattenData = !!data?.pages
      ? data.pages.flatMap((page) => page?.data)
      : [];

    setthreadsList(flattenData);
  }, [data]);


  if (isLoading){
    return (
        <View style={styles.emptyOrErrorMessageContainer}>
          <Typography color="secondary" type="largeRegularBody">
            loading
          </Typography>
        </View>
    );

  }
  if (isError)
    return (
        <View style={styles.emptyOrErrorMessageContainer}>
      <Typography color="secondary" type="largeRegularBody">
        An error occurred while fetching data
      </Typography>
        </View>
    );

  const isEmptyList = threadsList.length === 0;
  if(isEmptyList){
   return <View style={styles.emptyOrErrorMessageContainer}>
    <Typography color="secondary" type="largeRegularBody">
      no results
    </Typography>
    </View>
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
      style={{ flex: 1, backgroundColor: colors.black }}
    >
      {isLoading && (
        <Typography color="secondary" type="smallBoldBody">
          Loading...
        </Typography>
      )}

      <View
        style={
          isEmptyList
            ? [styles.searchCountWrapper, styles.moveSearchCounter]
            : styles.searchCountWrapper
        }
      >
      {isSuccess && !!searchValue && (
          <Typography type="largeRegularBody" color="secondary">
            {threadsList.length} search results{" "}
          </Typography>
        )}
      </View>

      {isSuccess && !!threadsList && !isEmptyList && (
        <View style={styles.container}>
          <FlashList
            keyExtractor={(item) => item.threadId}
              scrollIndicatorInsets={{right:1}}
              data={threadsList}
            renderItem={({ item }) => (
              <Pressable
                  style={({pressed})=>({
                    opacity: pressed ? 0.7 : 1,
                    marginVertical: 10
                  })}
                onPress={() => {
                  nav.navigate(AuthorizedScreensEnum.threadsListStack, {
                    screen: AuthorizedScreensEnum.threadDetails,
                    params: { id: item.threadId },
                  });
                }}
              >
                <ThreadCard threadItem={item} />
              </Pressable>
            )}
            estimatedItemSize={100}
            onEndReached={loadNextPageData}
            onEndReachedThreshold={0.2}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};
export default memo(ThreadList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "black"
  },
  searchCountWrapper: {
    alignSelf: "center",
  },
  moveSearchCounter: {
    marginTop: 50,
  },
  emptyOrErrorMessageContainer: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    backgroundColor: "black",
    paddingTop: 50
  }
});
