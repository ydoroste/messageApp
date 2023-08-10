import {
  Dimensions,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import CustomAutocompleteTags from 'react-native-autocomplete-tags';
import * as React from 'react';
import Tag from './Tag';
import Suggestion from '@followBack/GenericElements/AutocompleteTags/Suggestion';
import useTheme from '@followBack/Hooks/useTheme';
import useStylesWithTheme from '@followBack/Hooks/useStylesWithTheme';
import { IAutoCompleteTags } from '@followBack/GenericElements/AutocompleteTags/types';
import { isValidEmail } from '@followBack/Utils/validations';
const screenWidth = Dimensions.get('window').width;

const AutoCompleteTags = React.forwardRef<TextInput, IAutoCompleteTags>(
  (
    {
      onChangeTags,
      onChangeText,
      tags,
      suggestions,
      typedValue,
      isLoading,
      isSuccess,
      onFocus,
      onBlur,
      onTagPress,
    },
    forwardedRef
  ) => {
    const labelExtractor = (tag: any) => {
      return tag.address;
    };
    const { colors } = useTheme();
    const { styles } = useStyles();
    const parseChars = [',', ' '];
    const [isBlured, setIsBlured] = React.useState(true);

    const onAutocompleteTextBlue = (
      e: NativeSyntheticEvent<TextInputFocusEventData>
    ) => {
      onBlur && onBlur(e);
      setIsBlured(true);
    };

    const onAutocompleteTextFocus = (
      e: NativeSyntheticEvent<TextInputFocusEventData>
    ) => {
      onFocus && onFocus(e);
      setIsBlured(false);
    };

    return (
      <CustomAutocompleteTags
        allowCustomTags
        inputProps={{
          autoCapitalize: 'none',
          selectionColor: colors.white,
          placeholderTextColor: colors.grey02,
          placeholder: tags && tags.length > 0 ? undefined : 'add',
          onChangeText: (text) => {
            const lastCharIndex = text.length - 1;
            const lastChar = text[lastCharIndex];
            if (parseChars.includes(lastChar)) {
              const mail = text.slice(0, lastCharIndex).toLocaleLowerCase();
              if (!isValidEmail(mail)) return;
              onChangeTags([
                ...tags,
                {
                  name: text.toLocaleLowerCase(),
                  address: text.toLocaleLowerCase(),
                },
              ]);
              onChangeText('');
            } else {
              onChangeText(text.toLocaleLowerCase());
            }
          },
          onKeyPress: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
            //To handle removing the last tag when the input text is empty and user clicks backspace
            if (e.nativeEvent.key === 'Backspace' && !typedValue) {
              const subtractedTags = [...tags];
              subtractedTags.pop();
              onChangeTags(subtractedTags);
            }
          },
          //@ts-ignore
          ref: forwardedRef,
          value: typedValue,
          onFocus: onAutocompleteTextFocus,
          onBlur: onAutocompleteTextBlue,
        }}
        tags={tags}
        inputStyle={styles.inputStyles}
        filterSuggestions={(text) => {
          return suggestions;
        }}
        parseChars={parseChars}
        containerStyle={styles.containerStyles}
        suggestions={suggestions}
        onChangeTags={(tags) => {}}
        labelExtractor={labelExtractor}
        renderSuggestion={(suggestion, onPress) => (
          <View key={suggestion.address} style={{ zIndex: 10000 }}>
            {!isBlured && (
              <Suggestion
                key={suggestion.name}
                onPress={() => {
                  onChangeText('');
                  onChangeTags([
                    ...tags,
                    { address: suggestion.address, name: suggestion.name },
                  ]);
                }}
                suggestion={suggestion}
              />
            )}
          </View>
        )}
        renderTag={(tag) => (
          <Tag onPress={onTagPress} tag={tag} key={tag.address} />
        )}
        tagContainerStyle={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
        flatListProps={{ style: styles.flatListStyle }}
      />
    );
  }
);

const useStyles = useStylesWithTheme((theme) => ({
  //Applied to the TextInput directly
  inputStyles: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.lineHeights.medium,
    minHeight: 27,
  },
  //style for the outer-most View that houses both the tagContainer and suggestion list
  containerStyles: {
    zIndex: 10,
    borderRadius: 15,
  },
  //Applied to the FlatList which renders suggestions
  flatListStyle: {
    backgroundColor: theme.colors.dark02,
    borderRadius: 15,
    marginTop: 5,
    width: screenWidth - 40,
    marginLeft: -23,
    position: 'absolute',
    zIndex: 1000,
    maxHeight: 150,
  },
}));

export default AutoCompleteTags;
