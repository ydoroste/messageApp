import {useContext} from "react";
import {SearchContext} from "@followBack/Contexts/SearchContext";

export const useSearch = ()=>{
    return useContext(SearchContext);
};