import { RouteProp, useRoute } from "@react-navigation/native";
import { SearchResult } from "./SearchResult";
import React from "react";
import { SearchScreens } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchStackParamList } from "@/Navigation/Main";

type RouteParams = {
  SearchResult: {
    search: string;
    isType: Boolean;
  };
};

export const SearchResultContainer = ({
  navigation,
}: NativeStackScreenProps<SearchStackParamList>) => {
  const onNavigate = (screen: SearchScreens, props: any) => {
    navigation.navigate(screen, props);
  };
  const route = useRoute<RouteProp<RouteParams, "SearchResult">>();
  const search = route.params.search || "";
  const isType = route.params.isType || false;

  return <SearchResult search={search} isType={isType} onNavigate={onNavigate} />;
};
