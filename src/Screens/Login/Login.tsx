import { RegisterNow } from "@/Components/RegisterNow";
import { i18n, LocalizationKey } from "@/Localization";
import { Button } from "native-base";
import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { RootScreens } from "..";



export const Login = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.txtHeader}>
            {i18n.t(LocalizationKey.WELCOME_BACK)},
          </Text>
          <Text>
            {i18n.t(LocalizationKey.ENTER_LOGIN)}
          </Text>
        </View>
        <TextInput placeholder={i18n.t(LocalizationKey.EMAIL)}></TextInput>
        <TextInput placeholder={i18n.t(LocalizationKey.PASSWORD)}></TextInput>
        <View style={styles.btnContainer}>
          <Button style={{ width: "100%" }}>{i18n.t(LocalizationKey.LOGIN)}</Button>
          <Text>{i18n.t(LocalizationKey.FORGOT_PASSWORD)}?</Text>
          <RegisterNow onNavigate={props.onNavigate}></RegisterNow>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 100,
    paddingHorizontal: 50,
  },
  innerContainer: {
    gap: 50,
  },
  txtHeader: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 5,
  },
  btnContainer: {
    gap: 20,
    alignItems: "center",
  }
});
