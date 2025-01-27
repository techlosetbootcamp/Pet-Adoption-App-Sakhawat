// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../redux/slices/authSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;  // Create AppDispatch type

// export default store;

// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import petDonationReducer from '../redux/slices/petDonationSlice';  // Import pet donation slice
import petDetailsReducer from '../redux/slices/petDetailsSlice';  // Import pet details slice


export const store = configureStore({
  reducer: {
    auth: authReducer,
    petDonation: petDonationReducer,  // Add pet donation reducer here
    petDetails: petDetailsReducer, // Add it here

  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;