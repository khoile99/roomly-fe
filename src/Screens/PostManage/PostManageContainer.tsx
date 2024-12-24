import { PostManage } from "./PostManage";
import React from "react";

export const PostManageContainer = () => {

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
    }
  ]
  return <PostManage places={data} isLoading={false} />;
};
