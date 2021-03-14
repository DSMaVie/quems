import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// createAsyncThunk for async logic
//note: async thunks should always be exported (as they are actions essentially)
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get('http://127.0.0.1:5000/events');
  if (response.status === 200) {
    return response.data;
  }
});

// adapter and slices for store
const eventAdapter = createEntityAdapter();

const eventSlice = createSlice({
  name: 'events',
  initialState: eventAdapter.getInitialState({ isLoaded: false }),
  reducers: {
    addEvent: eventAdapter.addOne,
    addEvents: eventAdapter.addMany,
  },

  extraReducers: {
    [fetchEvents.pending]: (state) => {
      console.log('Fetching of Events in Progress!');
      state.isLoaded = false;
    },
    [fetchEvents.fulfilled]: (state, action) => {
      console.log('action :>> ', action);
      eventAdapter.upsertMany(state, action.payload);
      state.isLoaded = true;
    },
  },
});

export const { addEvent, addEvents } = eventSlice.actions;
export default eventSlice.reducer;
// notes section
// need to document: interface of api -> fetch events wrapped in array
