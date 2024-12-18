import { Post } from "./Post";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const PostContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Post data={data} isLoading={isLoading} />;
};
