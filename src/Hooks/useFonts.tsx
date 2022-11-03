import {OpenSans_400Regular, OpenSans_700Bold,  useFonts} from "@expo-google-fonts/open-sans";


export default ()=>{

    let [fontsLoaded] = useFonts({
        OpenSans_400Regular,
        OpenSans_700Bold
    });
return [fontsLoaded] as const;
};

