
import { IThreadMessage } from '@followBack/Apis/ThreadMessages/types';
import { Realm, } from '@realm/react';

export class Message extends Realm.Object {

    static generate(message: IThreadMessage, threadId: string) {
        return {
            ...message, threadId
        };
    }

    // To use a class as a Realm object type, define the object schema on the static property "schema".
    static schema = {
        name: 'Message',
        primaryKey: 'messageId',
        properties: {
            headerId: "string?",
            messageId:"string",
            threadId: "string",
            html: "string?",
            from: 'Contact',
            to:'Contact[]',
            cc:'Contact[]',
            text: "string?",
            edited: "bool?",
            forwarded: 'bool?',
            createdAt: 'string?',
            subject: 'string?',
            notConfirmedNewMessage: 'bool?',
            failedToSend: 'bool?',
            updatedAt: 'string?',
            isDeleted: 'bool?',
            index: "int?",
            promotional: 'bool?',
            outbound: 'bool?',
            attachments:'Attachment[]',
            reactions: 'Reaction[]'
        },
    };
}