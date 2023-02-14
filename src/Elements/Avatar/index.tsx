import React from "react";
import { IAvatarProps } from "./types";
import { View, Text, Image } from "react-native";
import { Avatar } from "react-native-paper";
import Typography from "@followBack/GenericElements/Typography";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";

const AvatarItem: React.FC<IAvatarProps> = ({ imageURL }) => {
  const { styles } = useStyles();
  const {
    userDetails: { user_name },
  } = useUserDetails();
  return (
    <View style={styles.container}>
      {!!imageURL && (
        <Image size={55} source={{ uri: imageURL }} style={styles.avatar} />
      )}
      {!imageURL && <Text style={styles.userInitials}>{user_name[0]}</Text>}
    </View>
  );
};

export default AvatarItem;

const useStyles = useStylesWithTheme((theme) => ({
  container: {
    backgroundColor: theme.colors.grey01,
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    backgroundColor: theme.colors.grey01,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  },
  userInitials: {
    color: theme.colors.grey03,
    fontWeight: "700",
    fontSize: 18,
  },
}));
