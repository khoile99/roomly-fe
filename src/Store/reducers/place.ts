import { Place } from "@/Services";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "places",
  initialState: {
    places: [] as Array<Place>,
  },
  reducers: {
    changePlaces: (state, action) => {
      state.places = action.payload;
    },
    setDefaultPlaces: (state, { payload: { places } }) => {
      state.places = places;
    },
    addPlace: (state, { payload }) => {
      state.places.push(payload);
    },
    changePlace: (state, { payload }) => {
      for (let i in state.places) {
        if (state.places[i].id == payload.id) {
          state.places[i] = payload
        }
      }
    },
    removePlace: (state, { payload: id }) => {
      for (let i in state.places) {
        if (state.places[i].id == id) {
          state.places.splice(Number(i), 1);
        }
      }
    },
  },
});

export const { changePlaces, setDefaultPlaces, addPlace, changePlace, removePlace } = slice.actions;
export const placeReducers = slice.reducer;