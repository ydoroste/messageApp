import {encryptCodeVerificationValueType} from "@followBack/Elements/CodeVerificationLayout/types";
import {ResetMethod} from "@followBack/Apis/ForgetPassword/types";

export const encryptCodeVerificationValue: encryptCodeVerificationValueType =(value, resetMethod)=>{
    const hashingValue = "\u2022";
    if(resetMethod === ResetMethod.Phone){
      return `${hashingValue.repeat(value.length - 2)}${value.substring(value.length - 2)}`;
    }
    const emailDomainIndex = value.indexOf("@");
    const hostIndex = value.lastIndexOf(".");
   return `${value.substr(0, 3)}${hashingValue.repeat(emailDomainIndex - 3)}${value.substr(emailDomainIndex, 3)}${hashingValue.repeat(hostIndex - emailDomainIndex - 3)}${value.substring(hostIndex)}`;

};