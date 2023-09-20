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
        <Typography type="smallRegularBody" color="chat">
          {"replying to "}
        </Typography>

        <Pressable onPress={_onReplyToPress}>
          <Typography
            type="smallRegularBody"
            textDecoration={"underline"}
            color="chat"
          >
            {`${item.from?.name?.split(" ")[0]}'s message`}
          </Typography>
        </Pressable>
      </View>

      <Pressable onPress={onCancelPress}>
        <Typography
          type="smallRegularBody"
          textDecoration={"underline"}
          color="chat"
        >
          {"cancel"}
        </Typography>
      </Pressable>
    </View>
  );
};

export default React.memo(ReplyToMessage);

const useStyles = useStylesWithTheme((theme) => ({
  container: {
    height: 24,
    backgroundColor: theme.colors.purple,
    marginBottom: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 4,
    paddingHorizontal: 32,
  },
  content: {
    flexDirection: "row",
  },
}));
