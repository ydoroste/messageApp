import React, { useState } from "react";
import AutoCompleteTags from "@followBack/GenericElements/AutocompleteTags";
import { useFecthContactsList } from "@followBack/Hooks/Apis/ContactsList";
export const ComposeAutoComplete = ({searchValue, setSearchValue, tags, setTags, type, onFocus, onBlur }) => {
  const { isSuccess, isError, isLoading, data } = useFecthContactsList({
    type,
    searchValue,
  });

  const onChangeText = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  const suggestions = data?.filter(({ address }) => !tags.includes(address));
  const hasSuggestions = suggestions?.length > 0;

  return (
    <AutoCompleteTags
      typedValue={searchValue}
      isLoading={isLoading}
      isSuccess={isSuccess}
      tags={tags}
      onBlur={onBlur}
      onFocus={onFocus}
      suggestions={hasSuggestions ? suggestions : []}
      onChangeTags={(tags) => {
        setTags(tags);
      }}
      onChangeText={onChangeText}
    />
  );
};
