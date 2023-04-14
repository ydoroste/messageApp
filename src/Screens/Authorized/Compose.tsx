import IconButton from "@followBack/GenericElements/IconButton";
import Typography from "@followBack/GenericElements/Typography";
import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import useTheme from "@followBack/Hooks/useTheme";
import Button from "@followBack/GenericElements/Button";
import InputField from "@followBack/GenericElements/InputField";
import Divider from "@followBack/GenericElements/Divider";
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";
import ComposeAutoComplete from "@followBack/Elements/ComposeAutoComplete/composeAutoComplete.index";
import { useCompose } from "@followBack/Hooks/Apis/Compose";
import { IComposeApiRequest } from "@followBack/Apis/Compose/types";
import { isValidEmail } from "@followBack/Utils/validations";
import { useFocusEffect } from "@react-navigation/native";
import { useMailBoxes } from "@followBack/Hooks/useMailboxes";
import MailSender from "@followBack/Elements/MailSender/MailSender";
import { Ionicons } from '@expo/vector-icons';
import { theme } from "@followBack/Theme/Theme";
import { TextInput } from "react-native-gesture-handler";

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
  showCcBcc: false,
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
  const [toFieldIsFocused, setToFieldIsFocused] = useState(false);
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
    showCcBcc,
  } = state;
  const toFieldRef = useRef<TextInput>(null);

  const setKeyValue = ({ key, value }: { key: string, value: any }) => {
    dispatch({
      type: SET_KEY_VALUE,
      payload: { key, value },
    });
  };

  const { colors } = useTheme();

  const formatTags = (tags: string[]) => tags.map((mail) => ({ address: mail.trim() }));

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
      if (toFieldRef.current) {
        setTimeout(() => toFieldRef?.current?.focus(), 500);
      };
      return () => {
        reset();
      };
    }, [])
  );

  const { refetch } = useCompose(composeRequest);
  const onPressCompose = async () => {
    if (!subject || toTags.length < 0) return;
    const { data } = await refetch();
    console.log("data", data)
    if (data?.["success"]) {
      navigation.navigate(AuthorizedScreensEnum.composeStack, {
        screen: AuthorizedScreensEnum.threadDetails,
        params: { id: data.thread },
      });
    }
  };

  const onChangeMailContent = ({ value }: { value: any }) => {
    setKeyValue({ key: "mail", value });
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 100}
      style={{ flex: 1, backgroundColor: colors.black }}
    >
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <View >
          <View style={styles.header}>
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

            <TouchableHighlight activeOpacity={1} style={{ borderRadius: 12 }}
              underlayColor={colors.grey01} onPress={() => reset()}>
              <Ionicons name="ios-trash-sharp" size={24} color={colors.grey02} />
            </TouchableHighlight>
          </View>

          <View style={styles.fieldsContainer}>

            <View style={styles.toFieldContainer}>
              <View style={styles.fieldtitle}>
                <Typography color="primary" type="largeRegularBody">
                  to:{" "}
                </Typography>
              </View>

              <View style={{ width: "82%" }}>
                <ComposeAutoComplete
                  //@ts-ignore
                  ref={toFieldRef}
                  onFocus={() => {
                    setToFieldIsFocused(true)
                  }}
                  onBlur={() => {
                    setToFieldIsFocused(false)
                  }}
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
              {toFieldIsFocused && <View style={styles.ccBcButtonsContainer}>
                <Button
                  onPress={() =>
                    setKeyValue({ key: "showCcBcc", value: !showCcBcc })
                  }
                  type="mediumTernary"
                >
                  cc/bcc
                </Button>
              </View>}
            </View>

            {showCcBcc && (
              <>
                <View style={styles.ccFieldContainer}>
                  <View style={styles.fieldtitle}>
                    <Typography color="primary" type="largeRegularBody">
                      cc:{" "}
                    </Typography>
                  </View>
                  <View style={styles.input}>
                    <ComposeAutoComplete
                      searchValue={ccSearchValue}
                      setSearchValue={(text) => setKeyValue({ key: "ccSearchValue", value: text })}
                      tags={ccTags}
                      setTags={(tags) => setKeyValue({ key: "ccTags", value: tags })}
                      type={"cc"} />
                  </View>
                </View>
                <View style={styles.bcFieldContainer}>
                  <View style={styles.fieldtitle}>
                    <Typography color="primary" type="largeRegularBody">
                      bcc:{" "}
                    </Typography>
                  </View>
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
              </>
            )}

            <Divider />

            <View style={styles.subjectFieldContainer}>
              <View style={{paddingVertical:8}}>
              <Typography color="primary" type="largeRegularBody">
                subject:{" "}
              </Typography>
              </View>
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
    position: "relative"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: Platform.OS === "ios" ? 20 : 0,
  },
  actionButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  fieldsContainer: {
  },
  input: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: 200,
  },
  ccFieldContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    zIndex: 9,
    marginBottom: 2
  },
  bcFieldContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    zIndex: 8
  },
  subjectFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  toFieldContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    zIndex: 10,
    marginBottom: 2
  },
  fieldtitle: {
    paddingTop: 4
  },
  subject: {
    marginRight: 16,
  },
  ccBcButtonsContainer: {
    flexDirection: "row",
    alignSelf: "flex-end"
  }
});
