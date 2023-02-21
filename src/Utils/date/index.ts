import moment from "moment";

export const formatMessageDate = ({ date, isShort = false }) => {
  const momentDate = moment(date);
  return isShort ? momentDate.format("MMM Do") : momentDate.format("MMMM Do");
};
