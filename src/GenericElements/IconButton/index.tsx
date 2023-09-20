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
const Attachment = React.lazy(
  () => import("@followBack/Theme/Icons/Attachment")
);
const Bookmark = React.lazy(() => import("@followBack/Theme/Icons/Bookmark"));
const Copy = React.lazy(() => import("@followBack/Theme/Icons/Copy"));
const Edit = React.lazy(() => import("@followBack/Theme/Icons/Edit"));
const Reply = React.lazy(() => import("@followBack/Theme/Icons/Reply"));
const More = React.lazy(() => import("@followBack/Theme/Icons/More"));
const Forward = React.lazy(() => import("@followBack/Theme/Icons/Forward"));
const SelectMore = React.lazy(
  () => import("@followBack/Theme/Icons/SelectMore")
);

const UnSelected = React.lazy(
  () => import("@followBack/Theme/Icons/UnSelected")
);
const UnSend = React.lazy(() => import("@followBack/Theme/Icons/UnSend"));
const Done = React.lazy(() => import("@followBack/Theme/Icons/Done"));

const iconMap: Record<iconsType, React.FC<IIconProps>> = {
  close: Close,
  hidden: Hidden,
  shown: Shown,
  add: Add,
  delete: Delete,
  send: Send,
  downArrow: DownArrow,
  drawer: Drawer,
  back: Back,
  pin: Pin,
  attachment: Attachment,
  bookmark: Bookmark,
  copy: Copy,
  edit: Edit,
  reply: Reply,
  selectmore: SelectMore,
  unsend: UnSend,
  done: Done,
  unselected: UnSelected,
  more: More,
  forward: Forward,
};
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

    IconElement = iconMap[icon] || Close;

    return (
      <React.Suspense fallback={null}>
        <IconElement color={color} height={height} width={width} />
      </React.Suspense>
    );
  };

  return (
    <CustomIconButton
      style={{ margin: 0, padding: -10 }}
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
