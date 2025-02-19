// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // Define the AdoptionRequest type
// export interface AdoptionRequest {
//   adopterName: string;
//   adopterImage: string;
//   adopterEmail: string;
//   adopterLocation: string;
//   petName: string;
//   petType: string;
//   adoptionDate: string;
// }

// // Define the initial state for adoption requests
// interface AdoptionRequestState {
//   requests: AdoptionRequest[];
//   loading: boolean;
//   error: string | null;
// }

// // Initial state
// const initialState: AdoptionRequestState = {
//   requests: [],
//   loading: false,
//   error: null,
// };

// // Create the slice
// const adoptionRequestsSlice = createSlice({
//   name: 'adoptionRequests',
//   initialState,
//   reducers: {
//     setAdoptionRequests(state, action: PayloadAction<AdoptionRequest[]>) {
//       state.requests = action.payload;
//     },
//     setLoading(state, action: PayloadAction<boolean>) {
//       state.loading = action.payload;
//     },
//     setError(state, action: PayloadAction<string>) {
//       state.error = action.payload;
//     },
//   },
// });

// // Export actions
// export const { setAdoptionRequests, setLoading, setError } = adoptionRequestsSlice.actions;

// // Export the reducer
// export default adoptionRequestsSlice.reducer;
