import { ParamListBase } from "@react-navigation/native";
import {
  NativeStackHeaderProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack/lib/typescript/src/types";

export interface ThreadDetailsHeaderProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  subject: string;
  receiver: string;
  firtMessageDate: string;
  favicon: string;
}
