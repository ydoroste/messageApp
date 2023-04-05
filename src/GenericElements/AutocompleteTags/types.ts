import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

export interface ITagProps {
  tag: any;
  onPress: (tag: any) => void;
}

export interface ISuggestionProps {
  suggestion: any;
  onPress: (suggestion: any) => void;
}

export interface IAutoCompleteTags {
  onChangeTags: (newTags: any[]) => void;
  onChangeText: (text: string) => void;
  tags: any[];
  suggestions: any[];
  isLoading: boolean;
  isSuccess: boolean;
  typedValue: string;
  onFocus?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void);
  onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
}
