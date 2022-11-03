import {I18n} from "i18n-js";
import translation from "@followBack/Localization/translation";

const i18n = new I18n(translation);
i18n.locale = "en";


export const getTranslatedText = (key: string) => {
    return i18n.t(key);
};