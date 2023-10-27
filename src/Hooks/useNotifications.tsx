import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import {
  getNotificationToken,
  isStringified,
  notificationListener,
  onDisplayNotification,
  requestUserPermission,
} from "@followBack/Utils/notifications";
import CurrentOpenedTopic from "@followBack/Classes/CurrentOpenedTopicId";

const useNotifications = ({ navigationRef }: { navigationRef: any }) => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const data = isStringified(remoteMessage.data.threadInfo);

      const { topicId } = data;
      if (
        topicId !== CurrentOpenedTopic.id &&
        CurrentOpenedTopic.id.length !== 0
      ) {
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
