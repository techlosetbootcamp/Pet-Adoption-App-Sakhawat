import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import petDonationReducer from '../redux/slices/petDonationSlice';  // Import pet donation slice
import petDetailsReducer from '../redux/slices/petDetailsSlice';  // Import pet details slice
import userReducer from '../redux/slices/authSlice';  // Import pet details slice
import filterReducer from './slices/filterSlice';  // Import pet details slice
import adoptedPetsReducer from './slices/adoptedPetsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    petDonation: petDonationReducer,  // Add pet donation reducer here
    petDetails: petDetailsReducer,
    user: userReducer, // Add it here
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