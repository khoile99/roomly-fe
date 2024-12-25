import { Home } from "./Home";
import React, { useEffect } from "react";
import { useLazyGetAllPlacesQuery } from "@/Services";
import { ProfileStackParamList } from "@/Navigation/Main";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileScreens } from "..";


export const HomeContainer = ({
  navigation,
}: NativeStackScreenProps<ProfileStackParamList>) => {
  const onNavigate = (screen: ProfileScreens, props: any) => {
    navigation.navigate(screen, props);
  };
  const [fetchAll, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetAllPlacesQuery();

  useEffect(() => {
    fetchAll("");
  }, [fetchAll]);


  return <Home data={data?.data} isLoading={isLoading} onNavigate={onNavigate} />;

};
