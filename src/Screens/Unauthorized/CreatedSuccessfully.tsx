import { ImageBackground, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  UnauthorizedStackNavigationProps,
  ICreatedSuccessfullyState,
} from "@followBack/Navigation/Unauthorized/types";
import * as React from "react";
import Typography from "@followBack/GenericElements/Typography";
import Button from "@followBack/GenericElements/Button";
import { getTranslatedText } from "@followBack/Localization";
import { UnauthorizedScreensEnum } from "@followBack/Navigation/constants";
import { useRoute } from "@react-navigation/native";

const CreatedSuccessfully: React.FC = () => {
  const nav = useNavigation<UnauthorizedStackNavigationProps["navigation"]>();
  const route = useRoute<UnauthorizedStackNavigationProps["route"]>();
  const { userName } = route.params as ICreatedSuccessfullyState;

  const onSignInPress = () => {
    nav.navigate(UnauthorizedScreensEnum.signIn);
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Typography
          type="mediumRegularTitle"
          textAlign="center"
          color="primary"
        >
          {userName}
        </Typography>

        <View style={styles.createdTextContainer}>
            <Typography
              type="mediumRegularTitle"
              textAlign="center"
              color="primary"
            >
              {getTranslatedText("hasBeen")}
            </Typography>

          <Typography
            type="mediumRegularTitle"
            textAlign="center"
            color="verified"
          >
            {getTranslatedText("created")}
          </Typography>
        </View>
      </View>

      <View style={styles.signIn}>
        <Button onPress={onSignInPress} type="primary">
          {getTranslatedText("signIn")}
        </Button>
      </View>
    </View>
  );
};
export default CreatedSuccessfully;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  textContainer: {
    marginBottom: 82,
  },
  createdTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  hasBeenTextContainer: {
    marginRight: 4,
  },
  signIn: {
    marginTop: 50,
    width: "100%",
  },
});
