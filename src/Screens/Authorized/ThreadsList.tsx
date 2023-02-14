import IconButton from "@followBack/GenericElements/IconButton";
import Typography from "@followBack/GenericElements/Typography";
import * as React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import useTheme from "@followBack/Hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import ThreadCard from "@followBack/Elements/ThreadCard";
import { useFetchthreadsList } from "@followBack/Hooks/Apis/ThreadsList";
import { useSearch } from "@followBack/Hooks/useSearch";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";

const Compose: React.FC = ({ navigation, route }) => {
  const { id, path } = route.params;
  const { colors } = useTheme();
  const { searchValue } = useSearch();
  const [isIitialLoading, setIsInitialLoading] = React.useState(true);
  const [threadsList, setthreadsList] = React.useState([]);
  const { data, isLoading, isError, isSuccess, hasNextPage, fetchNextPage } =
    useFetchthreadsList({ id, searchValue });

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  React.useEffect(() => {
    if (!isIitialLoading) return;
    setIsInitialLoading(isLoading);
  }, [isLoading]);

  React.useEffect(() => {
    if (typeof data === typeof undefined) return;

    const flattenData = !!data?.pages
      ? data.pages.flatMap((page) => page.data)
      : [];

    setthreadsList(flattenData);
  }, [data]);

  if (isError)
    return (
      <Typography color="secondary" type="smallBoldBody">
        An error occurred while fetching data
      </Typography>
    );

  const isEmptyList = threadsList.length === 0;

 

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
      style={{ flex: 1, backgroundColor: colors.black }}
    >
      {isIitialLoading && (
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
        {isSuccess && (
          <Typography type="largeRegularBody" color="secondary">
            {threadsList.length} search results{" "}
          </Typography>
        )}
      </View>

      {!!threadsList && !isEmptyList && (
        <SafeAreaView style={styles.container}>
          <FlashList
            keyExtractor={(item) => item.threadId}
            data={threadsList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(AuthorizedScreensEnum.threadsListStack, {
                    screen: AuthorizedScreensEnum.threadsListDetails,
                  });
                }}
              >
                <ThreadCard threadItem={item} />
              </TouchableOpacity>
            )}
            estimatedItemSize={100}
            onEndReached={loadNextPageData}
            onEndReachedThreshold={0.2}
          />
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
};
export default Compose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchCountWrapper: {
    alignSelf: "center",
  },
  moveSearchCounter: {
    marginTop: 50,
  },
});
