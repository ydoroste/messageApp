import IconButton from '@followBack/GenericElements/IconButton';
import Typography from '@followBack/GenericElements/Typography';
import React, { useCallback, useReducer, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';
import useTheme from '@followBack/Hooks/useTheme';
import Button from '@followBack/GenericElements/Button';
import InputField from '@followBack/GenericElements/InputField';
import Divider from '@followBack/GenericElements/Divider';
import { AuthorizedScreensEnum } from '@followBack/Navigation/Authorized/constants';
import ComposeAutoComplete from '@followBack/Elements/ComposeAutoComplete/composeAutoComplete.index';
import { useCompose } from '@followBack/Hooks/Apis/Compose';
import { IComposeApiRequest } from '@followBack/Apis/Compose/types';
import { isValidEmail } from '@followBack/Utils/validations';
import { useFocusEffect } from '@react-navigation/native';
import { useMailBoxes } from '@followBack/Hooks/useMailboxes';
import MailSender from '@followBack/Elements/MailSender/MailSender';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { IthreadsListAPIResponse } from '@followBack/Apis/threadsList/type';
import * as ImagePicker from 'expo-image-picker';
import { ICreateAttachmentRequest } from '@followBack/Apis/GetAttachmentUploadLink/types';
import {
  createAttachment,
  getUploadLinkApi,
} from '@followBack/Apis/GetAttachmentUploadLink';
import mime from 'mime';
import { makeid } from '@followBack/Utils/messages';
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import { getThreadListApi } from '@followBack/Apis/threadsList';

interface ComposeHeaderProps extends NativeStackHeaderProps {
  handleBackButtonPress?: () => void;
}

const SET_KEY_VALUE = 'SET_KEY_VALUE';

const RESET = 'RESET';

const initialState = {
  toSearchValue: '',
  ccSearchValue: '',
  bccSearchValue: '',
  toList: [],
  ccList: [],
  bccList: [],
  subject: '',
  text: '',
  showSubject: true,
  showCcBcc: false,
  attachments: [],
  attachmentsLocalURI: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_KEY_VALUE:
      return { ...state, [payload.key]: payload.value };

    case RESET:
      return initialState;

    default:
      return state;
  }
};

const Compose: React.FC<ComposeHeaderProps> = ({ navigation }) => {
  const [toFieldIsFocused, setToFieldIsFocused] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSentMessageLoading, setIsSentMessageLoading] = useState(false);
  const [isUploadingAttachment, setIsUploadingAttachment] =
    useState<boolean>(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [attachmentsLocalURI, setAttachmentsLocalURI] = useState<string[]>([]);

  const {
    toSearchValue,
    ccSearchValue,
    bccSearchValue,
    toList,
    ccList,
    bccList,
    text,
    subject,
    showSubject,
    showCcBcc,
  } = state;
  const toFieldRef = useRef<TextInput>(null);

  const setKeyValue = ({ key, value }: { key: string; value: any }) => {
    dispatch({
      type: SET_KEY_VALUE,
      payload: { key, value },
    });
  };

  const { colors } = useTheme();

  const formatTags = (tags: string[]) =>
    tags.map((mail) => ({ name: mail.trim(), address: mail.trim() }));
  const formattedToTags = formatTags(toList);
  const formattedCcTags = formatTags(ccList);
  const formattedBccTags = formatTags(bccList);

  const composeRequest: IComposeApiRequest = {
    subject: subject,
    text: text || ' ',
    toList: isValidEmail(toSearchValue)
      ? [...formattedToTags, { name: toSearchValue, address: toSearchValue }]
      : formattedToTags,
    ccList: isValidEmail(ccSearchValue)
      ? [...formattedCcTags, { name: toSearchValue, address: ccSearchValue }]
      : formattedCcTags,
    bccList: isValidEmail(bccSearchValue)
      ? [...formattedBccTags, { name: toSearchValue, address: bccSearchValue }]
      : formattedBccTags,
    attachments: attachments,
  };

  const reset = () => {
    dispatch({ type: RESET, payload: null });
  };

  useFocusEffect(
    useCallback(() => {
      if (toFieldRef.current) {
        setTimeout(() => toFieldRef?.current?.focus(), 500);
      }
      return () => {
        reset();
        setIsSentMessageLoading(false);
        setAttachments([]);
        setAttachmentsLocalURI([]);
      };
    }, [])
  );

  const { refetch } = useCompose(composeRequest);
  const { inboxThread } = useMailBoxes();
  const id = inboxThread?.id ?? '';

  const onPressCompose = async () => {
    if (
      isUploadingAttachment &&
      attachments.length != attachmentsLocalURI.length
    ) {
      return;
    }
    try {
      if (toList.length < 0 || (!subject && !text)) return;
      setIsSentMessageLoading(true);
      Keyboard.dismiss();
      const { data } = await refetch();
      setIsSentMessageLoading(false);
      setAttachments([]);
      setAttachmentsLocalURI([]);
      setIsUploadingAttachment(false);
      if (data) {
        const topicId = data?.topicId;
        const threadsListResponse: IthreadsListAPIResponse =
          await getThreadListApi({
            id: id,
            searchValue: '',
            pageParam: 0,
          });
        threadsListResponse.data.forEach((thread) => {
          if (thread.topicId == topicId) {
            navigation.navigate(AuthorizedScreensEnum.threadsListStack, {
              screen: AuthorizedScreensEnum.threadDetails,
              params: { threadInfo: thread },
            });
          }
        });
      }
    } catch {
      setIsSentMessageLoading(false);
    }
  };

  // MARK:- add new attachments
  const onPressAttachments = async () => {
    setIsUploadingAttachment(true);
    let attachmentsToUpload: string[] =
      attachments.length > 0 ? attachments : [];
    let attachmentsToShow: string[] =
      attachmentsLocalURI.length > 0 ? attachmentsLocalURI : [];
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      orderedSelection: true,
    });
    if (result) {
      result.assets?.forEach((asset) => {
        attachmentsToShow.push(asset.uri);
      });
      await setAttachmentsLocalURI(attachmentsToShow);
      await result.assets?.forEach(async (asset) => {
        if (asset.fileSize && asset.fileSize > 25 * 1024 * 1024) {
          Alert.alert('Error', 'Attachment size is bigger than 25 MB!!!');
        } else {
          let link = await getUploadLinkApi({ filename: asset.fileName ?? '' });
          const mimeType = mime.getType(asset.fileName ?? ''); // => 'application/pdf'
          const base64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const buffer = Buffer.from(base64 ?? '', 'base64');
          let res = await fetch(link.link, {
            method: 'PUT',
            body: buffer,
            headers: {
              'Content-Type': `${mimeType}`,
            },
          });
          if (res.status == 200) {
            let createAttachmentReq: ICreateAttachmentRequest = {
              url: link.link,
              title: asset.fileName ?? '',
              type: mimeType ?? '',
              size: asset.fileSize ?? 0,
            };
            let createRes = await createAttachment(createAttachmentReq);
            attachmentsToUpload.push(createRes.id ?? '');
          }
        }
      });
    }
    setAttachments(attachmentsToUpload);
  };

  const onChangeMailContent = ({ value }: { value: any }) => {
    setKeyValue({ key: 'text', value });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 100}
      style={{ flex: 1, backgroundColor: colors.black }}
    >
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <View>
          <View style={styles.header}>
            <IconButton
              name='back'
              onPress={() => {
                if (navigation.canGoBack()) return navigation.goBack();
                navigation.navigate(AuthorizedScreensEnum.threadsListStack, {
                  screen: AuthorizedScreensEnum.threadsList,
                });
              }}
              color={colors.grey02}
              width={10}
              height={16}
            />

            <TouchableHighlight
              activeOpacity={1}
              style={{ borderRadius: 12 }}
              underlayColor={colors.grey01}
              onPress={() => reset()}
            >
              <Ionicons
                name='ios-trash-sharp'
                size={24}
                color={colors.grey02}
              />
            </TouchableHighlight>
          </View>

          <View style={styles.fieldsContainer}>
            <View style={styles.toFieldContainer}>
              <View style={styles.fieldtitle}>
                <Typography color='primary' type='largeRegularBody'>
                  to:{' '}
                </Typography>
              </View>

              <View style={{ width: '82%' }}>
                <ComposeAutoComplete
                  //@ts-ignore
                  ref={toFieldRef}
                  onFocus={() => {
                    setToFieldIsFocused(true);
                  }}
                  onBlur={() => {
                    setToFieldIsFocused(false);
                  }}
                  searchValue={toSearchValue}
                  setSearchValue={(text) =>
                    setKeyValue({ key: 'toSearchValue', value: text })
                  }
                  tags={toList}
                  setTags={(tags) =>
                    setKeyValue({ key: 'toList', value: tags })
                  }
                  type={'to'}
                />
              </View>
              {toFieldIsFocused && (
                <View style={styles.ccBcButtonsContainer}>
                  <Button
                    onPress={() =>
                      setKeyValue({ key: 'showCcBcc', value: !showCcBcc })
                    }
                    type='mediumTernary'
                  >
                    cc/bcc
                  </Button>
                </View>
              )}
            </View>

            {showCcBcc && (
              <>
                <View style={styles.ccFieldContainer}>
                  <View style={styles.fieldtitle}>
                    <Typography color='primary' type='largeRegularBody'>
                      cc:{' '}
                    </Typography>
                  </View>
                  <View style={styles.input}>
                    <ComposeAutoComplete
                      searchValue={ccSearchValue}
                      setSearchValue={(text) =>
                        setKeyValue({ key: 'ccSearchValue', value: text })
                      }
                      tags={ccList}
                      setTags={(tags) =>
                        setKeyValue({ key: 'ccList', value: tags })
                      }
                      type={'cc'}
                    />
                  </View>
                </View>
                <View style={styles.bcFieldContainer}>
                  <View style={styles.fieldtitle}>
                    <Typography color='primary' type='largeRegularBody'>
                      bcc:{' '}
                    </Typography>
                  </View>
                  <View style={styles.input}>
                    <ComposeAutoComplete
                      searchValue={bccSearchValue}
                      setSearchValue={(text) =>
                        setKeyValue({ key: 'bccSearchValue', value: text })
                      }
                      tags={bccList}
                      setTags={(tags) =>
                        setKeyValue({ key: 'bccList', value: tags })
                      }
                      type={'bcc'}
                    />
                  </View>
                </View>
              </>
            )}

            <Divider />

            <View style={styles.subjectFieldContainer}>
              <View style={{ paddingVertical: 8 }}>
                <Typography color='primary' type='largeRegularBody'>
                  subject:{' '}
                </Typography>
              </View>
              <View style={styles.input}>
                <InputField
                  hideBorder
                  placeholder='add'
                  value={subject}
                  onChangeText={(text) =>
                    setKeyValue({ key: 'subject', value: text })
                  }
                />
              </View>
            </View>
          </View>
        </View>
        {attachmentsLocalURI.length > 0 && (
          <>
            <ScrollView
              horizontal
              style={{ maxHeight: 95, marginBottom: 60 }}
              showsHorizontalScrollIndicator
              scrollIndicatorInsets={{ bottom: 1 }}
            >
              <View style={{ height: 90, flexDirection: 'row' }}>
                {attachmentsLocalURI.map((att, index) => {
                  return (
                    <Pressable
                      key={makeid(index)}
                      onPress={() => {
                        var currentToCompare = attachmentsLocalURI.slice();
                        currentToCompare.splice(index, 1);
                        setAttachmentsLocalURI(currentToCompare);
                        var newAttachments = attachments.slice();
                        newAttachments.splice(index, 1);
                        setAttachments(newAttachments);
                      }}
                    >
                      <Image
                        key={makeid(index)}
                        source={{ uri: att }}
                        style={{
                          width: 80,
                          height: 80,
                          margin: 5,
                          borderRadius: 5,
                        }}
                      />
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          </>
        )}
        <MailSender
          onPressAttachments={onPressAttachments}
          onPressCompose={onPressCompose}
          onChangeMailContent={onChangeMailContent}
          text={text}
          isLoading={isSentMessageLoading}
          isUploading={isUploadingAttachment}
          tempAttachments={[]}
        />
      </Pressable>
    </KeyboardAvoidingView>
  );
};
export default Compose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7,
    justifyContent: 'space-between',
    position: 'relative',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fieldsContainer: {},
  input: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
  },
  ccFieldContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 9,
    marginBottom: 2,
  },
  bcFieldContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 8,
  },
  subjectFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toFieldContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 10,
    marginBottom: 2,
  },
  fieldtitle: {
    paddingTop: 4,
  },
  subject: {
    marginRight: 16,
  },
  ccBcButtonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});
