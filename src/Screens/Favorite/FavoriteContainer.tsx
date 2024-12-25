import { Favorite } from "./Favorite";
import React, { useState, useEffect } from "react";
import { useGetPlacesMutation } from "@/Services";
import SecureStore from "@/Store/SecureStore";

export const FavoriteContainer = () => {
  const [fetchPlaces, { data, isSuccess, isLoading, error }] =
    useGetPlacesMutation();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await SecureStore.getAccessToken();
      fetchPlaces({ accessToken });
    };

    fetchData();
  }, [fetchPlaces]);

  return <Favorite data={data?.data} isLoading={isLoading} />;
};
