import { createRealmContext } from "@realm/react";
import { Attachment, Contact, LastHeader, Message, Reaction, Thread } from "./schemas";
import { Mailbox } from "./schemas/mailbox";

const config = {
  schema: [Message, Attachment, Contact, Reaction, Thread, LastHeader, Mailbox],
  schemaVersion: 7,
};
export default createRealmContext(config);