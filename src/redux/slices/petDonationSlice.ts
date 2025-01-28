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



// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
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
//   userName?: string;
//   date?: string; // Ensure `date` is stored as a string in ISO format
// }

// interface PetData extends Pet {}

// interface PetDonationState {
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   pets: PetData[];
//   selectedPet?: PetData;
//   error: string | null;
// }

// const initialState: PetDonationState = {
//   status: 'idle',
//   pets: [],
//   error: null,
// };

// export const addPetToFirestore = async (petData: any) => {
//   const currentUser = auth().currentUser;

//   if (!currentUser) {
//     console.log('No authenticated user found.');
//     return;
//   }

//   const { uid, displayName } = currentUser;

//   try {
//     await firestore().collection('pets').add({
//       ...petData,
//       userId: uid,
//       userName: displayName || 'Unknown User',
//     });
//     console.log('Pet added successfully');
//   } catch (error) {
//     console.error('Error adding pet: ', error);
//   }
// };

// // Thunk to fetch pets from Firestore
// export const fetchPets = createAsyncThunk<Pet[], void, { rejectValue: string }>(
//   'petDonation/fetchPets',
//   async (_, { rejectWithValue }) => {
//     try {
//       const snapshot = await firestore().collection('pets').get();

//       const pets = await Promise.all(
//         snapshot.docs.map(async (doc) => {
//           const data = doc.data();

//           // Fetch user information based on userId
//           let userName = '';
//           if (data.userId) {
//             const userDoc = await firestore().collection('users').doc(data.userId).get();
//             if (userDoc.exists) {
//               userName = userDoc.data()?.name || 'Unknown';
//             }
//           }

//           return {
//             id: doc.id,
//             name: data.name || '',
//             age: data.age || 0,
//             breed: data.breed || '',
//             amount: data.amount || 0,
//             location: data.location || '',
//             image: data.image || '',
//             type: data.type || '',
//             gender: data.gender || '',
//             description: data.description || '',
//             weight: data.weight || 0,
//             Vaccinated: data.vaccinated || false,
//             userName,
//             date: data.date ? new Date(data.date).toISOString() : undefined, // Serialize the date
//           } as Pet;
//         })
//       );

//       return pets;
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
//       const currentUser = auth().currentUser;

//       if (!currentUser) {
//         return rejectWithValue('No user is logged in.');
//       }

//       const petWithUser = {
//         ...newPet,
//         userId: currentUser.uid,
//         date: new Date().toISOString(), // Add the current date in ISO format
//       };

//       const docRef = await firestore().collection('pets').add(petWithUser);

//       const addedPet = { id: docRef.id, ...petWithUser } as PetData;

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
//       const pet = { ...action.payload, date: action.payload.date ? new Date(action.payload.date).toISOString() : undefined };
//       state.selectedPet = pet; // Ensure the date is serialized
//     },
//     clearSelectedPet: (state) => {
//       state.selectedPet = undefined;
//     },
//   },
//   extraReducers: (builder) => {
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

//     builder
//       .addCase(addPet.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(addPet.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.pets.push(action.payload);
//         state.error = null;
//       })
//       .addCase(addPet.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { setSelectedPet, clearSelectedPet } = petDonationSlice.actions;
// export default petDonationSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
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
  userName?: string; // User who added the pet
  date?: string; // Ensure `date` is stored as a string in ISO format
}

interface PetData extends Pet {}

interface PetDonationState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  pets: PetData[];
  selectedPet?: PetData;
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

      const pets = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          name: data.name || '',
          age: data.age || 0,
          breed: data.breed || '',
          amount: data.amount || 0,
          location: data.location || '',
          image: data.image || '',
          type: data.type || '',
          gender: data.gender || '',
          description: data.description || '',
          weight: data.weight || 0,
          Vaccinated: data.vaccinated || false,
          userName: data.userName,
          date: data.date ? new Date(data.date).toISOString() : undefined,
        } as Pet;
      });

      return pets;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch pets.');
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
  

// Thunk to add a new pet to Firestore
export const addPet = createAsyncThunk<
  PetData,
  Omit<Pet, 'id'>,
  { rejectValue: string }
>(
  'petDonation/addPet',
  async (newPet, { rejectWithValue }) => {
    try {
      const currentUser = auth().currentUser;

      if (!currentUser) {
        return rejectWithValue('No user is logged in.');
      }

      const petWithUser = {
        ...newPet,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Unknown User', // Add userName from the logged-in user
        date: new Date().toISOString(), // Add the current date in ISO format
      };

      const docRef = await firestore().collection('pets').add(petWithUser);

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
      state.selectedPet = action.payload;
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
      });
  },
});

export const { setSelectedPet, clearSelectedPet } = petDonationSlice.actions;
export default petDonationSlice.reducer;
