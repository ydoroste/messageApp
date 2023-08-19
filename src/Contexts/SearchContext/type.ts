import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ISearchProviderProps {
  children: ReactNode;
}

export interface ISearchContext {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}
