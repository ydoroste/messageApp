import {useMemo} from "react";
import {I18n} from "i18n-js";
import translation from "@followBack/Localization/translation";

export const useLocalization = ()=>{
  const localization = useMemo(()=> {
    const i18n = new I18n(translation);
//set default localization
    i18n.locale = "en";
    return i18n;
  } , []);
  return [localization] as const;
};