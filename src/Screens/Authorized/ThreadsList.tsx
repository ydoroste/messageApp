import Typography from '@followBack/GenericElements/Typography';
import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import useTheme from '@followBack/Hooks/useTheme';
import { FlashList } from '@shopify/flash-list';
import ThreadCard from '@followBack/Elements/ThreadCard';
import { useFetchthreadsList } from '@followBack/Hooks/Apis/ThreadsList';
import { useSearch } from '@followBack/Hooks/useSearch';
import { AuthorizedScreensEnum } from '@followBack/Navigation/Authorized/constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { authorizedStackNavigationProps } from '@followBack/Navigation/Authorized/types';
import { useMailBoxes } from '@followBack/Hooks/useMailboxes';
import LoadingScreen from '@followBack/Elements/LoadingScreen/LoadingScreen.index';
import { Thread } from '@followBack/Apis/threadsList/type';
import { Swipeable } from 'react-native-gesture-handler';
import IconButton from '@followBack/GenericElements/IconButton';
import { editBookmark } from '@followBack/Apis/Bookmarks';
import { getContactsListApi } from '@followBack/Apis/Contacts';
import {
  deleteContacts,
  getContacts,
  setContacts,
} from '@followBack/Utils/contactDetails';

const windowWidth = Dimensions.get('window').width;

const ThreadList: React.FC = () => {
  const nav = useNavigation<authorizedStackNavigationProps['navigation']>();
  const { data: mail } = useMailBoxes();
  const { id } = mail?.data.mailboxes?.find(
    (t) => t.mailbox.toLowerCase() === 'inbox'
  ) ?? { id: '' };
  const { colors } = useTheme();
  const { searchValue } = useSearch();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [threadsList, setthreadsList] = useState<Thread[]>([]);
  const [refetchData, setRefetchData] = useState(false);
  const { data, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
    useFetchthreadsList({ id, searchValue, refetchData });

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (!isInitialLoading) return;
    setIsInitialLoading(isLoading);
  }, [isLoading]);

  useFocusEffect(
    useCallback(() => {
      setRefetchData(true);
    }, [])
  );

  useFocusEffect(() => {
    const getContactsData = async () => {
      const contactsList = await getContacts();
      if (typeof contactsList !== typeof undefined && contactsList !== null) {
        return;
      }
      const contactsFromAPI = await getContactsListApi({ searchValue: '' });
      await setContacts(JSON.stringify(contactsFromAPI.contacts));
      console.log('contacts from API', contactsFromAPI);
    };
    getContactsData();
  });

  useEffect(() => {
    if (typeof data === typeof undefined) return;
    let flattenData = data?.pages
      ? data.pages.flatMap((page) => page?.data)
      : [];
    setthreadsList(flattenData);
  }, [data]);

  const onBookmarkPressed = async (item: Thread) => {
    await editBookmark({ threadId: item.threadId, bookmark: !item.favorite });
  };

  const renderRightActions = (item: Thread | undefined) => {
    if (!item) return <></>;
    return (
      <View style={{ width: windowWidth / 10, justifyContent: 'center' }}>
        <IconButton
          onPress={() => {
            onBookmarkPressed(item);
          }}
          name='pin'
          width={25}
          height={31}
          color={item.favorite ? colors.white : colors.grey01}
        />
      </View>
    );
  };

  if (isLoading) {
    return <LoadingScreen loadingText={'Loading'} loadingIndecatorSize={20} />;
  }
  if (isError)
    return (
      <View style={styles.emptyOrErrorMessageContainer}>
        <Typography color='secondary' type='largeRegularBody'>
          An error occurred while fetching data
        </Typography>
      </View>
    );

  const isEmptyList = threadsList.length === 0;
  if (isEmptyList) {
    return (
      <View style={styles.emptyOrErrorMessageContainer}>
        <Typography color='secondary' type='largeRegularBody'>
          no results
        </Typography>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
      style={{ flex: 1, backgroundColor: colors.black }}
    >
      {isLoading && (
        <Typography color='secondary' type='smallBoldBody'>
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
          <Typography type='largeRegularBody' color='secondary'>
            {threadsList.length} search results{' '}
          </Typography>
        )}
      </View>

      {isSuccess && !!threadsList && !isEmptyList && (
        <View style={styles.container}>
          <FlashList
            keyExtractor={(item, index) => {
              return item?.threadId ?? '' + '_' + index;
            }}
            scrollIndicatorInsets={{ right: 1 }}
            data={threadsList}
            renderItem={({ item }: { item: Thread }) => (
              <Swipeable
                renderRightActions={(progress, dragX) =>
                  renderRightActions(item)
                }
                rightThreshold={windowWidth / 10}
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
    backgroundColor: 'black',
  },
  searchCountWrapper: {
    alignSelf: 'center',
  },
  moveSearchCounter: {
    marginTop: 50,
  },
  emptyOrErrorMessageContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    backgroundColor: 'black',
    paddingTop: 50,
  },
});
