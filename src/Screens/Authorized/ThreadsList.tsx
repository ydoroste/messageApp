import Typography from "@followBack/GenericElements/Typography";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
  Dimensions,
  ViewStyle,
  Text,
} from "react-native";

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
import {
  deleteContacts,
  getContacts,
  setContacts,
} from "@followBack/Utils/contactDetails";
import SkeletonLoader from "expo-skeleton-loader";
import SideOptions from "@followBack/GenericElements/SideOptions";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CachingLayer from "@followBack/Classes/CachingLayer";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ThreadList: React.FC = () => {
  const nav = useNavigation<authorizedStackNavigationProps["navigation"]>();
  const { mailboxes } = useMailBoxes();
  const { id } = mailboxes?.find(
    (t) => t.mailbox.toLowerCase() === "inbox"
  ) ?? { id: "" };
  const { colors } = useTheme();
  const { searchValue } = useSearch();
  const [threadsList, setthreadsList] = useState<Thread[]>(() => {
    return CachingLayer.mailBoxes.inbox.data ?? [];
  });

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useFetchthreadsList({
      id,
      searchValue,
      refetchData: true,
    });

  const isEmptyList = threadsList.length === 0;

  const shouldShowData = !!threadsList && !isEmptyList && !!threadsList[0];

  useFocusEffect(() => {
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
    if (typeof data === typeof undefined) return;
    let flattenData = data?.pages
      ? data.pages.flatMap((page) => page?.data)
      : [];

    CachingLayer.saveInBoxToDir(id, flattenData);
    setthreadsList(flattenData);
  }, [data]);

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

  const renderLeftActions = (item: Thread | undefined) => {
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
      ({ height, iconName, onPress, width, getColor }, index) => {
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

  const renderThreadItem = ({ item }: { item: Thread }) => {
    return (
      <Swipeable
        rightButtons={renderRightActions(item)}
        rightButtonWidth={30}
        leftButtons={renderLeftActions(item)}
      >
        <Pressable
          style={{ marginVertical: 5 }}
          onPress={() => {
            nav.navigate(AuthorizedScreensEnum.threadsListStack, {
              screen: AuthorizedScreensEnum.threadDetails,
              params: { threadInfo: item },
            });
          }}
        >
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
