
import { Realm } from '@realm/react';

export class Reaction extends Realm.Object {
    static schema = {
        name: 'Reaction',
        primaryKey: 'id',
        properties: {
            byUserId: 'string',
            createdAt: 'string',
            headerId: 'string',
            id: 'string',
            reaction: 'string',
        },
    };
}