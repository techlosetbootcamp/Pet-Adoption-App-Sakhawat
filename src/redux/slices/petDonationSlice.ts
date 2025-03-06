import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { Pet } from '../../types/pets';


interface PetDonationState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  pets: Pet[];
  selectedPet?: Pet;
  error: string | null;
}

const initialState: PetDonationState = {
  status: 'idle',
  pets: [],
  error: null,
};

const convertToBase64 = async (uri: string): Promise<string> => {
  try {
    return await RNFS.readFile(uri, 'base64');
  } catch (error) {
    throw new Error('Failed to convert image to Base64');
  }
};

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


export const selectPhoto = createAsyncThunk(
  'petDonation/selectPhoto',
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
      if(error instanceof Error){

      return rejectWithValue(error.message || 'Failed to select image.');

          }
            }
  }
);

export const addPet = createAsyncThunk<
  Pet,
  Omit<Pet, "id">,
  { rejectValue: string }
>(
  "petDonation/addPet",
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

const petDonationSlice = createSlice({
  name: 'petDonation',
  initialState,
  reducers: {
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
        state.error = null;
      })
      .addCase(addPet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(selectPhoto.fulfilled, (state, action) => {
        if (state.selectedPet) {
          state.selectedPet.image = action.payload ?? ""; // Default to empty string
        }
      });
  },
});

export const { setSelectedPet, clearSelectedPet, deletePet } = petDonationSlice.actions;
export default petDonationSlice.reducer;
