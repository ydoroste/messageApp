import { IContact } from '@followBack/Apis/ContactsList/types';

export const excludeUser = ({
  users,
  userAddress,
}: {
  users: IContact[];
  userAddress: string;
}) =>
  users.filter(
    (user) => user.address.toLowerCase() !== userAddress.toLowerCase()
  );

export const sortUsers = (users: IContact[], initiator = undefined) => {
  return users.sort((a, b) => {
    if (initiator) {
      return a.address < b.address || a.address === initiator ? -1 : 1;
    }
    return a.address > b.address ? 1 : -1;
  });
};

// Generate fake messageId for list keyextractor in case of malformed thread.messageId
export const makeid = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
