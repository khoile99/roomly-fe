import { Favorite } from "./Favorite";
import React, { useEffect, useState } from "react";
import { useGetPlacesMutation } from "@/Services";
import SecureStore from "@/Store/SecureStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileScreens } from "..";
import { ProfileStackParamList } from "@/Navigation/Main";
import { useFocusEffect } from "@react-navigation/native";


export const FavoriteContainer = ({ navigation,
}: NativeStackScreenProps<ProfileStackParamList>) => {
  const [accessToken, setAccessToken] = useState<string>("");

  const onNavigate = (screen: ProfileScreens, props: any) => {
    navigation.navigate(screen, props);
  };
  const [fetchPlaces, { data, isSuccess, isLoading, error }] =
    useGetPlacesMutation();

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
      fetchPlaces({ accessToken });
    };

    fetchData();
  }, [fetchPlaces]);

  return <Favorite data={data?.posts} isLoading={isLoading} onNavigate={onNavigate} />;
};
