import { API } from "../base";

interface UserResponse {
  success: Boolean;
  user: User;
}

export interface User {
  id: number;
  lname: string;
  fname: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  info_user: string;
  password: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface ResponseFail {
  data: Message;
}

export interface Message {
  message: string;
  success: Boolean;
}

export interface LoginResponse extends Message {
  access_token: string,
  refresh_token: string,
}

const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.mutation<UserResponse, { accessToken: string }>({
      query: ({ accessToken }) => ({
        url: "user/get-info",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }),
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "user/login",
        method: "POST",
        body: body,
      }),
    }),
    changePassword: build.mutation<Message, { accessToken: string, body: ChangePasswordRequest }>({
      query: ({ accessToken, body: credentials }) => ({
        url: "user/change-pass",
        method: "POST",
        body: credentials,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserMutation, useLoginMutation, useChangePasswordMutation } = userApi;
