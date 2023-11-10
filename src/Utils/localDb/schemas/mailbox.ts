import { MailBox } from '@followBack/Contexts/MailboxesContext/types';
import { Realm } from '@realm/react';

export class Mailbox extends Realm.Object {
    
    static generate(mailbox: MailBox) {
        return mailbox
    }
    static schema = {
        name: 'Mailbox',
        primaryKey: 'id',
        properties: {
            id: 'string',
            mailbox: 'string'
        },
    };
}