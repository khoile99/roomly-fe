import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { NotLogin } from "./NotLogin";
import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";

export const ProfileContainer = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  // return <Profile data={data} isLoading={isLoading} />;
  return <NotLogin onNavigate={onNavigate} />;
};
