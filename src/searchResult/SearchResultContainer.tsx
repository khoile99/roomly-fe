import { SearchResult } from "./SearchResult";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const PostDetailContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <SearchResult data={data} isLoading={isLoading} />;
};
