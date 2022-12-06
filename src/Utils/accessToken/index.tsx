import * as SecureStore from 'expo-secure-store';


export const getAccessToken = async ()=>{
return await SecureStore.getItemAsync("accessToken");
};

export const setAccessToken = async (accessToken: string)=>{
  await SecureStore.setItemAsync("accessToken", accessToken);
};

export const deleteAccessToken = async ()=>{
  await SecureStore.deleteItemAsync("accessToken");
};