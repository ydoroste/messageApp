export interface ICodeVerificationLayoutProps {
    VerificationValue: string,
    hashedCodeVerificationValue: string
}

export type encryptCodeVerificationValueType = (value: string, isPhoneNumber: boolean)=> string;