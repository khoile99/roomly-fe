import { Place } from "@/Services";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "places",
  initialState: {
    places: [] as Array<Place>,
  },
  reducers: {
    setDefaultPlace: (state, { payload: { places } }) => {
      state.places = places;
    },
    addPlace: (state, { payload }) => {
      state.places.push(payload);
    },
    changePlace: (state, { payload: { id, place } }) => {
      for (let p of state.places) {
        if (p.id == id) {
          p = place
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

export const { setDefaultPlace, addPlace, changePlace, removePlace } = slice.actions;
export const placeReducers = slice.reducer;