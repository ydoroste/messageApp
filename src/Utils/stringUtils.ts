import { IContact } from '@followBack/Apis/Contacts/types';
import { sortUsers } from '@followBack/Utils/messages';
import { getContacts, setContacts } from './contactDetails';
import { useGetUsername } from '@followBack/Hooks/Apis/Username';

const getUserName = (userAddress: string) => {
  getContacts().then((contactsString) => {
    if (contactsString) {
      const localContactsList: IContact[] = <IContact[]>JSON.parse(contactsString);
      let userIndex = localContactsList.findIndex((contact, index) => {
        if(contact.address == userAddress) {
          return index;
        }
        return -1;
      });
      if (userIndex >= 0) {
        return localContactsList[userIndex].name;
      } else {
        const { data } = useGetUsername({forAddress: userAddress});
        const userName = data?.data.name;
        console.log(userName);
        localContactsList.push({ address: userAddress, name: userName});
        setContacts(JSON.stringify(localContactsList));
        return userName;
      }
    }
  });
  return undefined;
}

export const getThreadParticipantsUserName = (users: IContact[]) => {
  let  sortedUsers = sortUsers(users);
  if (!sortedUsers || sortedUsers?.length === 0) return '';
  sortedUsers.forEach((user, index) => {
    if(!user.name) {
      user.name = getUserName(user.address);
    }
  });
  const firstUserName = sortedUsers[0]?.name ?? sortedUsers[0]?.address;
  if (sortedUsers.length === 1) return firstUserName;
  const secondUserName = sortedUsers[1]?.name ?? sortedUsers[1]?.address;

  if (sortedUsers.length === 2) {
    return `${firstUserName} & ${secondUserName}`;
  }
  return `${firstUserName} & ${sortedUsers.length - 1} others`;
};
