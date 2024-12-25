import { API } from "../base";


export interface Place {
  id: number,
  namePost: string,
  typeRoom: string,
  price: number,
  deposit: number,
  description: string,
  address: string,
  bedroom: number,
  bathroom: number,
  comfort: string,
  image: string,
  userId: string,
  createdAt: string,
  updatedAt: string,
  userName: string,
  userPhone: string,
}

interface UpdatePlace1 {
  namePost: string,
  typeRoom: string,
  price: number,
  deposit: number,
  description: string,
}

interface UpdatePlace1Response {
  message: string,
  current_post: UpdatePlace1
}

interface UpdatePlace2 {
  address: string,
  bedroom: number,
  bathroom: number,
  comfort: string,
}

interface UpdatePlace1Response {
  message: string,
  current_post: UpdatePlace1
}

interface UpdatePlace2Response {
  message: string,
  current_post: UpdatePlace2
}

interface UpdatePlace3Response {
  message: string,
  post: Place
}

interface Response<T> {
  posts: T
}

const placeAPI = API.injectEndpoints({
  endpoints: (build) => ({
    getPlaces: build.mutation<Response<Place[]>, { accessToken: string }>({
      query: ({ accessToken }) => ({
        url: "user/get-posts",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }),
    }),
    updatePlace1: build.mutation<UpdatePlace1Response, { accessToken: string, id: number, body: UpdatePlace1 }>({
      query: ({ accessToken, body, id }) => ({
        url: `post/update/step1/${id}`,
        method: "POST",
        body: body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }),
    }),
    updatePlace2: build.mutation<UpdatePlace2Response, { accessToken: string, id: number, body: UpdatePlace2 }>({
      query: ({ accessToken, body, id }) => ({
        url: `post/update/step2/${id}`,
        method: "POST",
        body: body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }),
    }),
    updatePlace3: build.mutation<UpdatePlace3Response, { accessToken: string, id: number }>({
      query: ({ accessToken, id }) => ({
        url: `post/update/step3/${id}`,
        method: "POST",
        body: {},
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetPlacesMutation, useUpdatePlace1Mutation, useUpdatePlace2Mutation, useUpdatePlace3Mutation } = placeAPI;