import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import adoptedPetReducer from './slices/petSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adoptedPet: adoptedPetReducer,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
