import {useLocalization} from "@followBack/Hooks/useLocalization";


export const getTranslatedText = (key: string) => {
const [localization] = useLocalization();
    return localization.t(key);
};