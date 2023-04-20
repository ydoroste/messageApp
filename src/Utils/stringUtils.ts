interface UserDetails {
    address: string;
    name: string;
}

export const getThreadParticipantsUserName = (users: UserDetails[]) =>{
    if(!users || users?.length === 0)
        return "";
    const firstUserName = users[0]?.name ?? users[0]?.address;
    if(users.length === 1)
        return firstUserName;
    const secondUserName = users[1]?.name ?? users[1]?.address;

    if(users.length === 2){
        return `${firstUserName} & ${secondUserName}`;
    }
    return `${firstUserName} & ${users.length - 1} others`;
}