import { IContact } from '@followBack/Apis/Contacts/types';
import { sortUsers } from '@followBack/Utils/messages';
import { deleteContacts, getContacts, setContacts } from './contactDetails';
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
      console.log(localContactsList);
      return userName;
    }
  } else {
    await deleteContacts();
    const { name } = await getUsernameAPI({ forAddress: userAddress });
    localContactsList.push({ address: userAddress, name: name });
    await setContacts(JSON.stringify(localContactsList));
    return name;
  }
};

export const getThreadParticipantsUserName = (users: IContact[]) => {
  let sortedUsers = sortUsers(users);
  console.log(sortedUsers);
  if (!sortedUsers || sortedUsers?.length === 0) return '';
  const firstUserName = sortedUsers[0].name ?? sortedUsers[0].address;
  if (sortedUsers.length === 1) return firstUserName;
  const secondUserName = sortedUsers[1].name ?? sortedUsers[1].address;
  if (sortedUsers.length === 2) {
    return `${firstUserName} & ${secondUserName}`;
  }
  return `${firstUserName} & ${sortedUsers.length - 1} others`;
};
