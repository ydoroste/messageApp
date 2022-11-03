import {createContext} from "react";
import {theme} from "@followBack/Theme/Theme";
import * as React from "react";
import {IThemeProviderProp} from "@followBack/Contexts/ThemeContext/types";
import {Theme} from "@followBack/Theme/Theme.types";

export const ThemeContext = createContext<Theme>(theme);

 export const ThemeProvider: React.FC<IThemeProviderProp> = ({children}) =>{
     return <ThemeContext.Provider value={theme}>
         {children}
     </ThemeContext.Provider>
};