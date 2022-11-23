import {ResetMethod} from "@followBack/Apis/ForgetPassword/types";

export interface ICodeVerificationLayoutProps {
    VerificationValue: string,
    hashedCodeVerificationValue: string,
    verificationMethod: ResetMethod
}

export type encryptCodeVerificationValueType = (value: string, resetMethod: ResetMethod)=> string;