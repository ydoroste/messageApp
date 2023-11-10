
import { Realm } from '@realm/react';

export class LastHeader extends Realm.Object {
    static schema = {
        name: 'LastHeader',
        primaryKey: 'id',
        properties: {
            id: 'string',
            formContact: 'Contact',
            toList: 'Contact[]',
            ccList:'Contact[]',
            outbound:'bool',
            attachments:'Attachment[]'
        },
    };
}