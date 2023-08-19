import * as React from 'react';
import { UserProvider } from '@followBack/Contexts/UserContext';
import MainApp from '@followBack/mainApp';
import { Dimensions } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { HoldMenuProvider } from 'react-native-hold-menu';
import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <MenuProvider>
          <MainApp />
        </MenuProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
};
export default App;
