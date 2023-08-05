import { IThreadMessage } from '@followBack/Apis/ThreadMessages/types';
import { Thread } from '@followBack/Apis/threadsList/type';

export const sortDataSet = (arr: any[]) => {
  arr.sort(function (a, b) {
    const dateA = new Date(a?.createdAt ?? '');
    const dateB = new Date(b?.createdAt ?? '');
    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  });
  return arr;
};
