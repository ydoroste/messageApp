import Typography from "@followBack/GenericElements/Typography";
import React, { useEffect, useRef, useState } from "react";
import { View, Pressable, Image } from "react-native";
import { formatMessageDate } from "@followBack/Utils/date";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import { useUserDetails } from "@followBack/Hooks/useUserDetails";
import { excludeUser, makeid } from "@followBack/Utils/messages";
import { emailNameParcer } from "@followBack/Utils/email";
import useTheme from "@followBack/Hooks/useTheme";
import {
  UIActivityIndicator,
} from 'react-native-indicators';
import { IThreadMessage } from "@followBack/Apis/ThreadMessages/types";
import { ScrollView } from "react-native-gesture-handler";

const Message = ({ item }: {item: IThreadMessage}) => {
  const { styles } = useStyles();
  const { text, to, from, cc, bcc, createdAt } = item;
  const { userDetails } = useUserDetails();
  const { colors } = useTheme();
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
  const itemPosition = useRef<number>(0);
  const [showDate, setShowDate] = useState(false);

  const others = excludeUser({
    users: chatUsers,
    userAddress: userDetails.email,
  });

  const isGroupChat = others.length > 1;
  const messageSender = sender;
  const userFirstName = messageSender.name.length > 0 ?
      messageSender.name.split(' ')?.[0] : messageSender.address;
  const messageSenderLabel =
    messageSender.name.length > 0 ? messageSender.name : messageSender.address;

  const messageStyle = isOwnMessage ? styles.ownMessageStyle : styles.otherMessagesStyle;
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  
  useEffect(() => {
    // console.log("ATTACHMENTS ======> ", item.attachments);
  });

  return (
    <>
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          itemPosition.current = height / 2 - 4;
        }}
        style={{
          ...styles.container,
          ...(isOwnMessage ? { marginLeft: "auto" } : { marginRight: "auto" }),
        }}
      >
        <Pressable
          onPress={() => {
            setShowDate((prevState) => !prevState);
          }}
          style={[styles.contentContainer, messageStyle]}
        >
          {text && <Typography type="largeRegularBody" color="chat">
            {isGroupChat && !isOwnMessage && (
                <Typography type="largeBoldBody" color="chat">
                  {userFirstName + " "}
                </Typography>
            )}
            {text}
          </Typography>}
          {item.attachments && item.attachments.length > 0 && 
              <ScrollView horizontal style={{maxHeight: 100}}>
                {item.attachments.map((attachment, index) => {
                  return <Image
                  key={makeid(index)}
                  style={{ width: 80, height: 80, margin: 5, borderRadius: 5 }}
                  source={{ uri: attachment.url}}
                  resizeMethod="scale"
                  resizeMode="cover"/>
                })}
              </ScrollView>
          }
        </Pressable>
        {
        false
        && <View style={styles.activityIndicatorContainer}>
          <UIActivityIndicator color={colors.grey02} size={15} />
        </View>}
      </View>

      {showDate && (
        <View
          style={[
            styles.date,
            {
              top: itemPosition.current,
              left: isOwnMessage ? 0 : undefined,
              right: !isOwnMessage ? 0 : undefined,
            },
          ]}
        >
          <Typography type="smallRegularBody" color="secondary">
            {formatMessageDate(createdAt ?? "")}
          </Typography>
        </View>
      )}
    </>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  container: {
    position: "relative",
  },
  date: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    position: "absolute",
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "80%",
    borderRadius: 20,
    backgroundColor: theme.colors.dark02,
  },
  activityIndicatorContainer: {
   position: "absolute",
   left: -20,
   top: "30%",
  },
  ownMessageStyle: {
   backgroundColor: theme.colors.dark02
  },
  otherMessagesStyle: {
    backgroundColor: theme.colors.dark04,
    borderColor: theme.colors.dark02,
    borderWidth: 1
  }
}));

export default React.memo(
  Message,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
