import React from "react";
import Typography from "@followBack/GenericElements/Typography";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
import { TouchableHighlight, View } from "react-native";

import IconButton from "@followBack/GenericElements/IconButton";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";
import { useMailBoxes } from "@followBack/Hooks/useMailboxes";
import { Feather } from '@expo/vector-icons';
import { ThreadDetailsHeaderProps } from "./threadDetailsHeader.types";

const ThreadDetailsHeader: React.FC<ThreadDetailsHeaderProps> = ({
  navigation,
  subject,
  receiver,
  firtMessageDate
}) => {

  const onBackButtonPress = () => {

    navigation?.navigate(
      AuthorizedScreensEnum.threadsListStack,
      {
        screen: AuthorizedScreensEnum.threadsList,
      }
    );
  };
  const { colors } = useTheme();
  const { styles } = useStyles();


  return (
    <View >
      <View style={styles.headerContainer}>
        <IconButton
          name="back"
          onPress={onBackButtonPress}
          color={colors.grey02}
          width={10}
          height={16}
        />
        <View style={styles.headerTitleContainer}>
          <View style={styles.textContainer}>
            <Typography type="mediumBoldTitle" textAlign="center" color={"primary"}>{receiver}</Typography>
          </View>
          <View style={styles.textContainer}>
            <Typography type="largeBoldBody" textAlign="center" color={"secondary"} >{subject}</Typography>
          </View>

          <Typography type="smallRegularBody" textAlign="center" color={"secondary"} >{firtMessageDate}</Typography>
        </View>

        <TouchableHighlight activeOpacity={1} style={{ borderRadius: 12 }}
          underlayColor={colors.grey01} onPress={() => null}>
          <Feather name="info" size={24} color={colors.grey02} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  headerTitleContainer: {
    alignItems: "center",
    maxWidth: "80%"
  },
  textContainer: {
    marginBottom: 10,
  },
}));

export default ThreadDetailsHeader;
