import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import petDonationReducer from '../redux/slices/petDonationSlice';
import petDetailsReducer from '../redux/slices/petDetailsSlice';
import filterReducer from './slices/filterSlice';
import adoptedPetReducer from './slices/adoptedPetSlice';
import favoritesReducer from "./slices/favoritesSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    petDonation: petDonationReducer,
    petDetails: petDetailsReducer,
    Filter: filterReducer,
    adoptedPet: adoptedPetReducer,
    favorites: favoritesReducer, 

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
