import React from "react";
import useTheme from "@followBack/Hooks/useTheme";
import { StyleSheet, View } from "react-native";

import IconButton from "@followBack/GenericElements/IconButton";

const VerifiedIcon: React.FC = ({}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.verifiedContainer}>
      <IconButton
        onPress={() => {}}
        name={"verified"}
        width={24}
        height={24}
        color={colors.blue03}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  verifiedContainer: {
    marginTop: -5,
    marginBottom: -30,
  },
});

export default VerifiedIcon;
