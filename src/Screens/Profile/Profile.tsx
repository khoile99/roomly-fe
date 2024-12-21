import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading, Button } from "native-base";
import { User } from "@/Services";
import RounderProfileIcon from "assets/rounded-profile-icon";
import FeatherIcon from "assets/feather-icon";
import LockIcon from "assets/lock-icon";
import LogoutIcon from "assets/logout-icon";
import { ProfileNavigator } from "@/Components/ProfileNavigator";

export interface IProfileProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Profile = (props: IProfileProps) => {
  const { data, isLoading } = props;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <>
          <Image source={require('assets/profile-sample.png')} style={styles.img}></Image>
          <Heading fontSize="md" style={styles.usernameTxt}>
            {data?.username}
          </Heading>
          <View style={styles.navigatorList}>
            <ProfileNavigator onPress={() => { console.log("hello") }} title={i18n.t(LocalizationKey.PERSONAL_INFORMATION)} icon={RounderProfileIcon}></ProfileNavigator>
            <ProfileNavigator onPress={() => { console.log("hello") }} title={i18n.t(LocalizationKey.POST_MANAGE)} icon={FeatherIcon}></ProfileNavigator>
            <ProfileNavigator onPress={() => { console.log("hello") }} title={i18n.t(LocalizationKey.CHANGE_PASSWORD)} icon={LockIcon}></ProfileNavigator>
            <ProfileNavigator onPress={() => { console.log("hello") }} title={i18n.t(LocalizationKey.LOGOUT)} icon={LogoutIcon}></ProfileNavigator>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 40,
    paddingHorizontal: 50,
    alignItems: "center",
  },
  img: {
    width: 120,
    height: 120,
    objectFit: "cover",
    borderRadius: "50%",
  },
  usernameTxt: {
    marginTop: 20,
  },
  navigatorList: {
    marginTop: 50,
  }
});
