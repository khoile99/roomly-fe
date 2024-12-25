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
}

interface Response<T> {
  data: T
}

const placeAPI = API.injectEndpoints({
  endpoints: (build) => ({
    getPlaces: build.mutation<Response<Place[]>, { accessToken: string }>({
      query: ({ accessToken }) => ({
        url: "post/get-alls",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetPlacesMutation } = placeAPI;