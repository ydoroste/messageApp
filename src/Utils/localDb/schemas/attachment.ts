
import { Realm } from '@realm/react';

export class Attachment extends Realm.Object {
    static schema = {
        name: 'Attachment',
        primaryKey: 'id',
        properties: {
            id: 'string',
            headerId: 'string',
            url: 'string',
            title: 'string',
            type: 'string',
            size: 'int',

        },
    };
}