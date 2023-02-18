import IconButton from "@followBack/GenericElements/IconButton";
import Typography from "@followBack/GenericElements/Typography";
import React, { useCallback } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import useTheme from "@followBack/Hooks/useTheme";
import { useMailBoxes } from "@followBack/Hooks/useMailboxes";

import Button from "@followBack/GenericElements/Button";
import InputField from "@followBack/GenericElements/InputField";
import { useState } from "react";
import Divider from "@followBack/GenericElements/Divider";
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";
import { ComposeAutoComplete } from "@followBack/Elements/ComposeAutoComplete";
import { useCompose } from "@followBack/Hooks/Apis/Compose";
import { IComposeApiRequest } from "@followBack/Apis/Compose/types";
import { isValidEmail } from "@followBack/Utils/validations";
import { useFocusEffect } from "@react-navigation/native";

const Compose: React.FC = ({ navigation }) => {
  const { inboxThread } = useMailBoxes();

  const [toSearchValue, setToSearchValue] = useState("");
  const [ccSearchValue, setcCSearchValue] = useState("");
  const [bccSearchValue, setBccSearchValue] = useState("");

  const [toTags, setToTags] = useState([]);
  const [ccTags, setCcTags] = useState([]);
  const [bccTags, setBccTags] = useState([]);

  const [subject, setSubject] = useState("");

  const [mail, setMail] = useState("");

  const { colors } = useTheme();
  const [showSubject, setShowSubject] = useState(false);
  const [showCC, setShowCC] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  const formatTags = (tags, searchValue) => {
    const formattedTags = tags.map((mail) => ({ address: mail.trim() }));
    return isValidEmail(searchValue)
      ? [...formattedTags, { address: searchValue }]
      : formattedTags;
  };

  const composeRequest: IComposeApiRequest = {
    subject,
    text: mail,
    to: formatTags(toTags, toSearchValue),
    cc: formatTags(ccTags, ccSearchValue),
    bcc: formatTags(bccTags, bccSearchValue),
  };

  const reset = () => {
    setToSearchValue("");
    setcCSearchValue("");
    setBccSearchValue("");
    setSubject("");
    setToTags([]);
    setCcTags([]);
    setBccTags([]);
    setShowSubject(false);
    setShowCC(false);
    setMail("");

    setShowBcc(false);
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
    console.log("data", data);
    navigation.navigate(AuthorizedScreensEnum.composeStack, {
      screen: AuthorizedScreensEnum.threadDetails,
      params: { id: 1 },
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
                    onPress={() => setShowSubject(!showSubject)}
                    type="mediumTernary"
                  >
                    subject
                  </Button>
                </View>
                <View>
                  <Button
                    onPress={() => setShowCC(!showCC)}
                    type="mediumTernary"
                  >
                    cc/
                  </Button>
                </View>
                <View>
                  <Button
                    onPress={() => setShowBcc(!showBcc)}
                    type="mediumTernary"
                  >
                    bcc
                  </Button>
                </View>
              </View>
            </View>

            <Button style={styles.delete} type="mediumTernary">
              delete
            </Button>
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
                    onChangeText={setSubject}
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
                    setSearchValue={setBccSearchValue}
                    tags={bccTags}
                    setTags={setBccTags}
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
                    setSearchValue={setcCSearchValue}
                    tags={ccTags}
                    setTags={setCcTags}
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
                  setSearchValue={setToSearchValue}
                  tags={toTags}
                  setTags={setToTags}
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
              onChangeText={setMail}
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
    alignItems: "center",
    marginBottom: 10,
  },

  back: {
    marginRight: 21,
  },

  subject: {
    marginRight: 16,
  },
  leftHeaderActions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  mailActions: {
    display: "flex",
    flexDirection: "row",
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
