export const sortDataSet = (arr: any[], descending: boolean = true) => {
  arr.sort(function (a, b) {
    const dateA = new Date(a?.createdAt ?? '');
    const dateB = new Date(b?.createdAt ?? '');
    if (dateA < dateB) {
      return descending ? 1 : -1;
    }
    if (dateA > dateB) {
      return descending ? -1 : 1;
    }
    return 0;
  });
  return arr;
};
