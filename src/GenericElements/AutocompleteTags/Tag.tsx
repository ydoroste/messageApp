import * as React from "react";
import Typography from "@followBack/GenericElements/Typography";
import {StyleSheet, View} from "react-native";
import IconButton from "@followBack/GenericElements/IconButton";
import useTheme from "@followBack/Hooks/useTheme";
import {ITagProps} from "@followBack/GenericElements/AutocompleteTags/types";

const Tag: React.FC<ITagProps> = ({tag, onPress}) => {
    const {colors} = useTheme();
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

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    iconStyle: {
        marginTop: 2,
        marginLeft: 2
    }
});