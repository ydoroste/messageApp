interface UserDetails {
    email: string;
    name: string;
}

export const getThreadParticipantsUserName = (users: UserDetails[]) =>{
    if(!users || users?.length === 0)
        return "";
    if(users.length === 1)
        return users[0].name;
    if(users.length === 2){
        return `${users[0].name} & ${users[1].name}`;
    }
    return `${users[0].name} & ${users.length - 1} others`;
}