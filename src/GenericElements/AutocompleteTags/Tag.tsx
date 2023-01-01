import * as React from 'react';
import Typography from '@followBack/GenericElements/Typography';
import { StyleSheet, View } from 'react-native';
import IconButton from '@followBack/GenericElements/IconButton';
import useTheme from '@followBack/Hooks/useTheme';
import { ITagProps } from '@followBack/GenericElements/AutocompleteTags/types';
import useStylesWithTheme from '@followBack/Hooks/useStylesWithTheme';
import { emailNameParcer } from '@followBack/Utils/email';
import { IContact } from '@followBack/Apis/Contacts/types';

const Tag: React.FC<ITagProps> = ({ tag, onPress }) => {
  const { colors } = useTheme();
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <Typography color='primary' type='mediumRegularBody'>
        {emailNameParcer(tag.address)}
      </Typography>
      <View style={styles.iconContainer}>
        <IconButton
          onPress={() => onPress(tag)}
          name='close'
          width={7}
          height={7}
          color={colors.white}
        />
      </View>
    </View>
  );
};
export default Tag;

const useStyles = useStylesWithTheme((theme) => ({
  container: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'gray',
    borderRadius: 5,
    position: 'relative',
    height: 25,
    marginHorizontal: 3,
    marginVertical: 4,
  },
  iconContainer: {
    position: 'absolute',
    backgroundColor: theme.colors.black,
    top: -10,
    height: 14,
    width: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    right: -8,
  },
}));
