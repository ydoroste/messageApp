import { StyleSheet, View } from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { IthreadCardProps } from '@followBack/Elements/ThreadCard/types';
import Typography from '@followBack/GenericElements/Typography';
import Avatar from '@followBack/Elements/Avatar';
import { useUserDetails } from '@followBack/Hooks/useUserDetails';
import { excludeUser } from '@followBack/Utils/messages';
import {
  getThreadParticipantsUserName,
  getUserName,
} from '@followBack/Utils/stringUtils';
import { formatMessageDate } from '@followBack/Utils/date';
import IconButton from '@followBack/GenericElements/IconButton';
import useTheme from '@followBack/Hooks/useTheme';
import { IContact } from '@followBack/Apis/Contacts/types';
import _ from 'lodash';

const ThreadCard: React.FC<IthreadCardProps> = ({ threadItem }) => {
  const { userDetails } = useUserDetails();
  const { colors } = useTheme();
  const [usernames, setUsernames] = useState<string | undefined>('');

  let others: IContact[] = [];

  others = excludeUser({
    users: [
      threadItem.lastHeader.formContact,
      ...threadItem.lastHeader.toList,
      ...(threadItem.lastHeader.ccList ?? []),
      ...(threadItem.lastHeader.bccList ?? []),
    ],
    userAddress: `${userDetails.user_name}@iinboxx.com`,
  });

  others =
    others.length === 0 &&
    threadItem?.lastHeader.formContact.address ===
      `${userDetails.user_name}@iinboxx.com`
      ? [
          {
            name: userDetails.user_name,
            address: `${userDetails.user_name}@iinboxx.com`,
          },
        ]
      : others;

  useEffect(() => {
    const getFinalUsers = () => {
      others.forEach(async (user) => {
        if (!user.name) {
          user.name = await getUserName(user.address);
        }
      });
      return others;
    };
    others =
      others.length === 0 &&
      threadItem?.lastHeader.formContact.address ===
        `${userDetails.user_name}@iinboxx.com`
        ? [
            {
              name: userDetails.user_name,
              address: `${userDetails.user_name}@iinboxx.com`,
            },
          ]
        : getFinalUsers();
  }, [others]);

  useEffect(() => {
    const getFullData = async () => {
      const data = await getThreadParticipantsUserName(others);
      setUsernames(data);
    };
    getFullData();
  }, [others]);

  const message =
    threadItem.text?.trim() && threadItem.text?.trim() !== ''
      ? threadItem.text?.trim()
      : '<no message>';
  const subject =
    threadItem.subject?.trim() && threadItem.subject?.trim() !== ''
      ? threadItem.subject?.trim()
      : '<no subject>';
  const isMessageSeen = threadItem.seen;
  const textColor = isMessageSeen ? 'secondary' : 'chat';

  return (
    <View style={styles.container}>
      <View style={{ ...styles.avatar }}>
        <Avatar users={others} />
      </View>

      <View style={[styles.content, { flex: 3.5 }]}>
        <View>
          <Typography
            type={isMessageSeen ? 'mediumRegularTitle' : 'mediumBoldTitle'}
            color={textColor}
            ellipsizeMode='tail'
            numberOfLines={1}
          >
            {usernames}
          </Typography>
        </View>

        <View style={{ marginBottom: 3, flexDirection: 'row' }}>
          <Typography
            type={isMessageSeen ? 'largeRegularBody' : 'largeBoldBody'}
            color={textColor}
            ellipsizeMode='tail'
            numberOfLines={1}
          >
            {subject}
          </Typography>
          {threadItem.lastHeader.attachments.length > 0 && (
            <IconButton
              onPress={() => {}}
              name='attachment'
              width={12}
              height={20}
              color={colors.grey01}
            />
          )}
        </View>
        <View>
          <Typography
            type={isMessageSeen ? 'mediumRegularBody' : 'mediumBoldBody'}
            color={textColor}
            ellipsizeMode='tail'
            numberOfLines={1}
          >
            {message}
          </Typography>
        </View>
      </View>
      <View style={{ justifyContent: 'flex-start' }}>
        <Typography
          type={isMessageSeen ? 'smallRegularBody' : 'smallBoldBody'}
          color={textColor}
          ellipsizeMode='tail'
          numberOfLines={1}
          lineHeight={17}
          textAlign='center'
        >
          {formatMessageDate(threadItem.createdAt)}
        </Typography>
      </View>
    </View>
  );
};

export default memo(ThreadCard);

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },

  avatar: {
    marginRight: 10,
    width: 52,
  },
  content: {
    flex: 1,
    width: '100%',
  },
});
