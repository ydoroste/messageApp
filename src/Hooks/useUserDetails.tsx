import {useContext} from "react";
import {UserContext} from "@followBack/Contexts/UserContext";

export const useUserDetails = ()=>{
    return useContext(UserContext);
};