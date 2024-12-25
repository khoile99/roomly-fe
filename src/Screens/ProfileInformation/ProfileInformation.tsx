import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading, Button } from "native-base";
import { User } from "@/Services";
import { Image } from "react-native";
import { useChangeInfoMutation, ResponseFail } from "@/Services";
import SecureStore from "@/Store/SecureStore";

export interface IProfileInformationProps {
  data: User | undefined;
  isLoading: boolean;
}

export const ProfileInformation = (props: IProfileInformationProps) => {
  const [changeInfo, { isLoading: isChangeLoading, isError, error }] = useChangeInfoMutation();
  const { data, isLoading } = props;
  const onCancle = () => {
    setUser(newUser())
    setEdit(false);
  }
  const onSave = async () => {
    try {
      var changeUser = { fName: user.fName, lName: user.lName, email: user.email }
      console.log(changeUser);
      const accessToken = await SecureStore.getAccessToken();
      const response = await changeInfo({ accessToken: accessToken, body: changeUser }).unwrap();
      alert(response.message);
    } catch (err) {
      console.log(err);
      const error = err as ResponseFail;
      if (error.data.message) {
        alert(error.data.message);
      } else {
        alert(i18n.t(LocalizationKey.CHANGE_PASSWORD_FAIL))
      }
    }
  }
  const newUser = () => {
    return {
      id: 0,
      lName: "",
      fName: "",
      email: "",
      phone: "",
      createdAt: "",
      updatedAt: "",
      password: "",
    }
  }
  let [user, setUser] = React.useState(newUser());
  const [edit, setEdit] = React.useState(false);
  return (
    <ScrollView>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <View style={styles.container}>
          <Image src="https://studiochupanhdep.com/Upload/Images/Album/anh-cv-02.jpg" style={styles.img}></Image>
          <View style={styles.innerContainer}>
            <View>
              <Text style={styles.txtHeader}>{i18n.t(LocalizationKey.LAST_NAME)}</Text>
              <TextInput placeholder={data?.lName} style={styles.input} editable={edit} onChangeText={(newText) => setUser((prev) => ({ ...prev, lName: newText }))}>{edit ? user.lName : data?.lName}</TextInput>
            </View>
            <View>
              <Text style={styles.txtHeader}>{i18n.t(LocalizationKey.FIRST_NAME)}</Text>
              <TextInput placeholder={data?.fName} style={styles.input} editable={edit} onChangeText={(newText) => setUser((prev) => ({ ...prev, fName: newText }))}>{edit ? user.fName : data?.fName}</TextInput>
            </View>
            <View>
              <Text style={styles.txtHeader}>{i18n.t(LocalizationKey.EMAIL)}</Text>
              <TextInput placeholder={data?.email} style={styles.input} editable={edit} onChangeText={(newText) => setUser((prev) => ({ ...prev, email: newText }))}>{edit ? user.email : data?.email}</TextInput>
            </View>
            {edit ?
              (<>
                <Button style={styles.btn} onPress={() => onSave()}>
                  {i18n.t(LocalizationKey.SAVE)}
                </Button>
                {isChangeLoading && (
                  <HStack space={2} justifyContent="center">
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                      {i18n.t(LocalizationKey.LOADING)}
                    </Heading>
                  </HStack>
                )}
                <Button style={styles.btn} onPress={() => onCancle()}>
                  {i18n.t(LocalizationKey.CANCLE)}
                </Button>
              </>) : (<>
                <View>
                  <Text style={styles.txtHeader}>{i18n.t(LocalizationKey.PHONE_NUMBER)}</Text>
                  <TextInput placeholder={data?.phone} style={styles.input} editable={edit} onChangeText={newText => user.phone = newText}>{edit ? user.phone : data?.phone}</TextInput>
                </View>
                <View>
                  <Text style={styles.txtHeader}>{i18n.t(LocalizationKey.CREATED_DATE)}</Text>
                  <TextInput placeholder={data?.createdAt} style={styles.input} editable={edit} onChangeText={newText => user.createdAt = newText}>{edit ? user.createdAt : data?.createdAt}</TextInput>
                </View>
                <Button style={styles.btn} onPress={() => setEdit(true)}>
                  {i18n.t(LocalizationKey.EDIT)}
                </Button>
              </>
              )
            }
          </View>
        </View>
      )
      }
    </ScrollView >
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
