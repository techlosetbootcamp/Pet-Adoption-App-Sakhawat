
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { Pet } from '../../types/pets';
import { userData } from '../../types/user';

interface PetDetailsState {
  selectedPet: Pet | null;
  userData: userData | null;
  loading: boolean;
  error: string | null;
}

const initialState: PetDetailsState = {
  selectedPet: null,
  userData: null,
  loading: false,
  error: null,
};

export const fetchUserDetails = createAsyncThunk<userData, string, { rejectValue: string }>(
  'petDetails/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    if (!userId) return rejectWithValue('Invalid user ID');

    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (!userDoc.exists) {
        return rejectWithValue('User not found');
      }
      return userDoc.data() as userData;
    } catch (error) {
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
      state.userData = null; 
      state.loading = false; 
      state.error = null; 
    },
    clearSelectedPet: (state) => {
      state.selectedPet = null;
      state.userData = null;
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
        state.userData = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'An error occurred';
      });
  },
});

export const { setSelectedPet, clearSelectedPet } = petDetailsSlice.actions;
export default petDetailsSlice.reducer;

