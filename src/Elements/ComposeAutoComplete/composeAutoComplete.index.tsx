import React, { useState } from "react";
import AutoCompleteTags from "@followBack/GenericElements/AutocompleteTags";
import { useFecthContactsList } from "@followBack/Hooks/Apis/ContactsList";
import { IComposeAutoComplete } from "./composeAutoComplete.types";


const ComposeAutoComplete: React.FC<IComposeAutoComplete> = ({searchValue, setSearchValue, tags, setTags, type, onFocus, onBlur }) => {
  const { isSuccess, isError, isLoading, data } = useFecthContactsList({
    type,
    searchValue,
  });

  const onChangeText = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  const suggestions = data?.filter(({ address }) => !tags.includes(address)) || [];

  const onTagPress = (pressedTag: string) => {
     const subtractedTags = tags.filter(tag => tag !== pressedTag);
     setTags(subtractedTags);
  };

  return (
    <AutoCompleteTags
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
};

export default ComposeAutoComplete;
