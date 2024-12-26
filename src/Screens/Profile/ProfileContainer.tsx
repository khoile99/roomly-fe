import React, { useState, useEffect } from "react";
import { useGetUserMutation } from "@/Services";
import { NotLogin } from "./NotLogin";
import { Profile } from "./Profile";
import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileScreens, RootScreens } from "..";
import { ProfileStackParamList } from "@/Navigation/Main";
import SecureStore from "@/Store/SecureStore";
import { useFocusEffect } from "@react-navigation/native";
import { store } from "@/Store";
import { changeUser } from "@/Store/reducers";

type TotalScreen = NativeStackScreenProps<RootStackParamList & ProfileStackParamList>;

export const ProfileContainer = ({
  navigation,
}: TotalScreen) => {
  const [accessToken, setAccessToken] = useState<string>("");

  const onNavigateRootScreen = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  const onNavigateProfileScreen = (screen: ProfileScreens) => {
    navigation.navigate(screen);
  };

  const [fetchUser, { data, isSuccess, isLoading, error }] =
    useGetUserMutation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchAccessToken = async () => {
        const token = await SecureStore.getAccessToken();
        setAccessToken(token);
      };
      fetchAccessToken();
    }, [])
  );

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await SecureStore.getAccessToken();
      var data = await fetchUser({ accessToken }).unwrap();
      if (data.success)
        store.dispatch(changeUser(data.user));
    };

    fetchData();
  }, [accessToken]);

  if (!accessToken) {
    return <NotLogin onNavigate={onNavigateRootScreen} />;
  }

  return <Profile isLoading={isLoading} onNavigate={onNavigateProfileScreen} />;
};
