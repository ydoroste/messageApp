import { IContact } from '@followBack/Apis/Contacts/types';
import { sortUsers } from '@followBack/Utils/messages';
import { deleteContacts, getContacts, setContacts } from './contactDetails';
import { useGetUsername } from '@followBack/Hooks/Apis/Username';
import { getUsernameAPI } from '@followBack/Apis/Contacts';

export const getUserName = async (userAddress: string) => {
  let localContactsList: IContact[] = [];
  const contactsString = await getContacts();
  if (contactsString) {
    localContactsList = <IContact[]>JSON.parse(contactsString);
    let userIndex = localContactsList.findIndex((contact, index) => {
      return contact.address == userAddress;
    });
    if (userIndex >= 0) {
      return localContactsList[userIndex].name;
    } else {
      await deleteContacts();
      const { name } = await getUsernameAPI({ forAddress: userAddress });
      const userName = name;
      localContactsList.push({ address: userAddress, name: userName });
      await setContacts(JSON.stringify(localContactsList));
      return userName;
    }
  } else {
    await deleteContacts();
    const { name } = await getUsernameAPI({ forAddress: userAddress });
    const userName = name;
    localContactsList.push({ address: userAddress, name: userName });
    await setContacts(JSON.stringify(localContactsList));
    return userName;
  }
};

export const getThreadParticipantsUserName = (users: IContact[]) => {
  let sortedUsers = sortUsers(users);
  if (!sortedUsers || sortedUsers?.length === 0) return '';
  // const contactsString = await getContacts();
  // const localContactsList = <IContact[]>JSON.parse(contactsString ?? '');
  // let firstUser = localContactsList.find(
  //   (contact) => contact.address == sortedUsers[0].address
  // );
  const firstUserName = sortedUsers[0].name ?? sortedUsers[0].address;
  if (sortedUsers.length === 1) return firstUserName;
  // let secondUser = localContactsList.find(
  //   (contact) => contact.address == sortedUsers[1].address
  // );
  const secondUserName = sortedUsers[1].name ?? sortedUsers[1].address;

  if (sortedUsers.length === 2) {
    return `${firstUserName} & ${secondUserName}`;
  }
  return `${firstUserName} & ${sortedUsers.length - 1} others`;
};
