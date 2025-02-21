
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { Pet } from '../../types/pets';


interface UserDetails {
  username: string;
  photoURL: string;
}

interface PetDetailsState {
  selectedPet: Pet | null;
  userDetails: UserDetails | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: PetDetailsState = {
  selectedPet: null,
  userDetails: null,
  loading: false,
  error: null,
};

// Async thunk to fetch user details
export const fetchUserDetails = createAsyncThunk<UserDetails, string, { rejectValue: string }>(
  'petDetails/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    if (!userId) return rejectWithValue('Invalid user ID');

    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (!userDoc.exists) {
        return rejectWithValue('User not found');
      }
      return userDoc.data() as UserDetails;
    } catch (error) {
      console.error('Firestore Error:', error);
      return rejectWithValue('Failed to fetch user details');
    }
  }
);

const petDetailsSlice = createSlice({
  name: 'petDetails',
  initialState,
  reducers: {
    setSelectedPet: (state, action: PayloadAction<Pet>) => {
      state.selectedPet = action.payload;
      state.userDetails = null; // Reset user details when a new pet is selected
      state.loading = false; // Reset loading state
      state.error = null; // Reset error state
    },
    clearSelectedPet: (state) => {
      state.selectedPet = null;
      state.userDetails = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'An error occurred';
      });
  },
});

export const { setSelectedPet, clearSelectedPet } = petDetailsSlice.actions;
export default petDetailsSlice.reducer;

