import { Favorite } from "./Favorite";
import React, { useState, useEffect } from "react";
import { useGetUserMutation } from "@/Services";
import SecureStore from "@/Store/SecureStore";

export const FavoriteContainer = () => {
  const [fetchUser, { data, isSuccess, isLoading, error }] =
    useGetUserMutation();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await SecureStore.getAccessToken();
      fetchUser({ accessToken });
    };

    fetchData();
  }, [fetchUser]);

  return <Favorite data={data?.user} isLoading={isLoading} />;
};
