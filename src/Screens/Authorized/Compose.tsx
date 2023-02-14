import IconButton from "@followBack/GenericElements/IconButton";
import Typography from "@followBack/GenericElements/Typography";
import * as React from "react";
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
import AutoCompleteTags from "@followBack/GenericElements/AutocompleteTags";
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";

const Compose: React.FC = ({ navigation }) => {
  const { colors } = useTheme();
  const [showSubject, setShowSubject] = useState(false);
  const [showCC, setShowCC] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
      style={{ flex: 1, backgroundColor: colors.black }}
    >
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <View>
          <View style={styles.header}>
            <Button
              icon={() => (
                <View style={{ marginLeft: -13 }}>
                  <Delete color={colors.grey02} height={16} width={15} />
                </View>
              )}
              type="mediumTernary"
            >
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
            {showBcc && (
              <View style={styles.fields}>
                <Typography color="primary" type="largeRegularBody">
                  bcc:{" "}
                </Typography>
                <View style={styles.input}>
                  <AutoCompleteTags />
                </View>
              </View>
            )}
            {showCC && (
              <View style={styles.fields}>
                <Typography color="primary" type="largeRegularBody">
                  cc:{" "}
                </Typography>
                <View style={styles.input}>
                  <AutoCompleteTags />
                </View>
              </View>
            )}
            <View style={styles.fields}>
              <Typography color="primary" type="largeRegularBody">
                to:{" "}
              </Typography>
              <View style={styles.input}>
                <AutoCompleteTags />
              </View>
            </View>
          </View>

          <Divider />

          {showSubject && (
            <View style={styles.fields}>
              <Typography color="primary" type="largeRegularBody">
                subject:{" "}
              </Typography>
              <View style={styles.input}>
                <InputField hideBorder placeholder="add" />
              </View>
            </View>
          )}
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
              multiline
              mode="outlined"
              placeholder="send a message..."
            />
          </View>
          <IconButton
            onPress={() => {
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
    //margin: 8
  },
  sendActions: {
    flexDirection: "row",
    alignItems: "center",
  },
});
