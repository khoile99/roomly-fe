import { Search } from "./Search";
import React, { useState, useEffect } from "react";
import { useGetUserMutation } from "@/Services";
import SecureStore from "@/Store/SecureStore";

export const SearchContainer = () => {
  const [fetchUser, { data, isSuccess, isLoading, error }] =
    useGetUserMutation();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await SecureStore.getAccessToken();
      fetchUser({ accessToken });
    };

    fetchData();
  }, [fetchUser]);

  return <Search data={data?.user} isLoading={isLoading} />;
};
