import { PostDetail } from "./PostDetail";
import React, { useEffect } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useLazyGetPlaceQuery } from "@/Services";

type RouteParams = {
  PostDetail: {
    id: number;
  };
};

export const PostDetailContainer = () => {
  const route = useRoute<RouteProp<RouteParams, "PostDetail">>();
  const { id } = route.params || 0;

  const [fetchPlace, { data, isSuccess, isLoading, error }] =
    useLazyGetPlaceQuery();

  useEffect(() => {
    const fetchData = async () => {
      fetchPlace(id.toString());
    };

    fetchData();
  }, [id, fetchPlace]);

  if (data?.data)
    return <PostDetail data={data?.data} isLoading={isLoading} />;
};
