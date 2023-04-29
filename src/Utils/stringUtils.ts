import {sortUsers} from "@followBack/Utils/messages";

export interface UserDetails {
    address: string;
    name: string;
}

export const getThreadParticipantsUserName = (users: UserDetails[], initiator = {}) =>{
    const sortedUsers = sortUsers(users);
    if(!sortedUsers || sortedUsers?.length === 0)
        return "";
    const firstUserName = sortedUsers[0]?.name ?? sortedUsers[0]?.address;
    if(sortedUsers.length === 1)
        return firstUserName;
    const secondUserName = sortedUsers[1]?.name ?? sortedUsers[1]?.address;

    if(sortedUsers.length === 2){
        return `${firstUserName} & ${secondUserName}`;
    }
    return `${firstUserName} & ${sortedUsers.length - 1} others`;
}