import moment from "moment";

export const formatMessageDate = ({ date }) => {
  return moment(date).format("MMM Do");
};
