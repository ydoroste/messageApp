import { NativeStackHeaderProps } from "@react-navigation/native-stack/lib/typescript/src/types";

export interface ThreadDetailsHeaderProps extends NativeStackHeaderProps {
    subject: string;
    chatUsers: { name: string; address: string };
  }