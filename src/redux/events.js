import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

// async thunks and adaptors not to be exported
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get('http://127.0.0.1:5000/events');
  if (response.status === 200) {
    return response.data;
  }
});

const eventAdapter = createEntityAdapter();

//slices and reducers for reductions
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
      eventAdapter.upsertMany(state, action.payload);
      state.isLoaded = true;
    },
  },
});

export const { addEvent, addEvents } = eventSlice.actions;
export default eventSlice.reducer;

// selectors for export

export const {
  selectTotal: selectNumberOfEvents,
  selectIds: selectEventIds,
  selectById: selectEventById,
} = eventAdapter.getSelectors((state) => state.events);
