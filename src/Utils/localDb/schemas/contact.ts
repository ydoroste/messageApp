
import { Realm } from '@realm/react';

export class Contact extends Realm.Object {
    static schema = {
        name: 'Contact',
        primaryKey: 'address',
        properties: {
            address: 'string',
            name: 'string?'
        },
    };
}