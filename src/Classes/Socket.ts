import { getAccessToken } from "@followBack/Utils/accessToken";
import IO from "socket.io-client";
const socketUrl = "ws://97.107.138.116:3000/";
class Socket {
  static instance: any = null;

  static EventTypes = {
    Create: "create",
    Update: "update",
    Delete: "delete",
  };

  public static initialize() {
    return new Promise((resolve, reject) => {
      if (!Socket.instance) {
        (async () => {
          try {
            const token = await getAccessToken();

            Socket.instance = IO(socketUrl, {
              extraHeaders: {
                Authorization: token as string,
              },
            });

            Socket.instance.on("connect", () => {
              resolve("connect");
            });

            Socket.instance.on("disconnect", () => {
              reject("disconnect");
            });
          } catch (error) {
            alert(error);
            reject("disconnect");
          }
        })();
      } else {
        resolve(true);
      }
    });
  }
}

export default Socket;
