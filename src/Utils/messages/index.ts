import {UserDetails} from "@followBack/Utils/stringUtils";

export const excludeUser = ({ users, userAddress }) =>
  users.filter((user) => user.address !== userAddress);

export const sortUsers = (users: UserDetails[], initiator = undefined)=> {

   return users.sort((a,b) => {
       if(initiator){
        return a.address < b.address || a.address === initiator ? -1 : 1
       }
        return a.address > b.address ? 1 : -1;
    });
};