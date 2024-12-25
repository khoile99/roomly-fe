import { Home } from "./Home";
import React, { useEffect } from "react";
import { useLazyGetAllPlacesQuery } from "@/Services";

export const HomeContainer = () => {
  const [fetchAll, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetAllPlacesQuery();

  useEffect(() => {
    fetchAll("");
  }, [fetchAll]);


  return <Home data={data?.data} isLoading={isLoading} />;

};
