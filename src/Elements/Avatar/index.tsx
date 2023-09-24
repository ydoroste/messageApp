import React from "react";
import { IAvatarProps } from "./types";
import { View, Text, Image } from "react-native";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import Hidden from "@followBack/Theme/Icons/Hidden";
import { IContact } from "@followBack/Apis/Contacts/types";

const AvatarItem: React.FC<IAvatarProps> = ({
  users,
  imageURL,
}: {
  users: IContact[];
  imageURL: string;
}) => {
  const { styles } = useStyles();

  const hasTwoUsers = users.length === 2;
  const isMultiChat = users.length > 2;

  const isGroup = hasTwoUsers || isMultiChat;
  const containerStyles = isGroup
    ? [styles.multiUsersContainer]
    : imageURL
    ? [styles.imageContainer]
    : [styles.singleUserContainer];

  const userInitialsStyles = isGroup
    ? [styles.multiUsersInitials]
    : [styles.singleUserInitials];

  return (
    <View style={containerStyles}>
      {users.map(({ imageURL: userImage, name, address }, index) => {
        const userName = name?.trim();
        const firstChar = userName?.length > 0 ? userName[0] : address[0];

        const isFirstUser = index === 0;
        const isOthers = !isFirstUser && isGroup;
        const currentContainerStyles = isFirstUser
          ? [styles.center, styles.firstUserAvatarPosition]
          : [styles.center, styles.othersAvatarPosition];

        const image = userImage || imageURL;

        return (
          <View key={index} style={currentContainerStyles}>
            {!!image && isFirstUser && (
              <Image
                style={styles.firstUserAvatarPosition}
                source={{ uri: image }}
              />
            )}

            {!image && isFirstUser && (
              <Text style={userInitialsStyles}>{firstChar?.toUpperCase()}</Text>
            )}

            {isOthers && (
              <Text style={userInitialsStyles}>
                {hasTwoUsers ? firstChar.toUpperCase() : `+${users.length - 1}`}
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
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    borderRadius: 55 / 2,
    width: 55,
    height: 55,
    position: "relative",
  },

  singleUserContainer: {
    borderRadius: 55 / 2,
    width: 55,
    height: 55,
    backgroundColor: theme.colors.grey01,
    position: "relative",
  },

  multiUsersContainer: {
    borderRadius: 34 / 2,
    width: 34,
    height: 34,
    backgroundColor: theme.colors.grey01,
    position: "relative",
  },

  firstUserAvatarPosition: {
    width: "100%",
    height: "100%",
  },

  othersAvatarPosition: {
    position: "absolute",
    top: 34 / 2,
    backgroundColor: theme.colors.grey01,
    left: 34 / 2,
    borderRadius: 34 / 2,
    width: 34,
    height: 34,
    borderColor: theme.colors.black,
    borderWidth: 1,
  },

  avatar: {
    backgroundColor: theme.colors.grey01,
    width: "100%",
    height: "100%",
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
