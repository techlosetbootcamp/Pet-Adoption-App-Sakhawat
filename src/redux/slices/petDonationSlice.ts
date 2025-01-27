// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import firestore from '@react-native-firebase/firestore';
// import { launchImageLibrary } from 'react-native-image-picker';

// // Define the type for pet data
// export interface Pet {
//   id: string;
//   name: string;
//   breed: string;
//   age: number;
//   amount: number;
//   location: string;
//   image: string;
//   type: string;
//   gender?: string;
//   description?: string;
//   weight?: number;
//   Vaccinated?: boolean;
// }

// interface PetData extends Pet {} // PetData inherits all properties from Pet

// interface PetDonationState {
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   pets: PetData[];
//   selectedPet?: PetData; // Property to store the selected pet
//   error: string | null;
// }

// const initialState: PetDonationState = {
//   status: 'idle',
//   pets: [],
//   error: null,
// };

// // Thunk to fetch pets from Firestore
// export const fetchPets = createAsyncThunk<Pet[], void, { rejectValue: string }>(
//   'petDonation/fetchPets',
//   async (_, { rejectWithValue }) => {
//     try {
//       const snapshot = await firestore().collection('pets').get();
//       return snapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           name: data.name || '', // Ensure the name is included
//           age: data.age || 0, // Ensure age is included
//           breed: data.breed,
//           amount: data.amount,
//           location: data.location,
//           image: data.image || '',
//           type: data.type,
//           gender: data.gender || '',  // Ensure gender is included
//           description: data.description || '',  // Ensure description is included
//           weight: data.weight || 0,  // Ensure weight is included
//           vaccinated: data.vaccinated || false, 
          
//         } as Pet; // Cast the result to match the `Pet` interface
//       });
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Failed to fetch pets.');
//     }
//   }
// );

// // Thunk to select a photo using the image picker
// export const selectPhoto = createAsyncThunk(
//   'petDonation/selectPhoto',
//   async (_, { rejectWithValue }) => {
//     try {
//       const result = await launchImageLibrary({ mediaType: 'photo' });
//       if (result.assets && result.assets.length > 0) {
//         return result.assets[0].uri; // Return the selected image URI
//       } else {
//         throw new Error('No image selected');
//       }
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Failed to select image.');
//     }
//   }
// );

// // Thunk to add a new pet to Firestore
// export const addPet = createAsyncThunk<

//   PetData,
//   Omit<Pet, 'id'>,
//   { rejectValue: string }
// >(
//   'petDonation/addPet',
//   async (newPet, { rejectWithValue }) => {
//     try {
//       const docRef = await firestore().collection('pets').add(newPet);
//       const addedPet = { id: docRef.id, ...newPet } as PetData;
//       return addedPet;
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Failed to add pet.');
//     }
//   }
// );

// const petDonationSlice = createSlice({
//   name: 'petDonation',
//   initialState,
//   reducers: {
//     setSelectedPet: (state, action: PayloadAction<PetData>) => {
//       state.selectedPet = action.payload; // Set the selected pet
//     },
//     clearSelectedPet: (state) => {
//       state.selectedPet = undefined; // Clear the selected pet
//     },
//   },
//   extraReducers: (builder) => {
//     // Fetch pets
//     builder
//       .addCase(fetchPets.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(fetchPets.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.pets = action.payload;
//       })
//       .addCase(fetchPets.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload as string;
//       });

//     // Select photo
//     builder
//       .addCase(selectPhoto.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(selectPhoto.fulfilled, (state) => {
//         state.status = 'succeeded';
//       })
//       .addCase(selectPhoto.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload as string;
//       });

//     // Add pet
//     builder
//       .addCase(addPet.pending, (state) => {
//         state.status = 'loading';
//         state.error = null; // Clear previous errors
//       })
//       .addCase(addPet.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.pets.push(action.payload); // Add the new pet to the list
//         state.error = null;
//       })
//       .addCase(addPet.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload as string; // Set the error message
//       });
//   },
// });

// export const { setSelectedPet, clearSelectedPet } = petDonationSlice.actions; // Export the actions
// export default petDonationSlice.reducer;



import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; // To access Firebase Authentication
import { launchImageLibrary } from 'react-native-image-picker';

// Define the type for pet data
export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  amount: number;
  location: string;
  image: string;
  type: string;
  gender?: string;
  description?: string;
  weight?: number;
  Vaccinated?: boolean;
  userName?: string;
}

interface PetData extends Pet {} // PetData inherits all properties from Pet

interface PetDonationState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  pets: PetData[];
  selectedPet?: PetData; // Property to store the selected pet
  error: string | null;
}

const initialState: PetDonationState = {
  status: 'idle',
  pets: [],
  error: null,
};

// Thunk to fetch pets from Firestore
export const fetchPets = createAsyncThunk<Pet[], void, { rejectValue: string }>(
  'petDonation/fetchPets',
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await firestore().collection('pets').get();
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '', // Ensure the name is included
          age: data.age || 0, // Ensure age is included
          breed: data.breed,
          amount: data.amount,
          location: data.location,
          image: data.image || '',
          type: data.type,
          gender: data.gender || '',  // Ensure gender is included
          description: data.description || '',  // Ensure description is included
          weight: data.weight || 0,  // Ensure weight is included
          vaccinated: data.vaccinated || false, 
          userName: '',
        } as Pet; // Cast the result to match the `Pet` interface
      });
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch pets.');
    }
  }
);

// Thunk to select a photo using the image picker
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

// Thunk to add a new pet to Firestore with current user's userId
export const addPet = createAsyncThunk<
  PetData,
  Omit<Pet, 'id'>,
  { rejectValue: string }
>(
  'petDonation/addPet',
  async (newPet, { rejectWithValue }) => {
    try {
      // Get the current logged-in user
      const currentUser = auth().currentUser;

      // If no user is logged in, reject the operation
      if (!currentUser) {
        return rejectWithValue('No user is logged in.');
      }

      // Add the current user's userId to the new pet data
      const petWithUser = { ...newPet, userId: currentUser.uid };

      // Add the new pet to Firestore
      const docRef = await firestore().collection('pets').add(petWithUser);

      // Create a pet object with the new ID
      const addedPet = { id: docRef.id, ...petWithUser } as PetData;

      return addedPet;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add pet.');
    }
  }
);

const petDonationSlice = createSlice({
  name: 'petDonation',
  initialState,
  reducers: {
    setSelectedPet: (state, action: PayloadAction<PetData>) => {
      state.selectedPet = action.payload; // Set the selected pet
    },
    clearSelectedPet: (state) => {
      state.selectedPet = undefined; // Clear the selected pet
    },
  },
  extraReducers: (builder) => {
    // Fetch pets
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
      });

    // Select photo
    builder
      .addCase(selectPhoto.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(selectPhoto.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(selectPhoto.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    // Add pet
    builder
      .addCase(addPet.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear previous errors
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pets.push(action.payload); // Add the new pet to the list
        state.error = null;
      })
      .addCase(addPet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Set the error message
      });
  },
});

export const { setSelectedPet, clearSelectedPet } = petDonationSlice.actions; // Export the actions
export default petDonationSlice.reducer;
