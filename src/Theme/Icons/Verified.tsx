import * as React from "react";
import { IIconProps } from "./types/IconTypes";
import Svg, { Path, Mask, Rect, G } from "react-native-svg";

const Verified: React.FC<IIconProps> = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G id="verified">
        <Mask
          id="mask0_337_6507"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <Rect id="Bounding box" width="24" height="24" fill={color} />
        </Mask>
        <G mask="url(#mask0_337_6507)">
          <Path
            id="verified_2"
            d="M10.9492 12.7013L9.49922 11.2763C9.31589 11.093 9.08672 11.0013 8.81172 11.0013C8.53672 11.0013 8.29922 11.1013 8.09922 11.3013C7.91589 11.4847 7.82422 11.718 7.82422 12.0013C7.82422 12.2847 7.91589 12.518 8.09922 12.7013L10.2492 14.8513C10.4492 15.0513 10.6826 15.1513 10.9492 15.1513C11.2159 15.1513 11.4492 15.0513 11.6492 14.8513L15.8992 10.6013C16.0992 10.4013 16.1951 10.168 16.1867 9.90134C16.1784 9.63467 16.0826 9.40134 15.8992 9.20134C15.6992 9.00134 15.4617 8.89717 15.1867 8.88884C14.9117 8.88051 14.6742 8.97634 14.4742 9.17634L10.9492 12.7013ZM8.14922 21.7513L6.69922 19.3013L3.94922 18.7013C3.69922 18.6513 3.49922 18.5222 3.34922 18.3138C3.19922 18.1055 3.14089 17.8763 3.17422 17.6263L3.44922 14.8013L1.57422 12.6513C1.40755 12.468 1.32422 12.2513 1.32422 12.0013C1.32422 11.7513 1.40755 11.5347 1.57422 11.3513L3.44922 9.20134L3.17422 6.37634C3.14089 6.12634 3.19922 5.89717 3.34922 5.68884C3.49922 5.48051 3.69922 5.35134 3.94922 5.30134L6.69922 4.70134L8.14922 2.25134C8.28255 2.03467 8.46589 1.88884 8.69922 1.81384C8.93255 1.73884 9.16589 1.75134 9.39922 1.85134L11.9992 2.95134L14.5992 1.85134C14.8326 1.75134 15.0659 1.73884 15.2992 1.81384C15.5326 1.88884 15.7159 2.03467 15.8492 2.25134L17.2992 4.70134L20.0492 5.30134C20.2992 5.35134 20.4992 5.48051 20.6492 5.68884C20.7992 5.89717 20.8576 6.12634 20.8242 6.37634L20.5492 9.20134L22.4242 11.3513C22.5909 11.5347 22.6742 11.7513 22.6742 12.0013C22.6742 12.2513 22.5909 12.468 22.4242 12.6513L20.5492 14.8013L20.8242 17.6263C20.8576 17.8763 20.7992 18.1055 20.6492 18.3138C20.4992 18.5222 20.2992 18.6513 20.0492 18.7013L17.2992 19.3013L15.8492 21.7513C15.7159 21.968 15.5326 22.1138 15.2992 22.1888C15.0659 22.2638 14.8326 22.2513 14.5992 22.1513L11.9992 21.0513L9.39922 22.1513C9.16589 22.2513 8.93255 22.2638 8.69922 22.1888C8.46589 22.1138 8.28255 21.968 8.14922 21.7513ZM9.44922 19.9513L11.9992 18.8513L14.5992 19.9513L15.9992 17.5513L18.7492 16.9013L18.4992 14.1013L20.3492 12.0013L18.4992 9.85134L18.7492 7.05134L15.9992 6.45134L14.5492 4.05134L11.9992 5.15134L9.39922 4.05134L7.99922 6.45134L5.24922 7.05134L5.49922 9.85134L3.64922 12.0013L5.49922 14.1013L5.24922 16.9513L7.99922 17.5513L9.44922 19.9513Z"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
};

export default Verified;
