import {OpenSans_400Regular, OpenSans_800ExtraBold,  useFonts} from "@expo-google-fonts/open-sans";


export default ()=>{

    let [fontsLoaded] = useFonts({
        OpenSans_400Regular,
        OpenSans_800ExtraBold
    });
return [fontsLoaded] as const;
};

