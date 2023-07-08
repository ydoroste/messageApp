import React, { forwardRef, useState } from "react";
import AutoCompleteTags from "@followBack/GenericElements/AutocompleteTags";
import { useFecthContactsList } from "@followBack/Hooks/Apis/ContactsList";
import { IComposeAutoComplete } from "./composeAutoComplete.types";
import { TextInput } from "react-native";


const ComposeAutoComplete = forwardRef<TextInput, IComposeAutoComplete>(({ searchValue, setSearchValue, tags, setTags, type, onFocus, onBlur }, ref) => {
  const { isSuccess, isError, isLoading, data } = useFecthContactsList({
    type,
    searchValue,
  });

  const onChangeText = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  const suggestions = data?.contacts.filter(({ address }) => !tags.includes(address)) || [];

  const onTagPress = (pressedTag: string) => {
    const subtractedTags = tags.filter(tag => tag !== pressedTag);
    setTags(subtractedTags);
  };

  return (
    <AutoCompleteTags
      //@ts-ignore
      ref={ref}
      typedValue={searchValue}
      isLoading={isLoading}
      isSuccess={isSuccess}
      tags={tags}
      onBlur={onBlur}
      onFocus={onFocus}
      suggestions={suggestions}
      onChangeTags={(tags) => {
        setTags(tags);
      }}
      onChangeText={onChangeText}
      onTagPress={onTagPress}
    />
  );
});

export default ComposeAutoComplete;
