import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { Button, Heading, HStack, Spinner } from "native-base";
import { Image } from "react-native";
import { useChangePasswordMutation, Message } from "@/Services";
import SecureStore from "@/Store/SecureStore";

export const ChangePassword = () => {
  const [changePassword, { isLoading, isError, error }] =
    useChangePasswordMutation();
  const [data, setData] = React.useState({
    old_password: "",
    new_password: "",
  });
  const [password, setPassword] = React.useState("");
  const onChangePassword = async () => {
    try {
      const accessToken = await SecureStore.getAccessToken();
      const response = await changePassword({
        accessToken: accessToken,
        body: data,
      }).unwrap();
      alert(response.message);
    } catch (err) {
      const error = err as Message;
      if (error.message) {
        alert(error.message);
      } else {
        alert(i18n.t(LocalizationKey.CHANGE_PASSWORD_FAIL));
      }
    }
  };
  return (
    <View style={styles.container}>
      <Image
        src="https://studiochupanhdep.com/Upload/Images/Album/anh-cv-02.jpg"
        style={styles.img}
      ></Image>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.txtHeader}>
            {i18n.t(LocalizationKey.OLD_PASSWORD)}
          </Text>
          <TextInput
            style={styles.input}
            value={data.old_password}
            onChangeText={(newText) =>
              setData((prev) => ({ ...prev, old_password: newText }))
            }
            secureTextEntry
          ></TextInput>
        </View>
        <View>
          <Text style={styles.txtHeader}>
            {i18n.t(LocalizationKey.NEW_PASSWORD)}
          </Text>
          <TextInput
            style={styles.input}
            value={data.new_password}
            onChangeText={(newText) =>
              setData((prev) => ({ ...prev, new_password: newText }))
            }
            secureTextEntry
          ></TextInput>
        </View>
        <View>
          <Text style={styles.txtHeader}>
            {i18n.t(LocalizationKey.ENTER_NEW_PASSWORD_AGAIN)}
          </Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(newText) => setPassword(newText)}
            secureTextEntry
          ></TextInput>
        </View>
        <Button style={styles.btn} onPress={() => onChangePassword()}>
          {i18n.t(LocalizationKey.CHANGE_PASSWORD)}
        </Button>
        {isLoading && (
          <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              {i18n.t(LocalizationKey.LOADING)}
            </Heading>
          </HStack>
        )}
      </View>
    </View>
  );
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
    borderRadius: 60,
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
    borderRadius: 5,
  },
  btn: {
    borderRadius: 16,
    height: 56,
  },
});
