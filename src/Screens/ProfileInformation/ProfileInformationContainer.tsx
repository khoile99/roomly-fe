import { ProfileInformation } from "./ProfileInformation";
import React from "react";
import { store } from "@/Store";

export const ProfileInformationContainer = () => {
  const data = store.getState().user

  return <ProfileInformation data={data.user} isLoading={data.isLoading} />;
};
