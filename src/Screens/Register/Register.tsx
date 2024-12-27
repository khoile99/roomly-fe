import { LoginNow } from "@/Components/LoginNow";
import { i18n, LocalizationKey } from "@/Localization";
import { Button } from "native-base";
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { RootScreens } from "..";
import { ResponseFail, useRegister1Mutation } from "@/Services";

export const Register = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const [register, setRegister] = useState({
    fName: "",
    lName: "",
    phone: "",
    email: "",
    password: "",
  })
  const [register1, { isLoading, isError, error }] = useRegister1Mutation();
  const onRegister = async () => {
    try {
      const response = await register1(register).unwrap();
      alert(response.message);
    } catch (err) {
      const error = err as ResponseFail;
      alert(error.data.message);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.txtHeader}>
            {i18n.t(LocalizationKey.REGISTER)},
          </Text>
          <Text>{i18n.t(LocalizationKey.ENTER_REGISTER)}</Text>
        </View>
        <TextInput
          placeholder={i18n.t(LocalizationKey.LAST_NAME)}
          style={styles.input}
          onChangeText={(newText) => setRegister({ ...register, lName: newText })}
        ></TextInput>
        <TextInput
          placeholder={i18n.t(LocalizationKey.FIRST_NAME)}
          style={styles.input}
          onChangeText={(newText) => setRegister({ ...register, fName: newText })}
        ></TextInput>
        <TextInput
          placeholder={i18n.t(LocalizationKey.EMAIL)}
          style={styles.input}
          onChangeText={(newText) => setRegister({ ...register, email: newText })}
        ></TextInput>
        <TextInput
          placeholder={i18n.t(LocalizationKey.PHONE_NUMBER)}
          style={styles.input}
          onChangeText={(newText) => setRegister({ ...register, phone: newText })}
        ></TextInput>
        <TextInput
          placeholder={i18n.t(LocalizationKey.PASSWORD)}
          style={styles.input}
          onChangeText={(newText) => setRegister({ ...register, password: newText })}
          secureTextEntry
        ></TextInput>
        <View style={styles.btnContainer}>
          <Button style={{ width: "100%" }} onPress={() => onRegister()}>
            {i18n.t(LocalizationKey.REGISTER)}
          </Button>
          <LoginNow onNavigate={props.onNavigate}></LoginNow>
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
    paddingHorizontal: 30,
  },
  innerContainer: {
    gap: 30,
  },
  txtHeader: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 5,
  },
  btnContainer: {
    gap: 20,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
