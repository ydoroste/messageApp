
import { Thread as ThreadType } from '@followBack/Apis/threadsList/type';
import { Realm } from '@realm/react';
import { Thread } from '../schemas';

export const insertThreadsToLDB = (threads: ThreadType[], mailboxId: string) =>new Promise(async(resolve, reject)=>{
    const realm = await Realm.open()
    realm.write(() => {
        threads.forEach((element: ThreadType,  index: number) => {
            realm.create("Thread", Thread.generate(element, mailboxId), true)
            if(index==threads.length-1){
                const threads = realm.objects("Thread").filtered(`mailbox == "${mailboxId}"`).sorted("createdAt", true)
                resolve(threads)
            }
        });
    })
})
export const bookmarkThreadLDB = async (thread: ThreadType) => {
    const realm = await Realm.open()
    const newThread = { ...thread, favorite: !thread.favorite }
    realm.write(() => {
        realm.create("Thread", newThread, true)
    })
}

export const seenThreadLDB = async (thread: ThreadType) => {
    const realm = await Realm.open()
    const newThread = { ...thread, seen: true }
    realm.write(() => {
        realm.create("Thread", newThread, true)
    })
}
