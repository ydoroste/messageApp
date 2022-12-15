import {Dimensions, View} from "react-native";
import Typography from "@followBack/GenericElements/Typography";
import CustomAutocompleteTags  from "react-native-autocomplete-tags";
import * as React from "react";
import {useState} from "react";
import Tag from "./Tag";
import Suggestion from "@followBack/GenericElements/AutocompleteTags/Suggestion";
import useTheme from "@followBack/Hooks/useTheme";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
const suggestions = ['apple', 'orange', 'banana', 'kiwi'];

const screenWidth = Dimensions.get("window").width;
const AutoCompleteTags = ()=>{
    const [tags, setTags] = useState<string[]>([]);
    const labelExtractor = (tag: string) => tag;

    const {colors} = useTheme();
    const {styles} = useStyles();
    return  <CustomAutocompleteTags
        allowCustomTags
        inputProps={{
            selectionColor: colors.white,
            placeholder: tags && tags.length > 0 ? undefined : "add"
        }}
        tags={tags}
        inputStyle={styles.inputStyles}
        parseChars={[",", " "]}
        containerStyle={styles.containerStyles}
        suggestions={suggestions}
        onChangeTags={setTags}
        labelExtractor={labelExtractor}
        renderSuggestion={(suggestion, onPress) => <Suggestion onPress={onPress} suggestion={suggestion}/>
        }
        renderTag={(tag, onPress)=> <Tag onPress={onPress} tag={tag}/>
        }

        flatListStyle={styles.listStyle}
    />
};
const useStyles = useStylesWithTheme((theme => ({
    inputStyles: {
        color: theme.colors.white,
    },
    containerStyles: {
        paddingVertical: 10,
        zIndex: 100
    },
    listStyle: {
        backgroundColor: theme.colors.dark03,
        borderRadius: 15,
        marginTop: 10,
        width: screenWidth - 40,
        marginLeft: -23
    }
})));
export default AutoCompleteTags;