import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UnauthorizedRouter from "./src/Routes/UnauthorizedRouter";
import { NavigationContainer } from '@react-navigation/native';
import * as React from "react";

export default function App() {
  return (
      <View style={{flex: 1}}>
      <NavigationContainer>
          <StatusBar style="light" />
          <UnauthorizedRouter />
      </NavigationContainer>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
