import { Favorite } from "./Favorite";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const FavoriteContainer = () => {
  const [userId, setUserId] = useState("9");

  const data = [
    {
      id: "1",
      name: "Nhà trọ Bình Tân",
      address: "Long Thạnh Mỹ, quận 9",
      price: "2.500.000",
      url: "https://khoi-public.s3.ap-northeast-1.amazonaws.com/8bc7add356f6f20160387c15cae5e71a.png",
    },
    {
      id: "2",
      name: "Sunshine",
      address: "Tô Hiến Thành, quận 10",
      price: "4.500.000",
      url: "https://khoi-public.s3.ap-northeast-1.amazonaws.com/8bc7add356f6f20160387c15cae5e71a.png",
    },
    {
      id: "3",
      name: "Galaxy",
      address: "Lý Thường Kiệt, quận 10",
      price: "3.500.000",
      url: "https://khoi-public.s3.ap-northeast-1.amazonaws.com/8bc7add356f6f20160387c15cae5e71a.png",
    },
  ];

  const [fetchOne, { isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Favorite data={data} isLoading={isLoading} />;
};
