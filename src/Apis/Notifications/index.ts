import { DeleteApi, PostApi } from "@followBack/Utils/httpApis/apis";
import { ApiEndpoints } from "@followBack/Apis";

type IAddDeviceApiRequest = {
  id: string;
  token: string;
};

export const addDevice = async ({
  deviceId,
  notificationToken,
}: {
  deviceId: string;
  notificationToken: string;
}) => {
  return PostApi<IAddDeviceApiRequest, {}, {}>(
    `${ApiEndpoints.Devices}/${deviceId}/token/${notificationToken}`,
    {
      id: deviceId,
      token: notificationToken,
    }
  )
    .then((res) => res.data)
    .catch((e) => console.log("error from addDevice", e.response.data));
};

export const deleteDevice = async (deviceId: string) => {
  return DeleteApi<{}>(`${ApiEndpoints.Devices}/${deviceId}`)
    .then((res) => res.data)
    .catch((e) => console.log("error from deleteDevice", e.response.data));
};

export const resetNotifications = async () => {
  return PostApi<{}, {}, {}>(`${ApiEndpoints.Notifications}`, {})
    .then((res) => res.data)
    .catch((e) => console.log("error from addDevice", e.response.data));
};
