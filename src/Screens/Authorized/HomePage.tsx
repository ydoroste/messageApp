import SideOptions from "@followBack/GenericElements/SideOptions";
import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";

interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const onPress = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);
  return (
    <View style={styles.container}>
      <SideOptions onPress={onPress} selectedIndex={selectedIndex} />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: "black",
  },

  sideOptionsContainer: {},
});
