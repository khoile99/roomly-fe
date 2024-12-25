import { PostDetail } from "./PostDetail";
import React, { useEffect } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import SecureStore from "@/Store/SecureStore";
import { useGetPlacesMutation } from "@/Services";

type RouteParams = {
  PostDetail: {
    id: number;
  };
};

export const PostDetailContainer = () => {
  const route = useRoute<RouteProp<RouteParams, "PostDetail">>();
  const { id } = route.params || 0;

  const [fetchPlaces, { data, isSuccess, isLoading, error }] =
    useGetPlacesMutation();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await SecureStore.getAccessToken();
      fetchPlaces({ accessToken });
    };

    fetchData();
  }, [fetchPlaces]);

  if (data?.posts) {
    for (var place of data?.posts) {
      if (place.id == id) {
        return <PostDetail data={place} isLoading={isLoading} />;
      }
    }
  }

};
