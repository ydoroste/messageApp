import { MAIL_DOMAIN } from "@followBack/Apis/constants";
import { IThreadMessage } from "@followBack/Apis/ThreadMessages/types";
import { emailNameParcer } from "@followBack/Utils/email";
import { excludeUser } from "@followBack/Utils/messages";
import { useUserDetails } from "./useUserDetails";

const useMessageSenderDetails = (item: IThreadMessage) => {
  const { text, to, from, cc, bcc } = item;
  const { userDetails } = useUserDetails();
  const isOwnMessage = !item?.from?.address
    ? true
    : userDetails.user_name === emailNameParcer(item?.from?.address);

  const sender = from ?? {
    name: userDetails.user_name,
    address: userDetails.email,
  };
  const toList = to ?? [];
  const ccList = cc ?? [];
  const bccList = bcc ?? [];

  const chatUsers = [...toList, ...ccList, ...bccList, sender];

  const others = excludeUser({
    users: chatUsers,
    userAddress: `${userDetails.user_name}@${MAIL_DOMAIN}`,
  });

  const isGroupChat = others.length > 1;
  const messageSender = sender;
  const userFirstName =
    messageSender?.name?.length ?? -1 > 0
      ? messageSender?.name?.split(" ")?.[0]
      : messageSender.address;

  return { isOwnMessage, isGroupChat, userFirstName, text };
};

export default useMessageSenderDetails;
