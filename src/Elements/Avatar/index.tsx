import React from "react";
import { IAvatarProps } from "./types";
import { View, Text, Image } from "react-native";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";

const AvatarItem: React.FC<IAvatarProps> = ({ users }) => {
  const { styles } = useStyles();

  const hasTwoUsers = users.length === 2;
  const isMultiChat = users.length > 2;

  const isGroup = hasTwoUsers || isMultiChat;
  const containerStyles = isGroup
    ? [styles.multiUsersContainer]
    : [styles.singleUserContainer];

  const userInitialsStyles = isGroup
    ? [styles.multiUsersInitials]
    : [styles.singleUserInitials];

  return (
    <View style={containerStyles}>
      {users.map(({ imageURL, name, address }, index) => {
        const firstChar =  name.length > 0 ? name[0] :  address[0]

        const isFirstUser = index === 0;
        const isOthers = !isFirstUser && isGroup;

        const currentContainerStyles = isFirstUser
          ? [styles.center, styles.firstUserAvatarPosiion]
          : [styles.center, styles.othersAvatarPosition];

        const avatarSize = hasTwoUsers ? 25 : 55;

        return (
          <View key={index} style={currentContainerStyles}>
            {!!imageURL && isFirstUser && (
              <Image
                size={avatarSize}
                source={{ uri: imageURL }}
                style={styles.avatar}
              />
            )}

            {!imageURL && isFirstUser && (
              <Text style={userInitialsStyles}>{firstChar}</Text>
            )}

            {isOthers && (
              <Text style={userInitialsStyles}>
                {hasTwoUsers ? (firstChar) : users.length - 1}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default AvatarItem;

const useStyles = useStylesWithTheme((theme) => ({
  center: {
    backgroundColor: theme.colors.grey01,
    justifyContent: "center",
    alignItems: "center",
  },
  multiUsersContainer: {
    position: "relative",
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
  },

  singleUserContainer: {
    borderRadius: 55 / 2,
    width: 55,
    height: 55,
  },
  othersAvatarPosition: {
    position: "absolute",
    top: 25 / 2,
    left: 25 / 2,
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
  },

  firstUserAvatarPosiion: {
    width: "100%",
    height: "100%",
    borderRadius: 55 / 2,
  },

  avatar: {
    backgroundColor: theme.colors.grey01,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  },
  singleUserInitials: {
    color: theme.colors.grey03,
    fontWeight: "700",
    fontSize: 18,
  },

  multiUsersInitials: {
    color: theme.colors.grey03,
    fontWeight: "700",

    fontSize: theme.fontSizes.small,
  },
}));
