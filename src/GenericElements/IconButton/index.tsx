import {
  iconsType,
  IIconButtonProps,
} from "@followBack/GenericElements/IconButton/types";
import * as React from "react";
import { IIconProps } from "@followBack/Theme/Icons/types/IconTypes";
import { IconButton as CustomIconButton } from "react-native-paper";

const Play = React.lazy(() => import("@followBack/Theme/Icons/Play"));
const Close = React.lazy(() => import("@followBack/Theme/Icons/Close"));
const CloseBold = React.lazy(() => import("@followBack/Theme/Icons/CloseBold"));
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
const Verified = React.lazy(() => import("@followBack/Theme/Icons/Verified"));

const About = React.lazy(() => import("@followBack/Theme/Icons/About"));
const SmallPin = React.lazy(() => import("@followBack/Theme/Icons/SmallPin"));
const Trash = React.lazy(() => import("@followBack/Theme/Icons/Trash"));
const Settings = React.lazy(() => import("@followBack/Theme/Icons/Settings"));
const Message = React.lazy(() => import("@followBack/Theme/Icons/Message"));
const AddWithCircle = React.lazy(
  () => import("@followBack/Theme/Icons/AddWithCircle")
);

const VerticalLine = React.lazy(
  () => import("@followBack/Theme/Icons/VerticalLine")
);
const Alert = React.lazy(() => import("@followBack/Theme/Icons/Alert"));
const BigAlert = React.lazy(() => import("@followBack/Theme/Icons/BigAlert"));
const Files = React.lazy(() => import("@followBack/Theme/Icons/Files"));
const Photo = React.lazy(() => import("@followBack/Theme/Icons/Photo"));

const Camera = React.lazy(() => import("@followBack/Theme/Icons/Camera"));
const Gif = React.lazy(() => import("@followBack/Theme/Icons/Gif"));
const VoiceNote = React.lazy(() => import("@followBack/Theme/Icons/VoiceNote"));
const Location = React.lazy(() => import("@followBack/Theme/Icons/Location"));
const Contact = React.lazy(() => import("@followBack/Theme/Icons/Contact"));
const SaveAll = React.lazy(() => import("@followBack/Theme/Icons/SaveAll"));
const File = React.lazy(() => import("@followBack/Theme/Icons/File"));
const Download = React.lazy(() => import("@followBack/Theme/Icons/Download"));

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
  verified: Verified,
  about: About,
  trash: Trash,
  settings: Settings,
  message: Message,
  addwithcircle: AddWithCircle,
  verticalline: VerticalLine,
  smallpin: SmallPin,
  alert: Alert,
  bigalert: BigAlert,
  photo: Photo,
  files: Files,
  camera: Camera,
  contact: Contact,
  gif: Gif,
  location: Location,
  voicenote: VoiceNote,
  closebold: CloseBold,
  play: Play,
  saveall: SaveAll,
  file: File,
  download: Download,
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
