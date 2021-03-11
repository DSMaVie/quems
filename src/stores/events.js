import { createSlice, configureStore, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

//createAsyncThunk for async logic
const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get('localhost:5000/events');
  if (response.status === 200) {
    return response.data;
  }
});

// adapter and slices for store
const eventAdapter = createEntityAdapter();

const eventSlice = createSlice({
  name: 'eventStore',
  initialState: eventAdapter.getInitialState({ isLoading: true }),
  reducers: {
    add: (_, action) => {
      // needs to become async later as well
      if (action.payload instanceof Array) {
        eventAdapter.addMany(action.payload); //might break bc. of array
      } else {
        eventAdapter.addOne(action.payload);
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchEvents.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchEvents.fulfilled, (state, action) => {
          eventAdapter.upsertMany(state, action.payload);
          state.loading = false;
        });
    },
  },
});

//store config and return
const store = configureStore({
  reducer: {
    eventStore: eventSlice.actions,
  },
});

export default store;

// notes section
// need to document: interface of api -> fetch events wrapped in array
