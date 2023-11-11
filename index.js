import { registerRootComponent } from "expo";
import messaging from "@react-native-firebase/messaging";

import { onDisplayNotification } from "@followBack/Utils/notifications";

import App from "./App";
import { LogBox } from 'react-native';

// Ignore specific yellow box warnings by adding their messages
LogBox.ignoreAllLogs(true);


messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

console.warn = () => {};
console.disableYellowBox = true;

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
