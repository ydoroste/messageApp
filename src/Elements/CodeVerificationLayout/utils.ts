import {encryptCodeVerificationValueType} from "@followBack/Elements/CodeVerificationLayout/types";

export const encryptCodeVerificationValue: encryptCodeVerificationValueType =(value, isPhoneNumber)=>{
    const hashingValue = "\u2022";
    if(isPhoneNumber){
      return `${hashingValue.repeat(value.length - 2)}${value.substring(value.length - 2)}`;
    }
    const emailDomainIndex = value.indexOf("@");
    const hostIndex = value.lastIndexOf(".");
   return `${value.substr(0, 3)}${hashingValue.repeat(emailDomainIndex - 3)}${value.substr(emailDomainIndex, 3)}${hashingValue.repeat(hostIndex - emailDomainIndex - 3)}${value.substring(hostIndex)}`;

};