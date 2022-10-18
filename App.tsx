import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UnauthorizedNavigation from "@followBack/Navigation/Unauthorized";
import { NavigationContainer } from '@react-navigation/native';
import * as React from "react";
import useInitialLoading from "./src/Hooks/useInitialLoading";
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
        const [isAppLoaded] = useInitialLoading();

    if (!isAppLoaded) {
        return null;
    }
    return (
        <PaperProvider>

        <View style={{flex: 1}}>
      <NavigationContainer>
          <StatusBar style="light" />
          <UnauthorizedNavigation />
      </NavigationContainer>
      </View>
        </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
