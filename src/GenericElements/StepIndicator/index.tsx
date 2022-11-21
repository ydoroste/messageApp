import * as React from "react";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import {IStepIndicatorProps} from "@followBack/GenericElements/StepIndicator/types";
import {memo} from "react";
import {View} from 'react-native'

const StepIndicator: React.FC<IStepIndicatorProps> = ({disabled, isLastIndicator})=>{
    const {styles} = useStyles();
    return <View
    style={{
      ...styles.container,
      backgroundColor: disabled ? "#696969" : "#303030",
      marginRight: isLastIndicator ? 0 : 36
    }}
  />
};

const useStyles = useStylesWithTheme(theme => ({

    container: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },


}));

export default memo(StepIndicator);
