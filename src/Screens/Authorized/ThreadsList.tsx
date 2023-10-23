import Typography from "@followBack/GenericElements/Typography";
import React, { memo, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import Socket from "@followBack/Classes/Socket";

import useTheme from "@followBack/Hooks/useTheme";
import { FlashList } from "@shopify/flash-list";
import ThreadCard from "@followBack/Elements/ThreadCard";
import { useFetchthreadsList } from "@followBack/Hooks/Apis/ThreadsList";
import { useSearch } from "@followBack/Hooks/useSearch";
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { authorizedStackNavigationProps } from "@followBack/Navigation/Authorized/types";
import { useMailBoxes } from "@followBack/Hooks/useMailboxes";
import LoadingScreen from "@followBack/Elements/LoadingScreen/LoadingScreen.index";
import { Thread } from "@followBack/Apis/threadsList/type";
import Swipeable from "react-native-swipeable";
import IconButton from "@followBack/GenericElements/IconButton";
import { editBookmark } from "@followBack/Apis/Bookmarks";
import { getContactsListApi } from "@followBack/Apis/Contacts";
import { getContacts, setContacts } from "@followBack/Utils/contactDetails";
import SideOptions from "@followBack/GenericElements/SideOptions";
import CachingLayer from "@followBack/Classes/CachingLayer";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";

const ThreadList: React.FC = () => {
  const nav = useNavigation<authorizedStackNavigationProps["navigation"]>();
  const { mailboxes } = useMailBoxes();
  const { id } = mailboxes?.find(
    (t) => t.mailbox.toLowerCase() === "inbox"
  ) ?? { id: "" };

  const { userDetails } = useUserDetails();
  const { colors } = useTheme();
  const { searchValue } = useSearch();
  const [threadsList, setThreadsList] = useState<Thread[]>(() => {
    return CachingLayer.mailBoxes.inbox.data ?? [];
  });

  const threadListIndexesRef = useRef<string, number>({});
  const currentOpenedTopicId = useRef<string>("");

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useFetchthreadsList({
      id,
      searchValue,
    });

  const isEmptyList = threadsList.length === 0;

  const shouldShowData = !!threadsList && !isEmptyList && !!threadsList[0];

  useFocusEffect(() => {
    currentOpenedTopicId.current = "";
    const getContactsData = async () => {
      const contactsList = await getContacts();
      if (typeof contactsList !== typeof undefined && contactsList !== null) {
        return;
      }
      const contactsFromAPI = await getContactsListApi({ searchValue: "" });
      await setContacts(JSON.stringify(contactsFromAPI.contacts));
    };

    getContactsData();
  });

  useEffect(() => {
    Socket.initialize().then(() => {
      Socket.instance.on(
        userDetails.wildduck_user_id,
        ({ thread, eventType }: { thread: Thread; eventType: string }) => {
          if (
            Socket.EventTypes.Create === eventType ||
            Socket.EventTypes.Update === eventType
          ) {
            setThreadsList((prevThreadList) => {
              let newThreadList = [...prevThreadList];
              const topicIdIndex = threadListIndexesRef.current[thread.topicId];

              if (topicIdIndex !== undefined) {
                newThreadList.splice(topicIdIndex, 1);
              }
              newThreadList = [
                {
                  ...thread,
                  seen: currentOpenedTopicId.current === thread.topicId,
                },
                ...newThreadList,
              ];
              return newThreadList;
            });
          }
        }
      );
    });
  }, [userDetails.wildduck_user_id]);

  useEffect(() => {
    if (typeof data === typeof undefined) return;
    let flattenData = data?.pages
      ? data.pages.flatMap((page) => page?.data)
      : [];

    setThreadsList(flattenData);
  }, [data]);

  useEffect(() => {
    threadListIndexesRef.current = {};
    threadsList.forEach((thread, index) => {
      threadListIndexesRef.current[thread.topicId] = index;
    });
    CachingLayer.saveInBoxToDir(id, threadsList);
  }, [threadsList]);

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const onBookmarkPressed = async (item: Thread) => {
    await editBookmark({ threadId: item.threadId, bookmark: !item.favorite });
  };

  const rightActions = [
    {
      iconName: "pin",
      width: 22,
      height: 25,
      onPress: onBookmarkPressed,
      getColor: (item: Thread) =>
        item.favorite ? colors.white : colors.grey02,
    },
    { iconName: "verticalline", width: 20, height: 27, onPress: () => {} },
    { iconName: "forward", width: 22, height: 25, onPress: () => {} },
    { iconName: "verticalline", width: 20, height: 27, onPress: () => {} },
    { iconName: "about", width: 22, height: 25, onPress: () => {} },
    { iconName: "verticalline", width: 20, height: 27, onPress: () => {} },
    { iconName: "bookmark", width: 22, height: 25, onPress: () => {} },
    { iconName: "verticalline", width: 20, height: 27, onPress: () => {} },
    { iconName: "trash", width: 22, height: 25, onPress: () => {} },
  ];

  const renderLeftActions = () => {
    return [
      <View style={styles.leftActionContainer}>
        <IconButton
          onPress={() => {}}
          name={"bigalert"}
          width={22}
          height={25}
          color={colors.grey02}
        />
      </View>,
    ];
  };

  const renderRightActions = (item: Thread | undefined) => {
    if (!item) return [];
    return rightActions.map(
      ({ height, iconName, onPress, width, getColor }) => {
        return (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <IconButton
              onPress={() => onPress(item)}
              disabled={iconName === "verticalline"}
              name={iconName}
              width={width}
              height={height}
              color={getColor?.(item) ?? colors.grey02}
            />
          </View>
        );
      }
    );
  };

  const updateThreadListSeen = (topicId: string) => {
    setThreadsList((prevThreadList) => {
      let newThreadList = [...prevThreadList];
      const topicIdIndex = threadListIndexesRef.current[topicId];
      newThreadList[topicIdIndex] = {
        ...newThreadList[topicIdIndex],
        seen: true,
      };
      return newThreadList;
    });
  };

  const onPress = (item: Thread) => {
    currentOpenedTopicId.current = item.topicId;

    nav.navigate(AuthorizedScreensEnum.threadsListStack, {
      screen: AuthorizedScreensEnum.threadDetails,
      params: { threadInfo: item },
    });

    // without timeout that make navigation made slowly
    setTimeout(() => {
      updateThreadListSeen(item.topicId);
    }, 0);
  };

  const renderThreadItem = ({ item }: { item: Thread }) => {
    return (
      <Swipeable
        rightButtons={renderRightActions(item)}
        rightButtonWidth={30}
        leftButtons={renderLeftActions(item)}
      >
        <Pressable style={{ marginVertical: 5 }} onPress={() => onPress(item)}>
          <ThreadCard threadItem={item} />
        </Pressable>
      </Swipeable>
    );
  };

  if (shouldShowData) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
        style={{ flex: 1, backgroundColor: colors.black }}
      >
        <View style={styles.container}>
          <FlashList
            keyExtractor={(item, index) => item?.threadId ?? "" + "_" + index}
            scrollIndicatorInsets={{ right: 1 }}
            data={threadsList}
            renderItem={renderThreadItem}
            estimatedItemSize={100}
            onEndReached={loadNextPageData}
            onEndReachedThreshold={1}
          />
        </View>
        <SideOptions style={styles.sideOptionsContainer} />
      </KeyboardAvoidingView>
    );
  } else if (isLoading) {
    return <LoadingScreen loadingText={"Loading"} loadingIndecatorSize={20} />;
  } else if (isError)
    return (
      <View style={styles.emptyOrErrorMessageContainer}>
        <Typography color="secondary" type="largeRegularBody">
          An error occurred while fetching data
        </Typography>
      </View>
    );
  else if (isEmptyList) {
    return (
      <View style={styles.emptyOrErrorMessageContainer}>
        <Typography color="secondary" type="largeRegularBody">
          no results
        </Typography>
      </View>
    );
  }
  return null;
};
export default memo(ThreadList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "black",
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
    paddingTop: 50,
  },
  sideOptionsContainer: {
    bottom: 33,
    right: 10,
  },
  leftActionContainer: {
    flexGrow: 1,
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 35,
  },
});

// {
//   isLoading && (
//     <Typography color="secondary" type="smallBoldBody">
//       Loading...
//     </Typography>
//   );
// }

// <View
//   style={
//     isEmptyList
//       ? [styles.searchCountWrapper, styles.moveSearchCounter]
//       : styles.searchCountWrapper
//   }
// >
//   {isSuccess && !!searchValue && (
//     <Typography type="largeRegularBody" color="secondary">
//       {threadsList.length} search results{" "}
//     </Typography>
//   )}
// </View>;

// const AvatarLayout = ({
//   size = 100,
//   style,
// }: {
//   size?: number;
//   style?: ViewStyle;
// }) => (
//   <SkeletonLoader>
//     <SkeletonLoader.Container
//       style={[{ flex: 1, flexDirection: "row" }, style]}
//     >
//       <SkeletonLoader.Item
//         style={{
//           width: size,
//           height: size,
//           borderRadius: size / 2,
//           marginRight: 20,
//         }}
//       />
//       <SkeletonLoader.Container style={{ paddingVertical: 10 }}>
//         <SkeletonLoader.Item
//           style={{ width: 220, height: 20, marginBottom: 5 }}
//         />
//         <SkeletonLoader.Item style={{ width: 150, height: 20 }} />
//       </SkeletonLoader.Container>
//     </SkeletonLoader.Container>
//   </SkeletonLoader>
// );

// const PostLayout = () => (
//   <SkeletonLoader style={{ marginVertical: 10 }}>
//     <AvatarLayout style={{ marginBottom: 10 }} />

//     <SkeletonLoader.Item
//       style={{
//         width: windowWidth,
//         height: windowHeight / 3.5,
//         marginVertical: 10,
//       }}
//     />
//   </SkeletonLoader>
// );
