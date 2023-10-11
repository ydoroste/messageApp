import { useEffect, useState } from "react";

import * as VideoThumbnails from "expo-video-thumbnails";
import { getFileDetails } from "@followBack/Utils/stringUtils";

const useGenerateThumbnail = (url: string, title: string) => {
  const [uri, setUri] = useState(url);

  useEffect(() => {
    const isVideo = getFileDetails(title).isVideo;
    if (isVideo) {
      generateThumbnail();
    }
  }, [url, title]);

  const generateThumbnail = async () => {
    //TODO: should be replaced with another solution and download images and files to ios and android
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(url);
      setUri(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  return { uri };
};

export default useGenerateThumbnail;
