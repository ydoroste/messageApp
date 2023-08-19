import React, { useRef } from 'react';
import * as FileSystem from 'expo-file-system';
import { ICustomFastImageProps } from './types';
import { useEffect, useState } from 'react';
import {
  DownloadProgressData,
  FileSystemNetworkTaskProgressCallback,
} from 'expo-file-system';
import { Alert, Image, View, ActivityIndicator } from 'react-native';

const getImgXtension = (uri: string) => {
  var basename = uri.split(/[\\/]/).pop() ?? '';
  return /[.]/.exec(basename) ? /[^.]+$/.exec(basename) : undefined;
};

const findImageInCache = async (uri: string) => {
  try {
    let info = await FileSystem.getInfoAsync(uri);
    console.log('INFO -------->', info);
    return { ...info, err: false };
  } catch (error) {
    return {
      exists: false,
      err: true,
      msg: error,
    };
  }
};

const cacheImage = async (
  uri: string,
  cacheUri: string,
  callback: FileSystemNetworkTaskProgressCallback<DownloadProgressData>
) => {
  try {
    const downloadImage = FileSystem.createDownloadResumable(
      uri,
      cacheUri,
      {},
      callback
    );
    const downloaded = await downloadImage.downloadAsync();
    return {
      cached: true,
      err: false,
      path: downloaded?.uri,
    };
  } catch (error) {
    return {
      cached: false,
      err: true,
      msg: error,
    };
  }
};

const CustomFastImage: React.FC<ICustomFastImageProps> = (props) => {
  const {
    source: { uri },
    cacheKey,
    style,
  } = props;

  const [imgUri, setUri] = useState<string>('');
  const isMounted = useRef(true);

  useEffect(() => {
    const loadImg = async () => {
      let imgXt = getImgXtension(uri);
      if (!imgXt || !imgXt.length) {
        Alert.alert(`Couldn't load Image!`);
        return;
      }
      const cacheFileUri = `${FileSystem.cacheDirectory}${cacheKey}.${imgXt[0]}`;
      console.log(cacheFileUri);
      let imgXistsInCache = await findImageInCache(cacheFileUri);
      if (imgXistsInCache.exists) {
        console.log('cached!');
        setUri(cacheFileUri);
      } else {
        let cached = await cacheImage(uri, cacheFileUri, () => {});
        if (cached.cached) {
          console.log('cached NEw!');
          setUri(cached.path ?? '');
        } else {
          Alert.alert(`Couldn't load Image!`);
        }
      }
    };
    loadImg();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      {imgUri ? (
        <Image source={{ uri: imgUri }} style={style} />
      ) : (
        <View
          style={{ ...style, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size={33} />
        </View>
      )}
    </>
  );
};

export default React.memo(
  CustomFastImage,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
