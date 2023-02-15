import React, { useState } from "react";
import AutoCompleteTags from "@followBack/GenericElements/AutocompleteTags";
import { useFecthContactsList } from "@followBack/Hooks/Apis/ContactsList";
export const ComposeAutoComplete = ({ tags, setTags, type }) => {
  const [searchValue, setSearchValue] = useState("");
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
      suggestions={hasSuggestions ? suggestions : []}
      onChangeTags={(tags) => {
        setTags(tags);
      }}
      onChangeText={onChangeText}
    />
  );
};
