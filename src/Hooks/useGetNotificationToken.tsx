import { useEffect, useState } from "react";
import { getNotificationToken } from "@followBack/Utils/notifications";

const useGetNotificationToken = () => {
  const [notificationToken, setNotificationToken] = useState("");

  const invokeGetNotificationToken = async () => {
    try {
      const token = await getNotificationToken();
      setNotificationToken(token);
    } catch (error) {}
  };

  useEffect(() => {
    invokeGetNotificationToken();
  }, []);

  return notificationToken;
};

export default useGetNotificationToken;
