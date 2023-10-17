import RNFS from "react-native-fs";

class CachingLayer {
  static media = {};
  static messages = {};
  static mailBoxes = {
    inbox: { id: "", data: [] },
  };
  static userDetails = {};
  static mailBoxesIds = [];

  static dirNames = {
    cachedMedia: "cachedMedia",
    cachedMessages: "cachedMessages",
    cachedInBoxEmails: "cachedInBoxEmails",
    cachedUserDetails: "cachedUserDetails",
    cachedMailBoxesIds: "cachedMailBoxesIds",
  };

  static async loadCachedData() {
    await this.createDirs(Object.keys(CachingLayer.dirNames));
    await this.loadCachedMedia();
    await this.loadCachedMessages();
    await this.loadCachedInboxEmails();
    await this.loadCachedUserDetails();
    await this.loadCachedMailBoxesIds();
  }
  static createDirs = async (dirsNames: string[]) => {
    for (const dirname of dirsNames) {
      const path = RNFS.DocumentDirectoryPath + "/" + dirname;
      const existDir = await RNFS.exists(path);
      if (!existDir) await RNFS.mkdir(path);
    }
  };
  static async loadCachedMedia() {
    const cachedMediaPath =
      RNFS.DocumentDirectoryPath +
      "/" +
      CachingLayer.dirNames.cachedMedia +
      "/";

    try {
      const result = await RNFS.readDir(cachedMediaPath);

      result.forEach((element, index) => {
        const attachmentId = element.name.split(".")[0];

        CachingLayer.media = {
          ...CachingLayer.media,
          [attachmentId]: `file://${element.path}`,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async loadCachedMessages() {
    const cachedMessagesPath =
      RNFS.DocumentDirectoryPath +
      "/" +
      CachingLayer.dirNames.cachedMessages +
      "/";

    try {
      const result = await RNFS.readDir(cachedMessagesPath);

      for (const element of result) {
        const threadId = element.name.split(".")[0];

        const fileContent = JSON.parse(await RNFS.readFile(element.path));

        this.setNewCachedMessages(threadId, fileContent);
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async loadCachedInboxEmails() {
    const cachedEmailsPath =
      RNFS.DocumentDirectoryPath +
      "/" +
      CachingLayer.dirNames.cachedInBoxEmails +
      "/";

    try {
      const result = await RNFS.readDir(cachedEmailsPath);

      for (const element of result) {
        const boxID = element.name.split(".")[0];

        const fileContent = JSON.parse(await RNFS.readFile(element.path));

        this.setNewCachedInBoxEmails(boxID, fileContent);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async loadCachedUserDetails() {
    const cachedUserDetailsPath =
      RNFS.DocumentDirectoryPath +
      "/" +
      CachingLayer.dirNames.cachedUserDetails +
      "/";

    try {
      const result = await RNFS.readDir(cachedUserDetailsPath);

      if (result[0]) {
        const fileContent = JSON.parse(await RNFS.readFile(result[0].path));

        this.setNewCachedUserDetails(fileContent);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async loadCachedMailBoxesIds() {
    const cachedMailBoxesIdsPath =
      RNFS.DocumentDirectoryPath +
      "/" +
      CachingLayer.dirNames.cachedMailBoxesIds +
      "/";

    try {
      const result = await RNFS.readDir(cachedMailBoxesIdsPath);

      if (result[0]) {
        const fileContent = JSON.parse(await RNFS.readFile(result[0].path));

        this.setNewCachedMailBoxesIDs(fileContent);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static setNewCachedMedia = (attachmentId: string, url: string) => {
    CachingLayer.media = {
      ...CachingLayer.media,
      [attachmentId]: `file://${url}`,
    };
  };
  static setNewCachedMessages = (threadId: string, messages: any) => {
    CachingLayer.messages = {
      ...CachingLayer.messages,
      [threadId]: messages,
    };
  };
  static setNewCachedInBoxEmails = (inBoxID: string, emails: any) => {
    CachingLayer.mailBoxes = {
      ...CachingLayer.mailBoxes,
      inbox: {
        id: inBoxID,
        data: emails,
      },
    };
  };
  static setNewCachedUserDetails = (userDetails: object) => {
    CachingLayer.userDetails = userDetails;
  };
  static setNewCachedMailBoxesIDs = (mailBoxesIds: []) => {
    CachingLayer.mailBoxesIds = mailBoxesIds;
  };
  static saveMediaToDir = (
    attachmentId: string,
    fileExtension: string,
    url: string
  ) => {
    return new Promise((resolve, reject) => {
      (async () => {
        const fileName = attachmentId + "." + fileExtension;

        const dirPath =
          RNFS.DocumentDirectoryPath + "/" + CachingLayer.dirNames.cachedMedia;

        let path_name = dirPath + "/" + fileName;

        try {
          const isExists = await RNFS.exists(path_name);

          if (!isExists) {
            RNFS.downloadFile({
              fromUrl: url,
              toFile: path_name.replace(/%20/g, "_"),
              background: true,
            })
              .promise.then((res) => {
                console.log("File Downloaded", res);
              })
              .catch((err) => {
                console.log("err downloadFile", err);
                reject(err);
              });
          }

          CachingLayer.setNewCachedMedia(attachmentId, path_name);

          resolve(path_name);
        } catch (err) {
          reject(err);
        }
      })();
    });
  };
  static saveMessagesToDir = (threadId: string, messages: any) => {
    return new Promise((resolve, reject) => {
      (async () => {
        const fileName = threadId + "." + "txt";

        const dirPath =
          RNFS.DocumentDirectoryPath +
          "/" +
          CachingLayer.dirNames.cachedMessages +
          "/";

        let path_name = dirPath + fileName;

        try {
          RNFS.writeFile(path_name, JSON.stringify(messages));

          CachingLayer.setNewCachedMessages(threadId, messages);

          resolve(path_name);
        } catch (err) {
          reject(err);
        }
      })();
    });
  };
  static saveInBoxToDir = (inBoxID: string, emails: any) => {
    return new Promise((resolve, reject) => {
      (async () => {
        const fileName = inBoxID + "." + "txt";

        const dirPath =
          RNFS.DocumentDirectoryPath +
          "/" +
          CachingLayer.dirNames.cachedInBoxEmails +
          "/";

        let path_name = dirPath + fileName;

        try {
          RNFS.writeFile(path_name, JSON.stringify(emails));

          CachingLayer.setNewCachedInBoxEmails(inBoxID, emails);

          resolve(path_name);
        } catch (err) {
          reject(err);
        }
      })();
    });
  };
  static saveUserDetailsToDir = (userDetails: object) => {
    return new Promise((resolve, reject) => {
      (async () => {
        const fileName = "userDetails.txt";

        const dirPath =
          RNFS.DocumentDirectoryPath +
          "/" +
          CachingLayer.dirNames.cachedUserDetails +
          "/";

        let path_name = dirPath + fileName;

        try {
          RNFS.writeFile(path_name, JSON.stringify(userDetails));

          CachingLayer.setNewCachedUserDetails(userDetails);

          resolve(path_name);
        } catch (err) {
          reject(err);
        }
      })();
    });
  };
  static saveMailBoxesIdsToDir = (mailBoxes: []) => {
    return new Promise((resolve, reject) => {
      (async () => {
        const fileName = "mailBoxesIds.txt";

        const dirPath =
          RNFS.DocumentDirectoryPath +
          "/" +
          CachingLayer.dirNames.cachedMailBoxesIds +
          "/";

        let path_name = dirPath + fileName;

        try {
          RNFS.writeFile(path_name, JSON.stringify(mailBoxes));

          CachingLayer.setNewCachedMailBoxesIDs(mailBoxes);

          resolve(path_name);
        } catch (err) {
          reject(err);
        }
      })();
    });
  };
}
export default CachingLayer;
