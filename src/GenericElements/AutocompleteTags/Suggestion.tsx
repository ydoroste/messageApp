import Typography from "@followBack/GenericElements/Typography";
import {StyleSheet, View} from "react-native";
import * as React from "react";
import {ISuggestionProps} from "@followBack/GenericElements/AutocompleteTags/types";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";

const Suggestion: React.FC<ISuggestionProps> = ({suggestion, onPress}) =>{
    const {styles} = useStyles();
    return(
        <View style={styles.container}>
            <Typography onPress={onPress} color="secondary" textDecoration="underline" type="mediumRegularBody">{suggestion}  |  {suggestion}
            </Typography>
        </View>
    )
};

export default Suggestion;

const useStyles = useStylesWithTheme((theme => ({
    container: {
        width: 400,
        paddingHorizontal: 16,
        marginVertical: 6,
        backgroundColor:theme.colors.dark03
    },
})));
