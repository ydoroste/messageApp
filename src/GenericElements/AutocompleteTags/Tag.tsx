import * as React from "react";
import Typography from "@followBack/GenericElements/Typography";
import {StyleSheet, View} from "react-native";
import IconButton from "@followBack/GenericElements/IconButton";
import useTheme from "@followBack/Hooks/useTheme";
import {ITagProps} from "@followBack/GenericElements/AutocompleteTags/types";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";

const Tag: React.FC<ITagProps> = ({tag, onPress}) => {
    const {colors} = useTheme();
    const { styles } = useStyles();
    
    return (
        <View style={styles.container}>
            <Typography color="primary" textDecoration="underline" type="mediumRegularBody">
                {tag}
            </Typography>
            <View style={styles.iconStyle}>
            <IconButton onPress={onPress} name="close" width={10} height={11} color={colors.white}/>
            </View>

        </View>
    )
};
export default Tag;

const useStyles = useStylesWithTheme((theme) =>({
    container: {
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "flex-start",
        backgroundColor: theme.colors.gray02
    },
    iconStyle: {
        marginTop: 2,
        marginLeft: 2
    }
}));