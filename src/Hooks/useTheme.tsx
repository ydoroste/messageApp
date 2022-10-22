import {useContext} from "react";
import {ThemeContext} from "@followBack/Contexts/ThemeContext";
import {Theme} from "@followBack/Theme/Theme.types";

export default (): Theme =>{
    return useContext(ThemeContext);
}