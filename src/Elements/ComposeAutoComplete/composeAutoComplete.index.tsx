import React, { forwardRef, useState } from 'react';
import AutoCompleteTags from '@followBack/GenericElements/AutocompleteTags';
import { useFecthContactsList } from '@followBack/Hooks/Apis/ContactsList';
import { IComposeAutoComplete } from './composeAutoComplete.types';
import { TextInput } from 'react-native';
import { IContact } from '@followBack/Apis/Contacts/types';

const ComposeAutoComplete = forwardRef<TextInput, IComposeAutoComplete>(
  (
    { searchValue, setSearchValue, tags, setTags, type, onFocus, onBlur },
    ref
  ) => {
    const { isSuccess, isError, isLoading, data } = useFecthContactsList({
      type,
      searchValue,
    });

    const onChangeText = (searchValue: string) => {
      setSearchValue(searchValue);
    };

    const suggestions =
      data?.contacts.filter((contact) => {
        return (
          tags.filter((tag) => {
            return contact.address === tag.address;
          }).length == 0
        );
      }) || [];

    const onTagPress = (pressedTag: IContact) => {
      const subtractedTags = tags.filter(
        (tag) => tag.address !== pressedTag.address
      );
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
  }
);

export default ComposeAutoComplete;
