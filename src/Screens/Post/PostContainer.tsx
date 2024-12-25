import { Post } from "./Post";
import React, { useState, useEffect } from "react";
import { useGetUserMutation } from "@/Services";
import SecureStore from "@/Store/SecureStore";

export const PostContainer = () => {

  return <Post />;
};
