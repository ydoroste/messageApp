import * as React from "react";
import MainApp from "@followBack/mainApp";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  );
};
export default App;
