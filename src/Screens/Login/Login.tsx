import { RegisterNow } from "@/Components/RegisterNow";
import { i18n, LocalizationKey } from "@/Localization";
import { Button } from "native-base";
import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { RootScreens } from "..";
import { useLoginMutation } from "@/Services";



export const Login = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const [user, setUser] = React.useState({ info_user: "", password: "" });
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const onLogin = async () => {
    try {
      console.log(user);
      const response = await login(user).unwrap();
      console.log("Login successful:", response);


      // props.onNavigate("Home"); // Replace "Home" with your target screen
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

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
        <TextInput placeholder={i18n.t(LocalizationKey.EMAIL)} style={styles.input} value={user.info_user} onChangeText={(newText) => setUser((prev) => ({ ...prev, info_user: newText }))}></TextInput>
        <TextInput placeholder={i18n.t(LocalizationKey.PASSWORD)} style={styles.input} value={user.password} onChangeText={(newText) => setUser((prev) => ({ ...prev, password: newText }))} secureTextEntry></TextInput>
        <View style={styles.btnContainer}>
          <Button style={{ width: "100%" }} onPress={()=>onLogin()}>{i18n.t(LocalizationKey.LOGIN)}</Button>
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
    borderRadius: 5
  },
});
