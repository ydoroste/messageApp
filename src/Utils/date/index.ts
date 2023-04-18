import moment from "moment";
import momentTimeZone from 'moment-timezone';
import * as localization from 'expo-localization';

export const formatMessageDate = ( date: string ) => {
    const offset = getTimeZoneOffset();
  const momentDate = moment(date, 'YYYY-MM-DD hh:mm A').add(offset, "hours");

    let hours = moment().diff(momentDate, 'hours');
    //if message send date is less than 24 hours, show hours only
    if(hours < 24){
        return momentDate.format("hh:mm A");
    }
    if(hours > 24 && hours < 48){
        return "yesterday";
    }
 const years = moment().diff(momentDate, 'years', false);
 const format = years > 1 ?  "MMM DD, YYYY" : "MMM DD";
  return  momentDate.format(format);
};
export const conversationDateTime = (date: string)=>{
    const offset = getTimeZoneOffset();
    const momentDate = moment(date, 'YYYY-MM-DD hh:mm A').add(offset, "hours");
    return  momentDate.format("MMM DD");

};

const getTimeZoneOffset =()=>{
    const today = momentTimeZone().tz(localization.timezone);
    return today.utcOffset() / 60 - 2;
};