import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import {
  getNotificationToken,
  isStringified,
  notificationListener,
  onDisplayNotification,
  requestUserPermission,
} from "@followBack/Utils/notifications";
import Current from "@followBack/Classes/Current";
import { AuthorizedScreensEnum } from "@followBack/Navigation/Authorized/constants";

const useNotifications = ({ navigationRef }: { navigationRef: any }) => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const data = isStringified(remoteMessage.data.threadInfo);
      const { topicId } = data;
      const shouldNotNotificationShowed =
        Current.screen === AuthorizedScreensEnum.inbox ||
        (Current.screen === AuthorizedScreensEnum.threadDetails &&
          topicId === Current.topicId);

      if (!shouldNotNotificationShowed) {
        onDisplayNotification({
          title: remoteMessage.notification?.title as string,
          body: remoteMessage.notification?.body as string,
          data,
        });
      }
    });

    // messaging().subscribeToTopic("test"); //TODO:

    requestUserPermission();
    notificationListener(navigationRef);
    getNotificationToken();

    return unsubscribe;
  }, []);
};

export default useNotifications;
