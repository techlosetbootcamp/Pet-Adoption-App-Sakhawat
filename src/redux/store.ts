import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import petDonationReducer from '../redux/slices/petDonationSlice';
import petDetailsReducer from '../redux/slices/petDetailsSlice';
import userReducer from '../redux/slices/authSlice';
import filterReducer from './slices/filterSlice';
import adoptedPetsReducer from './slices/adoptedPetsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    petDonation: petDonationReducer,
    petDetails: petDetailsReducer,
    user: userReducer,
    Filter: filterReducer,
    adoptedPets: adoptedPetsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
