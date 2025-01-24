import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';

// Define the type for pet data
interface PetData {
  type: string;
  breed: string;
  amount: number;
  vaccinated: boolean;
  gender: string;
  weight: number;
  location: string;
  description: string;
  image: string | null;
  date: Date;
}

// Define the initial state type
interface PetDonationState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  pet: PetData | null;
  error: string | null;
}

// Async thunk for adding a pet
export const addPet = createAsyncThunk(
  'petDonation/addPet',
  async (petData: PetData, { rejectWithValue }) => {
    try {
      // Upload the pet data to Firestore
      const response = await firestore().collection('pets').add(petData);
      return { id: response.id, ...petData }; // Return the newly added pet data
    } catch (error: any) {
      // Pass the error message to the rejected case
      return rejectWithValue(error.message || 'Failed to add pet.');
    }
  }
);


export const selectPhoto = createAsyncThunk(
  'petDonation/selectPhoto',
  async (_, { rejectWithValue }) => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets.length > 0) {
        return result.assets[0].uri; // Return the selected image URI
      } else {
        throw new Error('No image selected');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to select image.');
    }
  }
);
// Initial state
const initialState: PetDonationState = {
  status: 'idle',
  pet: null,
  error: null,
};

// Slice definition
const petDonationSlice = createSlice({
  name: 'petDonation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPet.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear previous errors
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pet = action.payload; // Save the added pet data
        state.error = null;
      })
      .addCase(addPet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Set the error message
      });
  },
});

export default petDonationSlice.reducer;
