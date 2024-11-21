import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './serviceSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {
    services: serviceReducer,
    profile: profileReducer,
  },
});
