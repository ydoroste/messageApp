import { Dimensions, NativeSyntheticEvent, TextInputFocusEventData, View } from "react-native";
import CustomAutocompleteTags from "react-native-autocomplete-tags";
import * as React from "react";
import Tag from "./Tag";
import Suggestion from "@followBack/GenericElements/AutocompleteTags/Suggestion";
import useTheme from "@followBack/Hooks/useTheme";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { IAutoCompleteTags } from "@followBack/GenericElements/AutocompleteTags/types";
import { Value } from "react-native-reanimated";
import { isValidEmail } from "@followBack/Utils/validations";
const screenWidth = Dimensions.get("window").width;
const AutoCompleteTags: React.FC<IAutoCompleteTags> = ({
  onChangeTags,
  onChangeText,
  tags,
  suggestions,
  typedValue,
  isLoading,
  isSuccess,
  onFocus,
  onBlur
}) => {
  const labelExtractor = (tag: string) => tag;
  const { colors } = useTheme();
  const { styles } = useStyles();
  const parseChars = [",", " "];
  const [isBlured, setIsBlured] = React.useState(false);

  const onAutocompleteTextBlue = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur && onBlur(e);
    setIsBlured(true)
  };

  const onAutocompleteTextFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onFocus && onFocus(e);
    setIsBlured(false);
  };

  return (
    <CustomAutocompleteTags
      allowCustomTags
      inputProps={{
        selectionColor: colors.white,
        placeholderTextColor: colors.grey02,
        placeholder: tags && tags.length > 0 ? undefined : "add",
        onChangeText: (text) => {
          const lastCharIndex = text.length - 1;
          const lastChar = text[lastCharIndex];
          if (parseChars.includes(lastChar)) {
            const mail = text.slice(0, lastCharIndex);
            if (!isValidEmail(mail)) return;

            onChangeTags([...tags, text]);
            onChangeText("");
          } else {
            onChangeText(text);
          }
        },
        value: typedValue,
        onFocus: onAutocompleteTextFocus,
        onBlur: onAutocompleteTextBlue
      }}
      tags={tags}
      inputStyle={styles.inputStyles}
      filterSuggestions={(text) => {
        return suggestions;
      }}
      parseChars={parseChars}
      containerStyle={styles.containerStyles}
      suggestions={suggestions}
      onChangeTags={(tags) => {
        onChangeTags(tags);
      }}
      labelExtractor={labelExtractor}
      renderSuggestion={(suggestion, onPress) => (
        <View style={{zIndex: 10000}}>
          {!isBlured && <Suggestion 
          onPress={() => {
            onChangeText("");
            onChangeTags([...tags, suggestion.address]);
          }}
          suggestion={suggestion}
        />}

        </View>
        
      )}
      renderTag={(tag, onPress) => <Tag onPress={onPress} tag={tag} key={Math.random()} />}
      tagContainerStyle={{flexDirection: "row", display: "flex", justifyContent: "flex-start"}}
      flatListProps={{style:styles.listStyle}}
      // flatListStyle={styles.listStyle}
    />
  );
};
const useStyles = useStylesWithTheme((theme) => ({
  inputStyles: {
    color: theme.colors.white,
  },
  containerStyles: {
    zIndex: 10,
    borderRadius: 15,
  },
  listStyle: {
    backgroundColor: theme.colors.dark02,
    borderRadius: 15,
    marginTop: 10,
    width: screenWidth - 40,
    marginLeft: -23,
    position: "absolute",
    zIndex: 10,
  },
}));
export default AutoCompleteTags;
