import { createRealmContext } from "@realm/react";
import { Attachment, Contact, LastHeader, Message, Reaction, Thread } from "./schemas";

const config = {
  schema: [Message, Attachment, Contact, Reaction, Thread, LastHeader],
  schemaVersion: 1,
};
export default createRealmContext(config);