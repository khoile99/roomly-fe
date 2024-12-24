import { PostDetail } from "./PostDetail";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { useRoute } from "@react-navigation/native";

export const PostDetailContainer = () => {
  const [userId, setUserId] = useState("9");

  //id bài post
  const route = useRoute();
  const { id } = route.params;

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <PostDetail data={data} isLoading={isLoading} />;
};
