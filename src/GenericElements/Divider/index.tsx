import {Divider as CustomDivider} from "react-native-paper";
import * as React from "react";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import {IDividerProps} from "@followBack/GenericElements/Divider/types";

const Divider: React.FC<IDividerProps> = ({marginBottom, marginTop})=>{
    const {styles} = useStyles();
  return <CustomDivider style={styles.divider}/>
};

const useStyles = useStylesWithTheme((theme)=> ({
    divider: {
        borderBottomColor: theme.colors.grey01,
        borderBottomWidth: 0.5
    }
}));
export default Divider;