import React from "react";
import Typography from "@followBack/GenericElements/Typography";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
import { View } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import IconButton from "@followBack/GenericElements/IconButton";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import AvatarItem from "@followBack/Elements/Avatar";

interface ThreadDetailsHeaderProps extends NativeStackHeaderProps {
  subject: string;
  chatUsers: { name: string; address: string };
}

const ThreadDetailsHeader: React.FC<ThreadDetailsHeaderProps> = ({
  navigation,
  subject,
  chatUsers,
}) => {
  const { isLoading, userDetails } = useUserDetails();
  const canGoBack = navigation.canGoBack();
  const onBackButtonPress = () => {
    canGoBack && navigation.goBack();
  };
  const { colors } = useTheme();
  const { styles } = useStyles();

  const isMultiChat = chatUsers.length > 1;

  const avatarStyles = isMultiChat
    ? [styles.avatarWrapper, styles.multiAvatarWrapper]
    : styles.avatarWrapper;
  return (
    <View style={styles.headerStyle}>
      <View style={styles.leftSection}>
        <View style={avatarStyles}>
          <AvatarItem users={chatUsers} />
        </View>
        <View>
          <Typography type="largeBoldTitle" color={"primary"}>
            {subject}
          </Typography>
          {/* <Typography type="smallRegularBody" color={"primary"}>
            {userDetails.user_name}
          </Typography> */}
        </View>
      </View>
    </View>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  headerStyle: {
    flexDirection: "row",
    backgroundColor: theme.colors.black,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 0,
  },

  leftSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarWrapper: {
    marginRight: 7,
  },

  multiAvatarWrapper: {
    marginRight: 18,
  },
}));

export default ThreadDetailsHeader;
