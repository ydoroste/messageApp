import * as React from 'react';
import { UserProvider } from '@followBack/Contexts/UserContext';
import MainApp from '@followBack/mainApp';
import { HoldMenuProvider } from 'react-native-hold-menu';
import { Dimensions } from 'react-native';

const App: React.FC = () => {
  const { width, height } = Dimensions.get('window');
  return (
    <UserProvider>
      <HoldMenuProvider
        theme='dark'
        safeAreaInsets={{
          top: 0,
          bottom: Math.ceil(height / 3.5) + 50,
          right: 0,
          left: 0,
        }}
      >
        <MainApp />
      </HoldMenuProvider>
    </UserProvider>
  );
};
export default App;
