import * as SecureStore from 'expo-secure-store';


export const getUserData = async () => {
    return await SecureStore.getItemAsync("userData");
};

export const setUserData = async (userInfo: string)=>{
    await SecureStore.setItemAsync("userData", userInfo);
};

export const deleteUserData = async ()=> {
    await SecureStore.deleteItemAsync("userData");
};