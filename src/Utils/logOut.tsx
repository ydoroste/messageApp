import { deleteAccessToken } from "@followBack/Utils/accessToken";
import { deleteUserData } from "@followBack/Utils/userDetails";
import CachingLayer from "@followBack/Classes/CachingLayer";
import DeviceInfo from "react-native-device-info";
import { deleteDevice } from "@followBack/Apis/Notifications";

const logOut = async (queryClient: any) => {
  const macAddress = await DeviceInfo.getUniqueId();
  await deleteDevice(macAddress);
  await queryClient.removeQueries();
  await deleteAccessToken();
  await deleteUserData();
  await CachingLayer.clearCache();
};

export default logOut;
