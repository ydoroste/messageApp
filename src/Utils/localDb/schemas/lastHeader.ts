
import { Realm } from '@realm/react';

export class LastHeader extends Realm.Object {
    static schema = {
        name: 'LastHeader',
        properties: {
            formContact: 'Contact',
            toList: 'Contact[]',
            // ccList:{objectType: "Contact", type:'set'},
            outbound:'bool',
            attachments:'Attachment[]'
        },
    };
}