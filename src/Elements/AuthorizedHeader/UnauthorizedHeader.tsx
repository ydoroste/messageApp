import {View} from "react-native";
import * as React from "react";
import {NativeStackHeaderProps} from "@react-navigation/native-stack/lib/typescript/src/types";
import Typography from "@followBack/GenericElements/Typography";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import useTheme from "@followBack/Hooks/useTheme";
import IconButton from "@followBack/GenericElements/IconButton";
import Button from "@followBack/GenericElements/Button";
import {useUserDetails} from "@followBack/Hooks/useUserDetails";
import {deleteAccessToken} from "@followBack/Utils/accessToken";

const AuthorizedHeader: React.FC<NativeStackHeaderProps> = ({ navigation, route, options, back })=>{

    const {styles} = useStyles();
    const {setIsAuthenticated} = useUserDetails();

    const onLogout = ()=>{
        deleteAccessToken();
        setIsAuthenticated(false);
    };
    return(
        <View style={styles.headerStyle}>
            <Button onPress={onLogout} type="secondary">test</Button>
        </View>
    )
};

const useStyles = useStylesWithTheme((theme)=> ({
    headerStyle: {
        height: 70,
        paddingHorizontal: 20,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingTop: 0,
        backgroundColor: theme.colors.black

    }
}));
export default AuthorizedHeader;

