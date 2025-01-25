// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import firestore from '@react-native-firebase/firestore';
// import { launchImageLibrary } from 'react-native-image-picker';

// // Define the type for pet data
// interface PetData {
//   type: string;
//   breed: string;
//   amount: number;
//   vaccinated: boolean;
//   gender: string;
//   weight: number;
//   location: string;
//   description: string;
//   image: string | null;
//   date: Date;
// }

// // Define the initial state type
// interface PetDonationState {
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   pet: PetData | null;
//   error: string | null;
// }

// // Async thunk for adding a pet
// export const addPet = createAsyncThunk(
//   'petDonation/addPet',
//   async (petData: PetData, { rejectWithValue }) => {
//     try {
//       // Upload the pet data to Firestore
//       const response = await firestore().collection('pets').add(petData);
//       return { id: response.id, ...petData }; // Return the newly added pet data
//     } catch (error: any) {
//       // Pass the error message to the rejected case
//       return rejectWithValue(error.message || 'Failed to add pet.');
//     }
//   }
// );


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
// // Initial state
// const initialState: PetDonationState = {
//   status: 'idle',
//   pet: null,
//   error: null,
// };



// // Slice definition
// const petDonationSlice = createSlice({
//   name: 'petDonation',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(addPet.pending, (state) => {
//         state.status = 'loading';
//         state.error = null; // Clear previous errors
//       })
//       .addCase(addPet.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.pet = action.payload; // Save the added pet data
//         state.error = null;
//       })
//       .addCase(addPet.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload as string; // Set the error message
//       });
//   },
// });

// export default petDonationSlice.reducer;

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

export const selectPhoto = createAsyncThunk(
  'petDonation/selectPhoto',
  async (_, { rejectWithValue }) => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
      } else {
        throw new Error('No image selected');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to select image.');
    }
  }
);

// Define the initial state type
interface PetDonationState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  pets: PetData[]; // Store a list of pets instead of a single pet
  error: string | null;
}

// Async thunk for adding a pet
export const addPet = createAsyncThunk(
  'petDonation/addPet',
  async (petData: PetData, { rejectWithValue }) => {
    try {
      const response = await firestore().collection('pets').add(petData);
      return { id: response.id, ...petData }; 
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add pet.');
    }
  }
);

export const listenToPets = createAsyncThunk<PetData[], void, { rejectValue: string }>(
  'petDonation/listenToPets',
  async (_, { rejectWithValue }) => {
    try {
      const pets: PetData[] = [];

      firestore()
        .collection('pets')
        .onSnapshot(
          (snapshot) => {
            const fetchedPets: PetData[] = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id, // Ensure the id is attached
                type: data.type, // Make sure to map all required fields
                breed: data.breed,
                amount: data.amount,
                vaccinated: data.vaccinated,
                gender: data.gender,
                weight: data.weight,
                location: data.location,
                description: data.description,
                image: data.image || null, // Ensure image is properly handled
                date: data.date.toDate(), // Convert Firestore timestamp to Date object
              };
            });
            pets.push(...fetchedPets); // Push the fetched pets into the array
          },
          (error: any) => {
            rejectWithValue(error.message || 'Failed to fetch pets.');
          }
        );

      return pets; // Return the pets data (this will be used in the Redux store)
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to set up snapshot listener.');
    }
  }
);

// Initial state
const initialState: PetDonationState = {
  status: 'idle',
  pets: [],
  error: null,
};

// Slice definition
const petDonationSlice = createSlice({
  name: 'petDonation',
  initialState,
  reducers: {
    setPets: (state, action) => {
      state.pets = action.payload; // Update the pets list with new data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPet.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pets.push(action.payload); // Add the new pet to the list
        state.error = null;
      })
      .addCase(addPet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(listenToPets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(listenToPets.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(listenToPets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setPets } = petDonationSlice.actions; // Export the setPets action
export default petDonationSlice.reducer;

