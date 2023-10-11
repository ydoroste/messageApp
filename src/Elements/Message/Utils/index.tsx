import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

import RNFetchBlob from "rn-fetch-blob";

import * as Sharing from "expo-sharing";

import { CameraRoll } from "@react-native-camera-roll/camera-roll";

import { getFileDetails } from "@followBack/Utils/stringUtils";

export const downloadFile = async (url: string, name: string) => {
  const fileUri = FileSystem.documentDirectory + name; // Specify the file path and name

  const downloadResumable = FileSystem.createDownloadResumable(url, fileUri);

  try {
    const { uri } = await downloadResumable.downloadAsync(); // Perform the download

    return uri;
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};

const downloadAndSaveFileAndroid = async (url: string, fileName: string) => {
  const { config, fs } = RNFetchBlob;
  let DownloadDir = fs.dirs.DownloadDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: DownloadDir + "/file_" + fileName,
      description: "Image",
    },
  };
  try {
    await config(options).fetch("GET", url);
    return;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const saveFile = async (url: string, title: string) => {
  const date = new Date();
  try {
    let FileDetails = getFileDetails(title);
    let fileName = `${Math.floor(date.getTime() + date.getSeconds() / 2)}.${
      FileDetails.fileExtension
    }`;

    if (FileDetails.isVideo || FileDetails.isImage) {
      let uri = await downloadFile(url, fileName);
      await CameraRoll.save(uri);
    }

    FileDetails = getFileDetails(url);

    if (FileDetails.isFile) {
      fileName = `${Math.floor(date.getTime() + date.getSeconds() / 2)}.${
        FileDetails.fileExtension
      }`;

      if (Platform.OS === "android") {
        await downloadAndSaveFileAndroid(url, fileName);
      } else {
        let uri = await downloadFile(url, fileName);
        return Sharing.shareAsync(uri);
      }
    }

    return;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
