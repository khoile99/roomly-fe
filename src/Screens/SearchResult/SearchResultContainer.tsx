import { RouteProp, useRoute } from "@react-navigation/native";
import { SearchResult } from "./SearchResult";
import React from "react";

type RouteParams = {
  SearchResult: {
    search: string;
    isType: Boolean;
  };
};

export const SearchResultContainer = () => {
  const route = useRoute<RouteProp<RouteParams, "SearchResult">>();
  const search = route.params.search || "";
  const isType = route.params.isType || false;

  return <SearchResult search={search} isType={isType} />;
};
