import * as React from "react";
import { UserProvider } from "@followBack/Contexts/UserContext";
import MainApp from "@followBack/mainApp";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <MainApp />
      </UserProvider>
    </SafeAreaProvider>
  );
};
export default App;
