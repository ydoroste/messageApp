import {useForm, Controller} from "react-hook-form";
import {View, Dimensions} from "react-native";
import InputField from "@followBack/GenericElements/InputField";
import * as React from "react";
import PasswordInput from "@followBack/GenericElements/PasswordInput";
import Button from "@followBack/GenericElements/Button";
import {getTranslatedText} from "@followBack/Localization";
import Typography from "@followBack/GenericElements/Typography";
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {UnauthorizedStackNavigationProps} from "@followBack/Navigation/Unauthorized/types";
import {AuthStackScreensEnum} from "@followBack/Navigation/Unauthorized/constants";
import {useCallback} from "react";
import {ISignUpFormValues} from "@followBack/Elements/SignUpForm/types";
import PhoneNumberInput from "@followBack/GenericElements/PhoneNumberInput";
import useStylesWithTheme from "@followBack/Hooks/useStylesWithTheme";
import {TextInput} from "react-native-paper";
import Dropdown from "@followBack/GenericElements/Dropdown";
import DatePicker from "@followBack/GenericElements/DatePicker";
import moment from "moment";
import {ResetMethod} from "@followBack/Apis/ForgetPassword/types";
import {errorFieldsAsString, IRegisterApiRequest} from "@followBack/Apis/Register/types";
import {useRegister} from "@followBack/Hooks/Apis/Register";
import {isValidPhoneNumber} from "@followBack/Utils/validations";


const gender = [
    {name: "Male", value: "male"},
    {name: "Female", value: "female"},
];

const windowWidth = Dimensions.get('window').width;

const PasswordControl = (props: any) => {
    const {styles} = useStyles();
    const {control, errors} = props;
    return (
        <Controller
                control={control}
                name="password"
                rules={{
                    required: true,
                    minLength: {
                        message: "You need at least 8 characters ",
                        value: 8
                    }
                }}
                render={({field: {onChange, value, ref}}) => (
                    <View style={[styles.textInput, styles.fullWidth]}>
                        <PasswordInput
                            error={!!errors.password}
                            placeholder={getTranslatedText("password")}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.password?.message && (
                            <View style={styles.errorMessage}>
                                <Typography type="smallRegularBody" color="error">
                                    {errors.password.message}
                                </Typography>
                            </View>
                        )}
                    </View>
                )}
            />
    );
}
const SignUpForm: React.FC = () => {
    const nav = useNavigation<UnauthorizedStackNavigationProps['navigation']>();
    const {control, handleSubmit, formState: {errors, isSubmitting, isValid}, setFocus, watch, setError, setValue} = useForm<ISignUpFormValues>({
        defaultValues: {
            first_name: "",
            last_name: "",
            gender: "",
            birth_date: undefined,
            user_name: "",
            password: "",
            passwordConfirmation: "",
            phone_number: "",
            country: "US",
        },
        mode: 'onChange'
    });
    const rules = {
        required: true
    };
    const values = watch();

    // Sending values to BE request
    const request: IRegisterApiRequest = {
        first_name: values.first_name,
        last_name: values.last_name,
        gender: values.gender,
        birth_date: values.birth_date ?? new Date(),
        user_name: values.user_name,
        phone_number: values.formattedPhoneNumber,
        password: values.password,
    };
    const {refetch} = useRegister(request);


    useFocusEffect(
        useCallback(() => {
            setFocus("first_name");
        }, []));

    const onSubmit = async (formData: ISignUpFormValues) => {
        if(!isValidPhoneNumber(formData.formattedPhoneNumber)){
            setError("phone_number", {message: "invalid phone number"});
            return;
        }
        const {data, error, isError} = await refetch();
        if (isError) {
            const errors = error?.response?.data?.errors;
            if (errors == undefined) {
                return;
            }
            const errorKeys = Object.keys(errors) as errorFieldsAsString[];
            errorKeys.forEach(item => {
                setError(item, {message: errors[item]})
            });
            return;
        }
        nav.navigate(AuthStackScreensEnum.singUpVerification,
            {
                phoneNumber: values.formattedPhoneNumber,
                resetMethod: ResetMethod.Phone,
                userName: values.user_name
            });

    };

    const {styles} = useStyles();
    return (
        <>
            <View style={styles.itemsWrapper}>
                <Controller
                    control={control}
                    name="first_name"
                    rules={rules}
                    render={({field: {onChange, value, ref}}) => (
                        <View style={styles.textInput}>
                            <InputField
                                // @ts-ignore
                                ref={ref}
                                error={!!errors.first_name}
                                placeholder={getTranslatedText("firstName")}
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                            {errors.first_name?.message && (
                                <View style={styles.errorMessage}>
                                    <Typography type="smallRegularBody" color="error">
                                        {errors.first_name.message}
                                    </Typography>
                                </View>
                            )}
                        </View>
                    )}
                />
                <Controller
                    control={control}
                    rules={rules}
                    name="last_name"
                    render={({field: {onChange, value, ref}}) => (
                        <View style={styles.textInput}>
                            <InputField
                                // @ts-ignore
                                ref={ref}
                                error={!!errors.last_name}
                                placeholder={getTranslatedText("lastName")}
                                onChangeText={onChange}
                                value={value}
                            />
                            {errors.last_name?.message && (
                                <View style={styles.errorMessage}>
                                    <Typography type="smallRegularBody" color="error">
                                        {errors.last_name.message}
                                    </Typography>
                                </View>
                            )}
                        </View>
                    )}
                />
            </View>
            <Controller
                control={control}
                rules={rules}
                render={({field: {onChange, value}}) => (
                    <View style={styles.phoneNumber}>
                        <PhoneNumberInput
                            error={!!errors.phone_number}
                            country={values.country}
                            value={value}
                            onChangePhoneNumber={(phoneNumber) => {
                                setValue("phone_number", phoneNumber);
                            }}
                            onChangeCountry={(country) => {
                                setValue("country", country);
                            }}
                            onChangeFormattedPhoneNumber={(formattedPhoneNumber) => {
                                setValue("formattedPhoneNumber", formattedPhoneNumber);
                            }}
                        />

                        {errors.phone_number?.message && (
                            <View style={styles.errorMessage}>
                                <Typography type="smallRegularBody" color="error">
                                    {errors.phone_number.message}
                                </Typography>
                            </View>
                        )}
                    </View>
                )}
                name="phone_number"
            />
            <View style={[styles.itemsWrapper, {alignItems: "flex-end"}]}>
                <Controller
                    control={control}
                    rules={rules}
                    render={({field: {onChange, value, ref}}) => (
                        <View style={styles.gender}>
                            <Dropdown
                                defaultText={getTranslatedText("gender")}
                                items={gender}
                                value={value}
                                error={!!errors.gender}
                                onSelect={(selectedItem, index) => {
                                    setValue("gender", selectedItem.value);
                                }}
                            />

                            {errors.gender?.message && (
                                <View style={styles.errorMessage}>
                                    <Typography type="smallRegularBody" color="error">
                                        {errors.gender.message}
                                    </Typography>
                                </View>
                            )}
                        </View>
                    )}
                    name="gender"
                />
                <Controller
                    control={control}
                    name="birth_date"
                    rules={{
                        required: true,
                        validate: (value?: Date) => {
                            if (!value)
                                return false;
                            const years = moment().diff(value, 'years', false);
                            return years >= 13 ? true : "13 years & over only."
                        }
                    }}
                    render={({field: {onChange, value, ref}}) => (
                        <View style={styles.gender}>
                            <DatePicker
                                title="date of birth"
                                format="MMM DD, YYYY"
                                error={!!errors.birth_date}
                                date={value}
                                onSelect={(date) => {
                                    setValue("birth_date", date);
                                }}
                            />
                            {errors.birth_date?.message && (
                                <View style={styles.errorMessage}>
                                    <Typography type="smallRegularBody" color="error">
                                        {errors.birth_date.message}
                                    </Typography>
                                </View>
                            )}
                        </View>
                    )}
                />
            </View>
            <Controller
                control={control}
                name="user_name"
                rules={rules}
                render={({field: {onChange, value, ref}}) => (
                    <View style={[styles.textInput, styles.fullWidth]}>
                        <InputField
                            // @ts-ignore
                            ref={ref}
                            error={!!errors.user_name}
                            placeholder={getTranslatedText("username")}
                            onChangeText={onChange}
                            value={value}
                            right={<TextInput.Affix text="@unsend.app" textStyle={styles.email}/>}
                            autoCapitalize="none"
                        />

                        {errors.user_name?.message && (
                            <View style={styles.errorMessage}>
                                <Typography type="smallRegularBody" color="error">
                                    {errors.user_name.message}
                                </Typography>
                            </View>
                        )}
                    </View>
                )}
            />
            <PasswordControl control={control} errors={errors}/>
            <View style={styles.buttonWrapper}>
                <View style={styles.button}>
                    <Button
                        type="primary"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        onPress={handleSubmit(onSubmit)}
                    >
                        {getTranslatedText("next")}
                    </Button>
                </View>
            </View>

        </>
    );
};

export default SignUpForm;

const useStyles = useStylesWithTheme((theme) => ({

    textInput: {
        width: "47%",
        marginTop: 0,
        marginBottom: 15,
    },
    fullWidth: {
        width: "100%"
    },
    gender: {
        width: "47%",
        marginBottom: 15,
    },

    birthDate: {
        width: "47%",
        marginBottom: 15,
    },
    buttonWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25,
    },
    button: {
        width: "90%",
    },

    errorMessage: {
        marginTop: 5,
    },

    email: {
        color: theme.colors.grey02,
        fontSize: theme.fontSizes.medium,
        fontFamily: theme.fontFamilies.OpenSans_400Regular,
        lineHeight: theme.lineHeights.medium,
        fontWeight: "400"
    },

    phoneNumber: {
        marginBottom: 30,
    },
    itemsWrapper: {
        display: "flex",
        flexDirection: "row",
        gap: (windowWidth - 100) * 0.06
    }
}));
