import { ProfileInformation } from "./ProfileInformation";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const ProfileInformationContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <ProfileInformation data={data} isLoading={isLoading} />;
};
