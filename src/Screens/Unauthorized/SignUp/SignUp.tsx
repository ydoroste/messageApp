import {
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    View,
    Dimensions,
    Button,
    SafeAreaView,
    Pressable,
    Platform, Keyboard, TouchableWithoutFeedback, TouchableNativeFeedback
} from "react-native";
import React, {useState, useRef} from "react";

import Wizard from "react-native-wizard"

export default function SignIn() {
    const wizard = useRef()
  const [isFirstStep, setIsFirstStep] = useState(true)
  const [isLastStep, setIsLastStep] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const stepList = [
    {
      content: <View style={{ width: 100, height: 100, backgroundColor: "#000" }} />,
    },
    {
      content: <View style={{ width: 100, height: 100, backgroundColor: "#e04851" }} />,
    },
    {
      content: <View style={{ width: 100, height: 500, backgroundColor: "#9be07d" }} />,
    },
    {
      content: <View style={{ width: 100, height: 100, backgroundColor: "#2634e0" }} />,
    },
  ]
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}  keyboardVerticalOffset={100}
                              style={{flex: 1}}>
            <Pressable  style={styles.container} onPress={Keyboard.dismiss}>
    <View>
      <SafeAreaView style={{ backgroundColor: "#FFF" }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "#FFF",
            borderBottomColor: "#dedede",
            borderBottomWidth: 1,
          }}>
          <Button disabled={isFirstStep} title="Prev" onPress={() => wizard.current.prev()} />
          <Text>{currentStep + 1}. Step</Text>
          <Button disabled={isLastStep} title="Next" onPress={() => wizard.current.next()} />
        </View>
      </SafeAreaView>
      <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Wizard
          ref={wizard}
          steps={stepList}
          isFirstStep={val => setIsFirstStep(val)}
          isLastStep={val => setIsLastStep(val)}
          onNext={() => {
            console.log("Next Step Called")
          }}
          onPrev={() => {
            console.log("Previous Step Called")
          }}
          currentStep={({ currentStep, isLastStep, isFirstStep }) => {
            setCurrentStep(currentStep)
          }}
        />
        <View style={{ flexDirection: "row", margin: 18 }}>
          {stepList.map((val, index) => (
            <View
              key={"step-indicator-" + index}
              style={{
                width: 10,
                marginHorizontal: 6,
                height: 10,
                borderRadius: 5,
                backgroundColor: index === currentStep ? "#fc0" : "#000",
              }}
            />
          ))}
        </View>
      </View>
    </View>
            </Pressable>
        </KeyboardAvoidingView>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 50
    }
});