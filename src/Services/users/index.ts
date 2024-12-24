import { API } from "../base";

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  city: string;
  geo: Geo;
  street: string;
  suite: string;
  zipcode: string;
}

export interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface User {
  address: Address;
  company: Company;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
  birthdate: string,
  password: string,
}

export interface LoginRequest {
  info_user: string;
  password: string;
}

export interface LoginResponse {
  success: Boolean;
  message: string;
  access_token: string,
  refresh_token: string,
}

const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => `users/${id}`,
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetUserQuery, useLoginMutation } = userApi;
