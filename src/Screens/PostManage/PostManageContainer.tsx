import { PostManage } from "./PostManage";
import React, { useEffect } from "react";
import { useGetPlacesMutation } from "@/Services";
import SecureStore from "@/Store/SecureStore";

export const PostManageContainer = () => {
  const [fetchPlaces, { data, isSuccess, isLoading, error }] =
    useGetPlacesMutation();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await SecureStore.getAccessToken();
      fetchPlaces({ accessToken });
    };

    fetchData();
  }, [fetchPlaces]);

  return <PostManage places={data?.data} isLoading={false} />;
};
