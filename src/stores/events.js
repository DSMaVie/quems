import { createSlice, configureStore } from '@reduxjs/toolkit';

const eventSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
    add: (state, action) => {
      if (action.payload instanceof Array) {
        return [...state, ...action.payload];
      } else {
        return [...state, action.payload];
      }
    },
  },
});

const store = configureStore({
  reducer: {
    events: eventSlice.actions,
  },
});

export default store;

// TODO: next async logic is needed -> creaseAsyncThunk
