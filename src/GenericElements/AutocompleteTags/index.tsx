import { Dimensions, View } from "react-native";
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
}) => {
  const labelExtractor = (tag: string) => tag;
  const { colors } = useTheme();
  const { styles } = useStyles();
  const parseChars = [",", " "];
  return (
    <CustomAutocompleteTags
      allowCustomTags
      inputProps={{
        selectionColor: colors.white,
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
        <Suggestion
          onPress={() => {
            onChangeText("");
            onChangeTags([...tags, suggestion.address]);
          }}
          suggestion={suggestion}
        />
      )}
      renderTag={(tag, onPress) => <Tag onPress={onPress} tag={tag} />}
      flatListStyle={styles.listStyle}
    />
  );
};
const useStyles = useStylesWithTheme((theme) => ({
  inputStyles: {
    color: theme.colors.white,
  },
  containerStyles: {
    paddingVertical: 10,
    zIndex: 100,
  },
  listStyle: {
    backgroundColor: theme.colors.dark03,
    borderRadius: 15,
    marginTop: 10,
    width: screenWidth - 40,
    marginLeft: -23,
  },
}));
export default AutoCompleteTags;
