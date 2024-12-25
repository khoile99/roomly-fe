import { API } from "../base";

interface UserResponse {
  success: Boolean;
  user: User;
}

interface ChangeInfoRequest {
  lName: string;
  fName: string;
  email: string;
}

export interface User {
  id: number;
  lName: string;
  fName: string;
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

interface UpdateUserResponse extends Message {
  data: User;
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
    changeInfo: build.mutation<UpdateUserResponse, { accessToken: string, body: ChangeInfoRequest }>({
      query: ({ accessToken, body: credentials }) => ({
        url: "user/update",
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

export const { useGetUserMutation, useLoginMutation, useChangePasswordMutation, useChangeInfoMutation } = userApi;
