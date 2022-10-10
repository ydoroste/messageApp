import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UnauthorizedRouter from "./src/Routes/UnauthorizedRouter";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
      <NavigationContainer>
      <UnauthorizedRouter />
      <StatusBar style="auto" />
          <Text>hello</Text>

      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
