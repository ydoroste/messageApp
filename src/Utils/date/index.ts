import moment from "moment";
import momentTimeZone from "moment-timezone";
import * as localization from "expo-localization";

export const formatMessageDate = (date: string) => {
  const offset = getTimeZoneOffset();
  const momentDate = moment(date, "YYYY-MM-DD h:mm A").add(offset, "hours");

  const dateDiff = moment(momentDate)
    .startOf("day")
    .diff(moment(Date.now()).startOf("day"), "days");
  //if message send date is less than 24 hours, show hours only
  if (dateDiff === 0) {
    return momentDate.format("h:mm A");
  }
  if (dateDiff === -1) {
    return "yda";
  }
  const years = moment().diff(momentDate, "years", false);
  const format = years > 1 ? "MMM DD, YYYY" : "MMM DD";
  return momentDate.format(format);
};
export const conversationDateTime = (date: string) => {
  if (date.length == 0) {
    return "";
  }
  const offset = getTimeZoneOffset();
  const momentDate = moment(date, "YYYY-MM-DD h:mm A").add(offset, "hours");
  return momentDate.format("MMM DD");
};

const getTimeZoneOffset = () => {
  const today = momentTimeZone().tz(localization.timezone);
  return today.utcOffset() / 60;
};

export const isTimelimitExceeded = (date: string) => {
  const dateDiff = moment.utc(date).diff(moment.utc(Date.now()), "minutes");
  if (Math.abs(dateDiff) < 10 || isNaN(Math.abs(dateDiff))) {
    return false;
  }
  return true;
};
