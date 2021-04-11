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
  initialState: eventAdapter.getInitialState({
    isLoaded: false,
    selected: null,
  }),
  reducers: {
    addEvent: eventAdapter.addOne,
    addEvents: eventAdapter.addMany,
    selectEvent: (state, action) => {
      if (
        typeof action.payload === 'number' &&
        state.ids.indexOf(action.payload) >= 0
      ) {
        state.selected = action.payload;
      } else {
        console.warn('select events by providing an event ID from the store!');
      }
    },
    deselectEvent: (state) => {
      state.selected = null;
    },
  },

  extraReducers: {
    [fetchEvents.pending]: (state) => {
      console.log('Fetching of Events in Progress!');
      state.isLoaded = false;
    },
    [fetchEvents.fulfilled]: (state, action) => {
      console.log('events have been fetched!');
      eventAdapter.addMany(state, action.payload);
      state.isLoaded = true;
    },
  },
});

export const {
  addEvent,
  addEvents,
  selectEvent,
  deselectEvent,
} = eventSlice.actions;
export default eventSlice.reducer;

// selectors for export

export const {
  selectTotal: selectNumberOfEvents,
  selectIds: selectEventIds,
  selectById: selectEventById,
  selectAll,
} = eventAdapter.getSelectors((state) => state.events);
