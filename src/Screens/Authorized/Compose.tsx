import IconButton from "@followBack/GenericElements/IconButton";
import Typography from "@followBack/GenericElements/Typography";
<<<<<<< Updated upstream
import * as React from "react";
=======
import React, { useCallback, useReducer } from "react";
>>>>>>> Stashed changes
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import useTheme from "@followBack/Hooks/useTheme";
import Button from "@followBack/GenericElements/Button";
import InputField from "@followBack/GenericElements/InputField";
import Delete from "@followBack/Theme/Icons/Delete";
import { useState } from "react";
import Divider from "@followBack/GenericElements/Divider";
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";
import { ComposeAutoComplete } from "@followBack/Elements/ComposeAutoComplete";
import { useCompose } from "@followBack/Hooks/Apis/Compose";
import { IComposeApiRequest } from "@followBack/Apis/Compose/types";
import { isValidEmail } from "@followBack/Utils/validations";
<<<<<<< Updated upstream
const Compose: React.FC = ({ navigation }) => {
  const [toSearchValue, setToSearchValue] = useState("");
  const [ccSearchValue, setcCSearchValue] = useState("");
  const [bccSearchValue, setBccSearchValue] = useState("");
=======
import { useFocusEffect } from "@react-navigation/native";

const SET_TO_SEARCH_VALUE = "SET_TO_SEARCH_VALUE";
const SET_CC_SEARCH_VALUE = "SET_CC_SEARCH_VALUE";
const SET_BCC_SEARCH_VALUE = "SET_BCC_SEARCH_VALUE";

const SET_SUBJECT = "SET_SUBJECT";
const SET_MAIL = "SET_MAIL";
const SET_TO_TAGS = "SET_TO_TAGS";
const SET_CC_TAGS = "SET_CC_TAGS";
const SET_BCC_TAGS = "SET_BCC_TAGS";

const SET_KEY_VALUE = "SET_KEY_VALUE";

const RESET = "RESET";

const initialState = {
  toSearchValue: "",
  ccSearchValue: "",
  bccSearchValue: "",
  toTags: [],
  ccTags: [],
  bccTags: [],
  subject: "",
  mail: "",
  showSubject: false,
  showCC: false,
  showBcc: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_KEY_VALUE:
      return { ...state, [payload.key]: payload.value };

    case RESET:
      return initialState;

    default:
      return state;
  }
};

const Compose: React.FC = ({ navigation }) => {
  const { inboxThread } = useMailBoxes();

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    toSearchValue,
    ccSearchValue,
    bccSearchValue,
    toTags,
    ccTags,
    bccTags,
    mail,
    subject,
    showSubject,
    showCC,
    showBcc,
  } = state;
>>>>>>> Stashed changes

  const setKeyValue = ({ key, value }) => {
    dispatch({
      type: SET_KEY_VALUE,
      payload: { key, value },
    });
  };

  const { colors } = useTheme();

  const formatTags = (tags) => tags.map((mail) => ({ address: mail.trim() }));
  const formattedToTags = formatTags(toTags);
  const formattedCcTags = formatTags(ccTags);
  const formattedBccTags = formatTags(bccTags);

  const composeRequest: IComposeApiRequest = {
    subject,
    text: mail,
    to: isValidEmail(toSearchValue)
      ? [...formattedToTags, { address: toSearchValue }]
      : formattedToTags,
    cc: isValidEmail(ccSearchValue)
      ? [...formattedCcTags, { address: ccSearchValue }]
      : formattedCcTags,
    bcc: isValidEmail(bccSearchValue)
      ? [...formattedBccTags, { address: bccSearchValue }]
      : formattedBccTags,
  };

<<<<<<< Updated upstream
  const { refetch } = useCompose(composeRequest);
  const onPressCompose = async () => {
    if (!subject || toTags.length < 0) return;
    await refetch();

=======
  const reset = () => {
    dispatch({ type: RESET, payload: null });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset();
      };
    }, [])
  );

  const { refetch } = useCompose(composeRequest);
  const onPressCompose = async () => {
    if (!subject || toTags.length < 0) return;
    const { data } = await refetch();
>>>>>>> Stashed changes
    navigation.navigate(AuthorizedScreensEnum.composeStack, {
      screen: AuthorizedScreensEnum.threadDetails,
      params: {},
    });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
      style={{ flex: 1, backgroundColor: colors.black }}
    >
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <View>
          <View style={styles.header}>
<<<<<<< Updated upstream
            <Button
              icon={() => (
                <View style={{ marginLeft: -13 }}>
                  <Delete color={colors.grey02} height={16} width={15} />
                </View>
              )}
              type="mediumTernary"
            >
=======
            <View style={styles.leftHeaderActions}>
              <View style={styles.back}>
                <IconButton
                  name="back"
                  onPress={() => {
                    if (navigation.canGoBack()) return navigation.goBack();
                    if (!inboxThread) return;

                    navigation.navigate(
                      AuthorizedScreensEnum.threadsListStack,
                      {
                        screen: AuthorizedScreensEnum.threadsList,
                        params: { ...inboxThread },
                      }
                    );
                  }}
                  color={colors.grey02}
                  width={10}
                  height={16}
                />
              </View>

              <View style={styles.mailActions}>
                <View style={styles.subject}>
                  <Button
                    onPress={() =>
                      setKeyValue({ key: "showSubject", value: !showSubject })
                    }
                    type="mediumTernary"
                  >
                    subject
                  </Button>
                </View>
                <View>
                  <Button
                    onPress={() =>
                      setKeyValue({ key: "showCC", value: !showCC })
                    }
                    type="mediumTernary"
                  >
                    cc/
                  </Button>
                </View>
                <View>
                  <Button
                    onPress={() =>
                      setKeyValue({ key: "showBcc", value: !showBcc })
                    }
                    type="mediumTernary"
                  >
                    bcc
                  </Button>
                </View>
              </View>
            </View>

            <Button onPress={reset} style={styles.delete} type="mediumTernary">
>>>>>>> Stashed changes
              delete
            </Button>

            <View style={styles.actionButtons}>
              <View style={{ marginHorizontal: 4 }}>
                <Button
                  onPress={() => setShowSubject(!showSubject)}
                  type="mediumTernary"
                >
                  subject
                </Button>
              </View>
              <View style={{ marginHorizontal: 4 }}>
                <Button onPress={() => setShowCC(!showCC)} type="mediumTernary">
                  cc
                </Button>
              </View>
              <View style={{ marginHorizontal: 4 }}>
                <Button
                  onPress={() => setShowBcc(!showBcc)}
                  type="mediumTernary"
                >
                  bcc
                </Button>
              </View>
            </View>
          </View>

          <View style={styles.fieldsContainer}>
            <Divider />

            {showSubject && (
              <View style={styles.fields}>
                <Typography color="primary" type="largeRegularBody">
                  subject:{" "}
                </Typography>
                <View style={styles.input}>
                  <InputField
                    hideBorder
                    placeholder="add"
                    value={subject}
                    onChangeText={(text) =>
                      setKeyValue({ key: "subject", value: text })
                    }
                  />
                </View>
              </View>
            )}

            {showBcc && (
              <View style={styles.fields}>
                <Typography color="primary" type="largeRegularBody">
                  bcc:{" "}
                </Typography>
                <View style={styles.input}>
                  <ComposeAutoComplete
                    searchValue={bccSearchValue}
                    setSearchValue={(text) =>
                      setKeyValue({ key: "bccSearchValue", value: text })
                    }
                    tags={bccTags}
                    setTags={(tags) =>
                      setKeyValue({ key: "bccTags", value: tags })
                    }
                    type={"bcc"}
                  />
                </View>
              </View>
            )}
            {showCC && (
              <View style={styles.fields}>
                <Typography color="primary" type="largeRegularBody">
                  cc:{" "}
                </Typography>
                <View style={styles.input}>
                  <ComposeAutoComplete
                    searchValue={ccSearchValue}
                    setSearchValue={(text) =>
                      setKeyValue({ key: "ccSearchValue", value: text })
                    }
                    tags={ccTags}
                    setTags={(tags) =>
                      setKeyValue({ key: "ccTags", value: tags })
                    }
                    type={"cc"}
                  />
                </View>
              </View>
            )}
            <View style={styles.fields}>
              <Typography color="primary" type="largeRegularBody">
                to:{" "}
              </Typography>
              <View style={styles.input}>
                <ComposeAutoComplete
                  searchValue={toSearchValue}
                  setSearchValue={(text) =>
                    setKeyValue({ key: "toSearchValue", value: text })
                  }
                  tags={toTags}
                  setTags={(tags) =>
                    setKeyValue({ key: "toTags", value: tags })
                  }
                  type={"to"}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.sendActions}>
          <IconButton
            onPress={() => {}}
            name="add"
            width={17}
            height={17}
            color={colors.grey02}
          />
          <View style={styles.input}>
            <InputField
              value={mail}
              onChangeText={(mail) => setKeyValue({ key: "mail", value: mail })}
              multiline
              mode="outlined"
              placeholder="write a message..."
            />
          </View>
          <IconButton
            onPress={() => {
              onPressCompose();
              navigation.navigate(AuthorizedScreensEnum.composeStack, {
                screen: AuthorizedScreensEnum.threadsListDetails,
              });
            }}
            name="send"
            width={17}
            height={17}
            color={colors.grey01}
          />
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};
export default Compose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  actionButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  fieldsContainer: {
    flexDirection: "column-reverse",
  },
  fields: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
  },
  sendActions: {
    flexDirection: "row",
    alignItems: "center",
  },
});
