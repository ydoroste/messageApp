import { View } from "react-native";
import React, { useState } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import IconButton from "@followBack/GenericElements/IconButton";
import InputField from "@followBack/GenericElements/InputField";
import useTheme from "@followBack/Hooks/useTheme";
import { useSearch } from "@followBack/Hooks/useSearch";

interface IAuthorizedHeaderProps extends NativeStackHeaderProps {
  hideSearch: boolean;
}
const AuthorizedHeader: React.FC<IAuthorizedHeaderProps> = ({
  navigation,
  route,
  options,
  back,
  hideSearch,
}) => {
  const { styles } = useStyles();
  const { colors } = useTheme();
  const { searchValue, setSearchValue } = useSearch();

  const onChange = (text) => setSearchValue(text);
  const clearSearch = () => setSearchValue("");
  const contentStyles = hideSearch
    ? styles.content
    : [styles.content, styles.contentWithSearch];

  const headerStyles = hideSearch
    ? styles.headerStyle
    : [styles.headerStyle, styles.headerWithSearchStyle];
  return (
    <View style={headerStyles}>
      <View style={contentStyles}>
        <IconButton
          onPress={navigation.toggleDrawer}
          name="drawer"
        ></IconButton>
        {!hideSearch && (
          <View style={{ flex: 1 }}>
            <InputField
              // @ts-ignore
              placeholder={"try searching for ‘to: mike’"}
              onChangeText={onChange}
              value={searchValue}
              hideBorder
            />
          </View>
        )}

        {!hideSearch && (
          <IconButton
            onPress={clearSearch}
            name="close"
            width={16}
            height={16}
            color={colors.grey02}
          ></IconButton>
        )}
      </View>
    </View>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  headerStyle: {
    paddingHorizontal: 10,
    paddingBottom: 16,
    backgroundColor: theme.colors.black,
  },

  headerWithSearchStyle: {
    paddingHorizontal: 20,
  },

  content: {
    flexDirection: "row",
  },

  contentWithSearch: {
    borderWidth: 1,
    borderBottomColor: "#696969",
    justifyContent: "space-between",
    alignItems: "center",
  },
  drawerIcon: {},
}));
export default AuthorizedHeader;
