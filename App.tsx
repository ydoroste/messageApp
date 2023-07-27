import * as React from 'react';
import { UserProvider } from '@followBack/Contexts/UserContext';
import MainApp from '@followBack/mainApp';
import { Dimensions } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

const App: React.FC = () => {
  return (
    <UserProvider>
      <MenuProvider>
        <MainApp />
      </MenuProvider>
    </UserProvider>
  );
};
export default App;
