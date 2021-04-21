import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/users/userSlice';
import organizationReducer from '../features/organizations/organizationSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userState: userReducer,
    organizationState: organizationReducer
  },
});
