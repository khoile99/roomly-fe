import { useFocusEffect } from "@react-navigation/native";
import { Post } from "./Post";
import React, { useState } from "react";
import SecureStore from "@/Store/SecureStore";

export const PostContainer = () => {
  const [accessToken, setAccessToken] = useState<string>("");


  useFocusEffect(
    React.useCallback(() => {
      const fetchAccessToken = async () => {
        const token = await SecureStore.getAccessToken();
        setAccessToken(token);
      };
      fetchAccessToken();
    }, [])
  );

  if (accessToken)
    return <Post accessToken={accessToken}/>;
};
