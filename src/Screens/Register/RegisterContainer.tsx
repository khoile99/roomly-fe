import { Register } from "./Register";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const RegisterContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Register data={data} isLoading={isLoading} />;
};
