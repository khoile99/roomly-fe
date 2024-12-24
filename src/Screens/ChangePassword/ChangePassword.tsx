import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { Button } from "native-base";
import { Image } from "react-native";

export const ChangePassword = () => {
  const [edit, setEdit] = React.useState(false);
  const onChangePassword = () => {
    console.log(data);
  }
  let data = {
    oldPassword: "",
    newPassword: "",
    confirmedPassword: "",
  }
  return (
    <View style={styles.container}>
      <Image source={require('assets/profile-sample.png')} style={styles.img}></Image>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.txtHeader}>{i18n.t(LocalizationKey.OLD_PASSWORD)}</Text>
          <TextInput style={styles.input} onChangeText={newText => data.oldPassword = newText} secureTextEntry></TextInput>
        </View>
        <View>
          <Text style={styles.txtHeader}>{i18n.t(LocalizationKey.NEW_PASSWORD)}</Text>
          <TextInput style={styles.input} onChangeText={newText => data.newPassword = newText} secureTextEntry></TextInput>
        </View>
        <View>
          <Text style={styles.txtHeader}>{i18n.t(LocalizationKey.BIRTH_DATE)}</Text>
          <TextInput style={styles.input} onChangeText={newText => data.confirmedPassword = newText} secureTextEntry></TextInput>
        </View>
        <Button style={styles.btn} onPress={() => onChangePassword()}>
          {i18n.t(LocalizationKey.CHANGE_PASSWORD)}
        </Button>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  img: {
    width: 120,
    height: 120,
    objectFit: "cover",
    borderRadius: "50%",
  },
  innerContainer: {
    marginTop: 30,
    width: "100%",
    gap: 30,
  },
  txtHeader: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  btn: {
    borderRadius: 16,
    height: 56,
  },
});
