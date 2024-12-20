import { Login } from "./Login";
import React, { useState, useEffect } from "react";
import { RootScreens } from "..";
import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const LoginContainer = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  return <Login onNavigate={onNavigate} />;
};
