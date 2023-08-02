import Typography from '@followBack/GenericElements/Typography';
import React, { useMemo, useRef, useState } from 'react';
import { View, Pressable, Image, Text } from 'react-native';
import { formatMessageDate } from '@followBack/Utils/date';
import useStylesWithTheme from '@followBack/Hooks/useStylesWithTheme';
import { useUserDetails } from '@followBack/Hooks/useUserDetails';
import { excludeUser, makeid } from '@followBack/Utils/messages';
import { emailNameParcer } from '@followBack/Utils/email';
import useTheme from '@followBack/Hooks/useTheme';
import { UIActivityIndicator } from 'react-native-indicators';
import { IThreadMessage } from '@followBack/Apis/ThreadMessages/types';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Menu as MaterialMenu,
  MenuItem,
  MenuDivider,
} from 'react-native-material-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { HoldItem } from 'react-native-hold-menu';

const Message = ({
  item,
  senderMenu,
  receiverMenu,
}: {
  item: IThreadMessage;
  senderMenu: any;
  receiverMenu: any;
}) => {
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
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const others = excludeUser({
    users: chatUsers,
    userAddress: `${userDetails.user_name}@iinboxx.com`,
  });

  const isGroupChat = others.length > 1;
  const messageSender = sender;
  const userFirstName =
    messageSender?.name?.length ?? -1 > 0
      ? messageSender?.name?.split(' ')?.[0]
      : messageSender.address;
  const messageSenderLabel =
    messageSender?.name?.length ?? -1 > 0
      ? messageSender.name
      : messageSender.address;

  const messageStyle = isOwnMessage
    ? styles.ownMessageStyle
    : styles.otherMessagesStyle;
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const actionParamsProps = useMemo(() => {
    return {
      Edit: [item],
      Reply: [item],
      'Unsend for me': [item],
      'Unsend for all': [item],
    };
  }, [item]);

  return (
    <HoldItem
      key={`message-${item.messageId}`}
      items={isOwnMessage ? senderMenu(item.createdAt ?? '') : receiverMenu}
      actionParams={actionParamsProps}
      containerStyles={{ justifyContent: 'center' }}
    >
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          itemPosition.current = height / 2 - 4;
        }}
        style={{
          ...styles.container,
          ...(isOwnMessage ? { marginLeft: 'auto' } : { marginRight: 'auto' }),
        }}
      >
        <Pressable
          onPress={() => {
            setShowDate((prevState) => !prevState);
          }}
          style={[styles.contentContainer, messageStyle]}
          onLongPress={() => {
            console.log('Long pressed');
          }}
        >
          {text && (
            <Typography type='largeRegularBody' color='chat'>
              {isGroupChat && !isOwnMessage && (
                <Typography type='largeBoldBody' color='chat'>
                  {userFirstName + ' '}
                </Typography>
              )}
              {text}
            </Typography>
          )}
          {item.attachments && item.attachments.length > 0 && (
            <ScrollView horizontal style={{ maxHeight: 100 }}>
              {item.attachments.map((attachment, index) => {
                return (
                  <Image
                    key={makeid(index)}
                    style={{
                      width: 80,
                      height: 80,
                      margin: 5,
                      borderRadius: 5,
                    }}
                    source={{ uri: attachment.url, cache: 'force-cache' }}
                    resizeMethod='scale'
                    resizeMode='cover'
                  />
                );
              })}
            </ScrollView>
          )}
        </Pressable>
        {false && (
          <View style={styles.activityIndicatorContainer}>
            <UIActivityIndicator color={colors.grey02} size={15} />
          </View>
        )}
      </View>
      {showDate && (
        <View
          style={[
            {
              alignSelf: isOwnMessage ? 'flex-start' : 'flex-end',
              position: 'absolute',
            },
          ]}
        >
          <Typography type='smallRegularBody' color='secondary'>
            {formatMessageDate(createdAt ?? '')}
          </Typography>
        </View>
      )}
    </HoldItem>
  );
};

const useStyles = useStylesWithTheme((theme) => ({
  container: {},
  date: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'absolute',
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '80%',
    borderRadius: 20,
    backgroundColor: theme.colors.dark02,
  },
  activityIndicatorContainer: {
    position: 'absolute',
    left: -20,
    top: '30%',
  },
  ownMessageStyle: {
    backgroundColor: theme.colors.dark02,
  },
  otherMessagesStyle: {
    backgroundColor: theme.colors.dark04,
    borderColor: theme.colors.dark02,
    borderWidth: 1,
  },
}));

export default React.memo(
  Message,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
