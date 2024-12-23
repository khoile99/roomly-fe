import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { NotLogin } from "./NotLogin";
import { Profile } from "./Profile";
import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileScreens } from "..";
import { ProfileStackParamList } from "@/Navigation/Main";

export const ProfileContainer = ({
  navigation,
}: NativeStackScreenProps<ProfileStackParamList>) => {
  const onNavigate = (screen: ProfileScreens) => {
    navigation.navigate(screen);
  };
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Profile data={data} isLoading={isLoading} onNavigate={onNavigate}/>;
  // return <NotLogin onNavigate={onNavigate} />;
};
