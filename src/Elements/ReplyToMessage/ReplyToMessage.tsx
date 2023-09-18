import { IThreadMessage } from "@followBack/Apis/ThreadMessages/types";
import Typography from "@followBack/GenericElements/Typography";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import * as React from "react";
import { View, Pressable } from "react-native";

interface ReplyToMessageProps {
  item: IThreadMessage;
  onCancelPress: () => void;
  onReplyToPress: (index: number) => void;
}

const ReplyToMessage = ({
  item,
  onCancelPress,
  onReplyToPress,
}: ReplyToMessageProps) => {
  const { styles } = useStyles();

  const _onReplyToPress = () => {
    onReplyToPress(item?.index as number);
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Typography type="largeRegularBody" color="chat">
          {"replying to: "}
        </Typography>

        <Pressable onPress={_onReplyToPress}>
          <Typography
            style={{ textDecorationLine: "underline", color: "white" }}
            type="largeBoldBody"
            color="chat"
          >
            {item.text.slice(0, 25).concat("...")}
          </Typography>
        </Pressable>
      </View>

      <Pressable onPress={onCancelPress}>
        <Typography
          style={{ textDecorationLine: "underline", color: "white" }}
          type="largeBoldBody"
          color="chat"
        >
          {"cancel"}
        </Typography>
      </Pressable>
    </View>
  );
};

export default ReplyToMessage;

const useStyles = useStylesWithTheme((theme) => ({
  container: {
    height: 24,
    backgroundColor: theme.colors.purple,
    marginBottom: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  content: {
    flexDirection: "row",
    alignItems: "baseline",
  },
}));
