import { Search } from "./Search";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchScreens } from "..";
import { SearchStackParamList } from "@/Navigation/Main";

export const SearchContainer = ({
  navigation,
}: NativeStackScreenProps<SearchStackParamList>) => {
  const onNavigate = (screen: SearchScreens, props: any) => {
    navigation.navigate(screen, props);
  };
  return <Search onNavigate={onNavigate} />;
};
