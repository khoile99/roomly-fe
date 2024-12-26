import { Home } from "./Home";
import React, { useEffect } from "react";
import { useLazyGetAllPlacesQuery } from "@/Services";
import { HomeStackParamList } from "@/Navigation/Main";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeScreens } from "..";


export const HomeContainer = ({
  navigation,
}: NativeStackScreenProps<HomeStackParamList>) => {
  const onNavigate = (screen: HomeScreens, props: any) => {
    navigation.navigate(screen, props);
  };
  const [fetchAll, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetAllPlacesQuery();

  useEffect(() => {
    fetchAll("");
  }, [fetchAll]);


  return <Home data={data?.data} isLoading={isLoading} onNavigate={onNavigate} />;

};
