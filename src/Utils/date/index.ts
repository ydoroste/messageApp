import moment from "moment";

export const formatMessageDate = ( date: string ) => {

  const momentDate = moment(date, 'YYYY-MM-DD hh:mm A');
    let hours = moment().diff(momentDate, 'hours');
    //if message send date is less than 24 hours, show hours only
    if(hours < 24){
        return momentDate.format("hh:mm A");
    }
 const years = moment().diff(momentDate, 'years', false);
 const format = years > 1 ?  "MMM DD, YYYY" : "MMM DD";
  return  momentDate.format(format);
};
