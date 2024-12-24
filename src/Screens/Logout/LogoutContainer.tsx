import { Logout } from "./Logout";
import React from "react";
import { ProfileStackParamList } from "@/Navigation/Main";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileScreens } from "..";

export const LogoutContainer = ({
  navigation,
}: NativeStackScreenProps<ProfileStackParamList>) => {
  const onNavigate = (screen: ProfileScreens) => {
    navigation.navigate(screen);
  };
  return <Logout onNavigate={onNavigate} />;
};
