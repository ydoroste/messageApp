import IconButton from "@followBack/GenericElements/IconButton";
import Typography from "@followBack/GenericElements/Typography";
import React, { useCallback, useReducer } from "react";
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
import Divider from "@followBack/GenericElements/Divider";
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";
import { ComposeAutoComplete } from "@followBack/Elements/ComposeAutoComplete";
import { useCompose } from "@followBack/Hooks/Apis/Compose";
import { IComposeApiRequest } from "@followBack/Apis/Compose/types";
import { isValidEmail } from "@followBack/Utils/validations";
import { useFocusEffect } from "@react-navigation/native";
import { useMailBoxes } from "@followBack/Hooks/useMailboxes";
import MailSender from "@followBack/Elements/MailSender/MailSender";

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
  showSubject: true,
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
  const { sentMailThread } = useMailBoxes();

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
    navigation.navigate(AuthorizedScreensEnum.composeStack, {
      screen: AuthorizedScreensEnum.threadDetails,
      params: { id: data?.thread },
    });
  };

  const onChangeMailContent = ({ value }) => {
    setKeyValue({ key: "mail", value });
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
            <View style={styles.flexCenter}>
              <View style={styles.back}>
                <IconButton
                  name="back"
                  onPress={() => {
                    if (navigation.canGoBack()) return navigation.goBack();
                    if (!sentMailThread) return;

                    navigation.navigate(
                      AuthorizedScreensEnum.threadsListStack,
                      {
                        screen: AuthorizedScreensEnum.threadsList,
                        params: { ...sentMailThread },
                      }
                    );
                  }}
                  color={colors.grey02}
                  width={10}
                  height={16}
                />
              </View>

              <View style={styles.flexCenter}>
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
              delete
            </Button>
          </View>

          <View style={styles.fieldsContainer}>
            <Divider />

            {showSubject && (
              <View style={styles.flexCenter}>
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
              <View style={styles.flexCenter}>
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
              <View style={styles.flexCenter}>
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
            <View style={styles.flexCenter}>
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
        <MailSender
            onPressCompose={onPressCompose}
            onChangeMailContent={onChangeMailContent}
            mail={mail}
          />
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

  input: {
    flex: 1,
  },
  flexCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  subject: {
    marginRight: 16,
  },
  back: {
    marginRight: 20,
  },
});
