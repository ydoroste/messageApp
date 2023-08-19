import { createContext, useState } from "react";
import * as React from "react";
import {
  ISearchProviderProps,
  ISearchContext,
} from "@followBack/Contexts/SearchContext/type";

export const SearchContext = createContext<ISearchContext>({
  searchValue: "",
} as ISearchContext);

export const SearchProvider: React.FC<ISearchProviderProps> = ({
  children,
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
