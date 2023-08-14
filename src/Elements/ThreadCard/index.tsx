import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import { IthreadCardProps } from '@followBack/Elements/ThreadCard/types';
import Typography from '@followBack/GenericElements/Typography';
import Avatar from '@followBack/Elements/Avatar';
import { useUserDetails } from '@followBack/Hooks/useUserDetails';
import { excludeUser } from '@followBack/Utils/messages';
import { getThreadParticipantsUserName } from '@followBack/Utils/stringUtils';
import { formatMessageDate } from '@followBack/Utils/date';
import IconButton from '@followBack/GenericElements/IconButton';
import useTheme from '@followBack/Hooks/useTheme';
import { IContact } from '@followBack/Apis/Contacts/types';
import { MAIL_DOMAIN } from '@followBack/Apis/constants';

const ThreadCard: React.FC<IthreadCardProps> = ({ threadItem }) => {
  if (!threadItem) return <></>;
  const { userDetails } = useUserDetails();
  const { colors } = useTheme();

  let others: IContact[] = [];
  others = excludeUser({
    users: [
      threadItem.lastHeader.formContact,
      ...threadItem.lastHeader.toList,
      ...(threadItem.lastHeader.ccList ?? []),
      ...(threadItem.lastHeader.bccList ?? []),
    ],
    userAddress: `${userDetails.user_name}@${MAIL_DOMAIN}`,
  });
  others =
    others.length === 0 &&
    threadItem?.lastHeader.formContact.address ===
      `${userDetails.user_name}@${MAIL_DOMAIN}`
      ? [
          {
            name: userDetails.user_name,
            address: `${userDetails.user_name}@${MAIL_DOMAIN}`,
          },
        ]
      : others;

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
        <Avatar users={others} imageURL={''} />
      </View>

      <View style={[styles.content, { flex: 3.5 }]}>
        <View>
          <Typography
            type={isMessageSeen ? 'mediumRegularTitle' : 'mediumBoldTitle'}
            color={textColor}
            ellipsizeMode='tail'
            numberOfLines={1}
          >
            {getThreadParticipantsUserName(others)}
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography
            type={isMessageSeen ? 'mediumRegularBody' : 'mediumBoldBody'}
            color={textColor}
            ellipsizeMode='tail'
            numberOfLines={1}
          >
            {message}
          </Typography>
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
      <View style={{ alignSelf: 'flex-end' }}></View>
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
