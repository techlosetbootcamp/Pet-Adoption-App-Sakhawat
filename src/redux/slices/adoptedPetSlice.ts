import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { RootState } from '../store';
import { AdoptionRequest } from '../../types/adoptionRequest';
import { Pet } from '../../types/pets';
import { User } from '../../types/user';


interface AdoptionRequestsState {
  requests: AdoptionRequest[];
  loading: boolean;
  error: string | null;
}


const initialState: AdoptionRequestsState = {
  requests: [],
  loading: false,
  error: null,
};

export const fetchAdoptionRequests = createAsyncThunk(
  'adoptionRequests/fetchAdoptionRequests',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const currentUser = state.auth.user;

      if (!currentUser) {
        return rejectWithValue('User not authenticated.');
      }

      const petsSnapshot = await firestore()
        .collection('pets')
        .where('userId', '==', currentUser.uid)
        .get();

      const requestsData: AdoptionRequest[] = [];

      for (const petDoc of petsSnapshot.docs) {
        const petData = petDoc.data() as Pet;

        if (petData.adoptedBy && petData.adoptedBy.length > 0) {
          for (const adopterId of petData.adoptedBy) {
            const adopterDoc = await firestore().collection('users').doc(adopterId).get();

            if (adopterDoc.exists) {
              const adopterData = adopterDoc.data() as User;
              requestsData.push({
                adopterName: adopterData.username || 'Unknown',
                adopterImage: adopterData.photoURL || '',
                adopterEmail: adopterData.email || 'No Email',
              location: adopterData.location || 'Unknown',
                petName: petData.name,
                petType: petData.type,
                adoptionDate: petData.adoptionDate || 'Unknown',
              });
            }
          }
        }
      }

      return requestsData;
    } catch (error) {
      return rejectWithValue('Failed to load adoption requests.');
    }
  }
);

const adoptedPetSlice = createSlice({
  name: 'adoptedPets',
  initialState,
  reducers: {
    adoptedPet: (state, action: PayloadAction<AdoptionRequest>) => {
      state.requests.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdoptionRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdoptionRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchAdoptionRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { adoptedPet} = adoptedPetSlice.actions;

export default adoptedPetSlice.reducer;
