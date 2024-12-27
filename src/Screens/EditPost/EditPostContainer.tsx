import { EditPost } from "./EditPost";
import React, { useEffect } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { store } from "@/Store";

type RouteParams = {
  EditPost: {
    id: number;
  };
};

export const EditPostContainer = () => {
  const route = useRoute<RouteProp<RouteParams, "EditPost">>();
  const { id } = route.params || 0;
  const places = store.getState().place.places

  for (let place of places) {
    if (place.id == id) {
      return <EditPost data={place} />;
    }
  }
};
