

import { Realm, } from '@realm/react';
import { Thread as ThreadType } from '@followBack/Apis/threadsList/type';

export class Thread extends Realm.Object {

    static generate(thread: ThreadType) {
        return {
            ...thread
        };
    }

    // To use a class as a Realm object type, define the object schema on the static property "schema".
    static schema = {
        name: 'Thread',
        primaryKey: 'threadId',
        properties: {
            topicId: 'string',
            headerId: "string",
            threadId: 'string',
            subject: 'string',
            text: 'string',
            initiator: 'string',
            promotional: 'bool',
            favorite: 'bool',
            favicon: 'string',
            seen: 'bool',
            createdAt: 'string',
            lastHeader:"LastHeader"
        },
    };
}