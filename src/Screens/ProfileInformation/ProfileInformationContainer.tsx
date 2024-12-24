import { ProfileInformation } from "./ProfileInformation";
import React, { useState, useEffect } from "react";
import { useGetUserMutation } from "@/Services";
import SecureStore from "@/Store/SecureStore";

export const ProfileInformationContainer = () => {
  const [fetchUser, { data, isSuccess, isLoading, error }] =
  useGetUserMutation();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await SecureStore.getAccessToken();
      fetchUser({ accessToken });
    };

    fetchData();
  }, [fetchUser]);

  return <ProfileInformation data={data?.user} isLoading={isLoading} />;
};
