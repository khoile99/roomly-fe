import { Favorite } from "./Favorite";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const FavoriteContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Favorite data={data} isLoading={isLoading} />;
};
