import IconButton from "@followBack/GenericElements/IconButton";
import Typography from "@followBack/GenericElements/Typography";
import * as React from "react";
import {Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View} from "react-native";
import useTheme from "@followBack/Hooks/useTheme";
import Button from "@followBack/GenericElements/Button";
import InputField from "@followBack/GenericElements/InputField";
import Delete from "@followBack/Theme/Icons/Delete";
import {useState} from "react";
import Divider from "@followBack/GenericElements/Divider";

const Compose: React.FC = () => {
    const {colors} = useTheme();
    const [showSubject, setShowSubject] = useState(false);
    const [showCC, setShowCC] = useState(false);
    const [showBcc, setShowBcc] = useState(false);
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={30}
                              style={{flex: 1}}>
            <Pressable onPress={Keyboard.dismiss} style={styles.container}>
                <View style={styles.header}>
                    <Button icon={() => (
                        <View style={{marginLeft: -12}}>
                            <Delete color={colors.grey02} height={16} width={15}/></View>)}
                            type="mediumTernary">delete</Button>

                    <View style={styles.actionButtons}>
                        <View style={{marginHorizontal: 4}}>
                            <Button onPress={()=>setShowSubject(!showSubject)} type="mediumTernary">subject</Button>
                        </View>
                        <View style={{marginHorizontal: 4}}>
                            <Button onPress={()=>setShowCC(!showCC)} type="mediumTernary">cc</Button>
                        </View>
                        <View style={{marginHorizontal: 4}}>
                            <Button onPress={()=>setShowBcc(!showBcc)} type="mediumTernary">bcc</Button>
                        </View>
                    </View>
                </View>
                <View style={styles.fields}>
                    <Typography color="primary" type="largeRegularBody">to: </Typography>
                    <View style={styles.input}>
                        <InputField hideBorder placeholder="add"/>
                    </View>
                </View>
                {showCC && <View style={styles.fields}>
                    <Typography color="primary" type="largeRegularBody">cc: </Typography>
                    <View style={styles.input}>
                        <InputField hideBorder placeholder="add"/>
                    </View>
                </View>}
                {showBcc && <View style={styles.fields}>
                    <Typography color="primary" type="largeRegularBody">bcc: </Typography>
                    <View style={styles.input}>
                        <InputField hideBorder placeholder="add"/>
                    </View>
                </View>}
                <Divider style={{borderBottomWidth:0.5 , borderBottomColor: "#303030"}}/>

                {showSubject && <View style={styles.fields}>
                    <Typography color="primary" type="largeRegularBody">subject: </Typography>
                    <View style={styles.input}>
                        <InputField hideBorder placeholder="add"/>
                    </View>
                </View>}

            </Pressable>
            <View style={styles.sendActions}>
                <IconButton onPress={() => {
                }} name="add" width={17} height={17} color={colors.grey02}/>
                <View style={styles.input}>
                    <InputField multiline placeholder="send a message..."/>
                </View>
                <IconButton onPress={() => {
                }} name="send" width={17} height={17} color={colors.grey02}/>
            </View>
        </KeyboardAvoidingView>
    );
};
export default Compose;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    actionButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    fields: {
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        //margin: 8
    },
    sendActions: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 50
    }
});
