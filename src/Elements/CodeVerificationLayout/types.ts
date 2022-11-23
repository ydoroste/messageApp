import {ResetMethod} from "@followBack/Apis/ForgetPassword/types";
import * as React from "react";

export interface ICodeVerificationLayoutProps {
    userName: string,
    hashedCodeVerificationValue: string,
    verificationMethod: ResetMethod
    children: React.ReactNode
}

export type encryptCodeVerificationValueType = (value: string, resetMethod: ResetMethod)=> string;