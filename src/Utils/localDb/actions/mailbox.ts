
import { MailBox } from '@followBack/Contexts/MailboxesContext/types';
import { Realm } from '@realm/react';

export const insertMailBoxesToLDB = async(mailboxes:MailBox[] )=>{
    const realm =await Realm.open()
    realm.write(()=>{
        mailboxes.forEach((element:MailBox) => {
            realm.create("Mailbox", element, true)
        });
    })
}