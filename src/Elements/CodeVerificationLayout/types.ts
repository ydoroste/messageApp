import React from "react";

export interface ICodeVerificationLayoutProps {
    VerificationValue: string,
    hashedCodeVerificationValue: string
    children: React.ReactNode
}

export type encryptCodeVerificationValueType = (value: string, isPhoneNumber: boolean)=> string;