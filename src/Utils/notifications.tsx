import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";

import DeviceInfo from "react-native-device-info";
import { addDevice, deleteDevice } from "@followBack/Apis/Notifications";

export function isStringified(str: any) {
  try {
    return JSON.parse(str);
  } catch (error) {
    return str;
  }
}

const notificationListener = (navigationRef: any) => {
  const navigateToThreadInfo = (remoteMessage: any) => {
    const threadInfo = isStringified(remoteMessage.data.threadInfo);

    navigationRef.current.navigate(AuthorizedScreensEnum.threadsListStack, {
      screen: AuthorizedScreensEnum.threadDetails,
      params: { threadInfo },
    });
  };
  messaging().onNotificationOpenedApp((remoteMessage) => {
    //when background
    if (remoteMessage) {
      navigateToThreadInfo(remoteMessage);
    }
  });

  messaging()
    .getInitialNotification() //when close
    .then((remoteMessage) => {
      if (remoteMessage) {
        navigateToThreadInfo(remoteMessage);
      }
    });

  notifee.onForegroundEvent(({ type, detail }) => {
    if (detail.pressAction?.id === "default") {
      navigateToThreadInfo(detail.notification?.data);
    }
  });
};

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
};

const getNotificationToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    const macAddress = await DeviceInfo.getUniqueId();
    console.log(macAddress);
    await deleteDevice(macAddress);
    await addDevice({ deviceId: macAddress, notificationToken: token });
    return token;
  } catch (error) {
    return Promise.reject(error);
  }
};

async function onDisplayNotification({
  title,
  body,
  data,
}: {
  title: string;
  body: string;
  data: any;
}) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      importance: AndroidImportance.HIGH,
      sound: "default",
      channelId,
      // smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: "default",
      },
    },
    data: {
      data: { threadInfo: data },
    },
  });
}

export {
  notificationListener,
  getNotificationToken,
  requestUserPermission,
  onDisplayNotification,
};
