import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { RootState } from '../store';
import { AdoptionRequest } from '../../types/adoptionRequest';
import { Pet } from '../../types/pets';
import { User } from '../../types/user';

interface PetState {
  requests: AdoptionRequest[];
  loading: boolean;
  error: string | null;
  category: string;
  pets: Pet[];
  selectedPet?: Pet;
  userData: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PetState = {
  userData: null,
  requests: [],
  loading: false,
  error: null,
  category: 'Dog',
  pets: [],
  status: 'idle',
};

const convertToBase64 = async (uri: string): Promise<string> => {
  try {
    return await RNFS.readFile(uri, 'base64');
  } catch (error) {
    throw new Error('Failed to convert image to Base64');
  }
};
export const fetchUserDetails = createAsyncThunk<any, { userId: string; someOption: boolean }>(
  'pet/fetchUserDetails',
  async (params) => {
    const { userId, someOption } = params;
    const response = await firestore().collection('users').doc(userId).get();
    if (!response.exists) {
      throw new Error('User not found');
    }
    return response.data();
  }
);
export const fetchAdoptionRequests = createAsyncThunk(
  'pets/fetchAdoptionRequests',
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


export const selectPhoto = createAsyncThunk(
  'pets/selectPhoto',
  async (_, { rejectWithValue }) => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });

      if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;

        if (!uri) {
          throw new Error('Image URI is undefined');
        }

        const base64String = await convertToBase64(uri);

        return `data:image/jpeg;base64,${base64String}`; 
      } else {
        throw new Error('No image selected');
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Failed to select image.');
      }
    }
  }
);
export const fetchPets = createAsyncThunk<
  Pet[],
  void,
  { rejectValue: string }
>(
  "petDonation/fetchPets",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await firestore().collection("pets").get();

      const pets: Pet[] = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          name: (data.name as string) || "",
          age: data.age || 0,
          breed: data.breed || "",
          amount: data.amount || 0,
          location: data.location || "",
          image: data.image || "",
          type: data.type || "",
          gender: data.gender || "",
          description: data.description || "",
          weight: data.weight || 0,
          Vaccinated: data.vaccinated || false,
          userName: data.userName || "Unknown User",
          userId: data.userId || "",
          date: data.date ? new Date(data.date).toISOString() : "",
        };
      });

      return pets;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch pets."
      );
    }
  }
);
export const addPet = createAsyncThunk<Pet, Omit<Pet, "id">, { rejectValue: string }>(
  "pets/addPet",
  async (newPet, { rejectWithValue }) => {
    try {
      const currentUser = auth().currentUser;

      if (!currentUser) {
        return rejectWithValue("No user is logged in.");
      }

      const petWithUser = {
        ...newPet,
        userId: currentUser.uid,
        userName: currentUser.displayName || "Unknown User",
        date: new Date().toISOString(),
      };

      const docRef = await firestore().collection("pets").add(petWithUser);
      return { id: docRef.id, ...petWithUser } as Pet;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to add pet.");
    }
  }
);

const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    adoptedPet: (state, action: PayloadAction<AdoptionRequest>) => {
      state.requests.push(action.payload);
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSelectedPet: (state, action: PayloadAction<Pet>) => {
      state.selectedPet = action.payload;
    },
    deletePet: (state, action: PayloadAction<string>) => {
      state.pets = state.pets.filter(pet => pet.id !== action.payload);
    },
    clearSelectedPet: (state) => {
      state.selectedPet = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addPet.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pets.push(action.payload);
      })
      .addCase(addPet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(selectPhoto.fulfilled, (state, action) => {
        if (state.selectedPet) {
          state.selectedPet.image = action.payload ?? "";
        }
      })
      .addCase(fetchAdoptionRequests.fulfilled, (state, action) => {
        state.requests = action.payload;
      });
  },
});

export const { adoptedPet, setFilter, setSelectedPet, deletePet, clearSelectedPet } = petSlice.actions;
export default petSlice.reducer;
