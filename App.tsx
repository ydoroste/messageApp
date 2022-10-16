import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UnauthorizedRouter from "./src/Routes/UnauthorizedRouter";
import { NavigationContainer } from '@react-navigation/native';
import * as React from "react";
import useInitialLoading from "./src/Hooks/useInitialLoading";
import { Provider as PaperProvider, MD3LightTheme  } from 'react-native-paper';

export default function App() {
        const [isAppLoaded] = useInitialLoading();

    if (!isAppLoaded) {
        return null;
    }
    return (
        <PaperProvider theme={}>

        <View style={{flex: 1}}>
      <NavigationContainer>
          <StatusBar style="light" />
          <UnauthorizedRouter />
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
