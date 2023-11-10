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
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { authorizedStackNavigationProps } from "@followBack/Navigation/Authorized/types";
import LoadingScreen from "@followBack/Elements/LoadingScreen/LoadingScreen.index";
import { Thread } from "@followBack/Apis/threadsList/type";
import Swipeable from "react-native-swipeable";
import IconButton from "@followBack/GenericElements/IconButton";
import { editBookmark } from "@followBack/Apis/Bookmarks";
import { getContactsListApi } from "@followBack/Apis/Contacts";
import { getContacts, setContacts } from "@followBack/Utils/contactDetails";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";

import Current from "@followBack/Classes/Current";

interface ThreadListProps {
  apiData: any;
  initialThreadsList: any[];
  onCacheData: (Thread: Thread[]) => void;
  additionalConditionForUpdatingSockets?: (thread: Thread) => boolean;
}

const ThreadList: React.FC<ThreadListProps> = ({
  apiData,
  initialThreadsList,
  onCacheData,
  additionalConditionForUpdatingSockets = () => true,
}) => {
  const nav = useNavigation<authorizedStackNavigationProps["navigation"]>();

  const { userDetails } = useUserDetails();
  const { colors } = useTheme();

  const [threadsList, setThreadsList] = useState<Thread[]>(() => {
    return initialThreadsList;
  });

  const threadListIndexesRef = useRef<string, number>({});

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = apiData;

  const isEmptyList = threadsList.length === 0;

  const shouldShowData = !!threadsList && !isEmptyList && !!threadsList[0];

  useFocusEffect(() => {
    Current.topicId = "";
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

  const handleSocketEvent = ({
    thread,
    eventType,
  }: {
    thread: Thread;
    eventType: string;
  }) => {
    if (
      (Socket.EventTypes.Create === eventType ||
        Socket.EventTypes.Update === eventType) &&
      additionalConditionForUpdatingSockets(thread)
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
            seen: Current.topicId === thread.topicId,
          },
          ...newThreadList,
        ];
        return newThreadList;
      });
    }
  };

  useEffect(() => {
    Socket.initialize().then(() => {
      Socket.instance.on(userDetails.wildduck_user_id, handleSocketEvent);
    });

    return () => {
      Socket.instance.off(userDetails.wildduck_user_id, handleSocketEvent);
    };
  }, [userDetails.wildduck_user_id]);

  useEffect(() => {
    if (typeof data === typeof undefined) return;
    console.log(data.pages, "data---")
    let flattenData = data?.pages
      ? data.pages.flatMap((page) => page?.data)
      : [];

    setThreadsList(flattenData);
  }, [data]);

  useEffect(() => {
    threadListIndexesRef.current = {};

    onCacheData(threadsList);
    threadsList.forEach((thread, index) => {
      threadListIndexesRef.current[thread?.topicId] = index;
    });
  }, [threadsList]);

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const onBookmarkPressed = async (item: Thread) => {
    setThreadsList((prevThreadList) => {
      let newThreadList = [...prevThreadList];
      const topicIdIndex = threadListIndexesRef.current[item.topicId];

      newThreadList[topicIdIndex] = {
        ...newThreadList[topicIdIndex],
        favorite: !newThreadList[topicIdIndex].favorite,
      };

      return newThreadList;
    });
    await editBookmark({
      threadId: item.threadId,
      bookmark: !Boolean(item.favorite),
    });
  };

  const rightActions = [
    {
      iconName: "pin",
      width: 22,
      height: 25,
      onPress: () => {},
    },
    { iconName: "verticalline", width: 20, height: 27, onPress: () => {} },
    { iconName: "forward", width: 22, height: 25, onPress: () => {} },
    { iconName: "verticalline", width: 20, height: 27, onPress: () => {} },
    { iconName: "about", width: 22, height: 25, onPress: () => {} },
    { iconName: "verticalline", width: 20, height: 27, onPress: () => {} },
    {
      iconName: "bookmark",
      width: 22,
      height: 25,
      onPress: onBookmarkPressed,
      getColor: (item: Thread) =>
        item.favorite ? colors.white : colors.grey02,
    },
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
    Current.topicId = item.topicId;

    nav.navigate(AuthorizedScreensEnum.threadDetails, {
      threadInfo: item,
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
