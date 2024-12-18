import { Search } from "./Search";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const SearchContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Search data={data} isLoading={isLoading} />;
};
