
import { Thread as ThreadType } from '@followBack/Apis/threadsList/type';
import { Realm } from '@realm/react';
import { Thread } from '../schemas';

export const insertThreadsToLDB = async(threads:ThreadType[], mailboxId: string )=>{
    const realm =await Realm.open()
    realm.write(()=>{
        threads.forEach((element:ThreadType) => {
            realm.create("Thread",Thread.generate(element, mailboxId), true)
        });
    })
}