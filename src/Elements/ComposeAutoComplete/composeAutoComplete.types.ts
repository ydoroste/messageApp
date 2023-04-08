import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

export interface IComposeAutoComplete {
    searchValue: string;
    setSearchValue:(value: string) => void;
    tags: string[];
    setTags: (tags: string[]) => void;
    type: string;
    onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
    onFocus?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
}

export interface Suggestion {
    address: string;
    name: string
}