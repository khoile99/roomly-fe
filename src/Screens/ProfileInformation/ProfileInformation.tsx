import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading, Button } from "native-base";
import { User } from "@/Services";
import { Image } from "react-native";

export interface IProfileInformationProps {
  data: User | undefined;
  isLoading: boolean;
}

export const ProfileInformation = (props: IProfileInformationProps) => {
  const { data, isLoading } = props;
  const onCancle = () => {
    setUser(newUser())
    setEdit(false);
  }
  const onSave = () => {
    console.log(user);
  }
  const newUser = () => {
    return {
      id: 0,
      lname: "",
      fname: "",
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
          <Image source={require('assets/profile-sample.png')} style={styles.img}></Image>
          <View style={styles.innerContainer}>
            <View>
              <Text style={styles.txtHeader}>{i18n.t(LocalizationKey.LAST_NAME)}</Text>
              <TextInput placeholder={data?.lname} style={styles.input} editable={edit} onChangeText={newText => user.lname = newText}>{edit ? user.lname : data?.lname}</TextInput>
            </View>
            <View>
              <Text style={styles.txtHeader}>{i18n.t(LocalizationKey.FIRST_NAME)}</Text>
              <TextInput placeholder={data?.fname} style={styles.input} editable={edit} onChangeText={newText => user.fname = newText}>{edit ? user.fname : data?.lname}</TextInput>
            </View>
            <View>
              <Text style={styles.txtHeader}>{i18n.t(LocalizationKey.PHONE_NUMBER)}</Text>
              <TextInput placeholder={data?.phone} style={styles.input} editable={edit} onChangeText={newText => user.phone = newText}>{edit ? user.phone : data?.phone}</TextInput>
            </View>
            <View>
              <Text style={styles.txtHeader}>{i18n.t(LocalizationKey.EMAIL)}</Text>
              <TextInput placeholder={data?.email} style={styles.input} editable={edit} onChangeText={newText => user.email = newText}>{edit ? user.email : data?.email}</TextInput>
            </View>
            <View>
              <Text style={styles.txtHeader}>{i18n.t(LocalizationKey.CREATED_DATE)}</Text>
              <TextInput placeholder={data?.createdAt} style={styles.input} editable={edit} onChangeText={newText => user.createdAt = newText}>{edit ? user.createdAt : data?.createdAt}</TextInput>
            </View>
            {edit ?
              (<>
                <View>
                  <Text style={styles.txtHeader}>{i18n.t(LocalizationKey.PASSWORD)}</Text>
                  <TextInput secureTextEntry style={styles.input} onChangeText={newText => user.password = newText}></TextInput>
                </View>
                <Button style={styles.btn} onPress={() => onSave()}>
                  {i18n.t(LocalizationKey.SAVE)}
                </Button>
                <Button style={styles.btn} onPress={() => onCancle()}>
                  {i18n.t(LocalizationKey.CANCLE)}
                </Button>
              </>) : (
                <Button style={styles.btn} onPress={() => setEdit(true)}>
                  {i18n.t(LocalizationKey.EDIT)}
                </Button>
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
