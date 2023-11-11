import { IThreadMessage } from '@followBack/Apis/ThreadMessages/types';
import { Realm } from '@realm/react';
import { Message } from '../schemas';

export const insertMessagesToLDB = async (messages: IThreadMessage[], threadId: string) => {
    const realm = await Realm.open()
    realm.write(() => {
        messages.forEach((element: IThreadMessage) => {
            realm.create("Message", Message.generate(element, threadId), true)
        });
    })
}

export const getMessagesFromLocalDB = async (id: string, callBack: (messages: IThreadMessage[]) => void) => {
    const realm = await Realm.open()
    realm.write(() => {
        const messages = realm.objects("Message").filtered(`threadId == "${id}"`).sorted("createdAt", false)
        callBack(messages)
    })
}