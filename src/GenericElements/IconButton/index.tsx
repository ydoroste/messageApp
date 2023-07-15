import {
  iconsType,
  IIconButtonProps,
} from "@followBack/GenericElements/IconButton/types";
import * as React from "react";
import { IIconProps } from "@followBack/Theme/Icons/types/IconTypes";
import { IconButton as CustomIconButton } from "react-native-paper";

const Close = React.lazy(() => import("@followBack/Theme/Icons/Close"));
const Hidden = React.lazy(() => import("@followBack/Theme/Icons/Hidden"));
const Shown = React.lazy(() => import("@followBack/Theme/Icons/Shown"));
const Send = React.lazy(() => import("@followBack/Theme/Icons/Send"));
const Add = React.lazy(() => import("@followBack/Theme/Icons/Add"));
const Delete = React.lazy(() => import("@followBack/Theme/Icons/Delete"));
const DownArrow = React.lazy(() => import("@followBack/Theme/Icons/DownArrow"));
const Drawer = React.lazy(() => import("@followBack/Theme/Icons/Drawer"));
const Back = React.lazy(() => import("@followBack/Theme/Icons/Back"));
const Pin = React.lazy(() => import("@followBack/Theme/Icons/Pin"));
const Attachment = React.lazy(() => import("@followBack/Theme/Icons/Attachment"));

const IconButton: React.FC<IIconButtonProps> = ({
  name,
  width,
  height,
  color,
  disabled,
  onPress,
}) => {
  const getIcon = (
    icon: iconsType
  ): React.ReactElement<IIconProps> | undefined => {
    let IconElement: React.FC<IIconProps>;

    switch (icon) {
      case "close":
        IconElement = Close;
        break;
      case "hidden":
        IconElement = Hidden;
        break;
      case "shown":
        IconElement = Shown;
        break;
      case "add":
        IconElement = Add;
        break;
      case "delete":
        IconElement = Delete;
        break;
      case "send":
        IconElement = Send;
        break;
      case "downArrow":
        IconElement = DownArrow;
        break;
      case "drawer":
        IconElement = Drawer;
        break;
      case "back":
        IconElement = Back;
        break;
      case "pin":
        IconElement = Pin;
        break;
      case "attachment":
        IconElement = Attachment;
        break;
      default:
        IconElement = Close;
        break;
    }
    return (
      <React.Suspense fallback={null}>
        <IconElement color={color} height={height} width={width} />
      </React.Suspense>
    );
  };

  return (
    <CustomIconButton
      style={{ margin: 0 }}
      // animated
      rippleColor={color}
      size={width}
      disabled={disabled}
      onPress={onPress}
      icon={() => getIcon(name)}
    />
  );
};
export default IconButton;
