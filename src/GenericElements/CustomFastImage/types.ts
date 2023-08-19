import { ImageStyle, StyleProp, ViewStyle } from 'react-native';

export interface ICustomFastImageProps {
  source: { uri: string };
  cacheKey: string;
  style: StyleProp<ViewStyle> | StyleProp<ImageStyle> | ViewStyle | ImageStyle;
}
