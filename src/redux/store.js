import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './events';
//store config and return
const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
  devTools: true,
});

export default store;
