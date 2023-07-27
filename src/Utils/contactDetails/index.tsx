import * as SecureStore from 'expo-secure-store';

export const getContacts = async () => {
    return await SecureStore.getItemAsync("contacts");
};

export const setContacts = async (contactsList: string) => {
  await SecureStore.setItemAsync("contacts", contactsList);
};

export const deleteContacts = async () => {
  await SecureStore.deleteItemAsync("contacts");
};