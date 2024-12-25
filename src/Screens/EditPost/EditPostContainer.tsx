import { EditPost } from "./EditPost";
import React, { useEffect } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import SecureStore from "@/Store/SecureStore";
import { useGetPlacesMutation } from "@/Services";

type RouteParams = {
  EditPost: {
    id: number;
  };
};

export const EditPostContainer = () => {
  const route = useRoute<RouteProp<RouteParams, "EditPost">>();
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

  if (data?.data) {
    for (var place of data?.data) {
      if (place.id == id) {
        return <EditPost data={place} isLoading={isLoading} />;
      }
    }
  }
};
