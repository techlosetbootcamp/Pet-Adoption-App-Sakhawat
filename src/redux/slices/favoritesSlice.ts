

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

interface UserState {
  user: {
    favorites: string[];
  } | null;
}

const initialState: UserState = {
  user: {
    favorites: []
  }
};

const updateFavoritesInFirebase = async (petId: string) => {
    try {
      const user = getAuth().currentUser; // Get the current logged-in user from Firebase Authentication
      if (!user) {
        console.error('User not logged in');
        return;
      }
      // Add your logic to update favorites in Firebase here
      const userRef = doc(getFirestore(), `users/${user.uid}`); // Use actual user ID (user.uid)
      const userDoc = await getDoc(userRef);
  
  
      if (userDoc.exists()) {
        const currentFavorites = userDoc.data()?.favorites || [];
        let updatedFavorites;
        if (currentFavorites.includes(petId)) {
          // Remove pet from favorites
          updatedFavorites = currentFavorites.filter((id: string) => id !== petId);
        } else {
          // Add pet to favorites
          updatedFavorites = [...currentFavorites, petId];
        }
        await updateDoc(userRef, { favorites: updatedFavorites });
        console.log('Favorites updated in Firebase');
      } else {
        console.error('User document not found');
      }
    } catch (error) {
      console.error('Error updating favorites in Firebase: ', error);
    }
  };

  
  // Thunk for adding/removing pet to favorites in Firebase
  export const toggleFavorite = createAsyncThunk(
    'user/toggleFavorite',
    async (petId: string, { getState, rejectWithValue }) => {
  
      
      try {
        const state = getState() as { user: UserState };
        const user = state.user.user;
        
        if (!user) {
          throw new Error('User is not logged in');
        }
        
        const isFavorite = user.favorites.includes(petId);
        console.log(`Toggling favorite for pet ID: ${petId}`);
        console.log(`isFavorite: ${isFavorite}`);
  
        // If the pet is already in the favorites list, remove it
        const updatedFavorites = isFavorite
        ? user.favorites.filter((id) => id !== petId)
        : [...user.favorites, petId];
  
  
  
        // Update Firebase here
        await updateFavoritesInFirebase(petId);  // Call the Firebase update function
  
        // Return the updated list to update the Redux store
        return updatedFavorites;
      } catch (error: any) {
        return rejectWithValue(error.message || 'Failed to toggle favorite');
      }

      
      } // Close the async function properly
    
  );
  
  import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
  
  const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
      builder.addCase(toggleFavorite.fulfilled, (state, action: { payload: string[] }) => {
    extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
          if (state.user) {
            state.user.favorites = action.payload;
          }
        }
      });
    },
  });
export default favoritesSlice.reducer;
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// interface UserState {
//   user: {
//     favorites: string[];
//   } | null;
// }

// const initialState: UserState = {
//   user: {
//     favorites: []
//   }
// };

// const updateFavoritesInFirebase = async (petId: string) => {
//   try {
//     const user = auth().currentUser;
//     if (!user) {
//       console.error('User not logged in');
//       return;
//     }

//     const userRef = firestore().collection('users').doc(user.uid);
//     const userDoc = await userRef.get();

//     if (userDoc.exists) {
//       const currentFavorites = userDoc.data()?.favorites || [];
//       let updatedFavorites;
//       if (currentFavorites.includes(petId)) {
//         updatedFavorites = currentFavorites.filter((id: string) => id !== petId);
//       } else {
//         updatedFavorites = [...currentFavorites, petId];
//       }
//       await userRef.update({ favorites: updatedFavorites });
//       console.log('Favorites updated in Firebase');
//     } else {
//       console.error('User document not found');
//     }
//   } catch (error) {
//     console.error('Error updating favorites in Firebase: ', error);
//   }
// };

// export const toggleFavorite = createAsyncThunk(
//   'user/toggleFavorite',
//   async (petId: string, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as { user: UserState };
//       const user = state.user.user;
      
//       if (!user) {
//         throw new Error('User is not logged in');
//       }

//       const isFavorite = user.favorites.includes(petId);
//       console.log(`Toggling favorite for pet ID: ${petId}`);

//       const updatedFavorites = isFavorite
//         ? user.favorites.filter((id) => id !== petId)
//         : [...user.favorites, petId];

//       await updateFavoritesInFirebase(petId);

//       return updatedFavorites;
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Failed to toggle favorite');
//     }
//   }
// );

// const favoritesSlice = createSlice({
//   name: 'favorites',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(toggleFavorite.fulfilled, (state, action) => {
//       if (state.user) {
//         state.user.favorites = action.payload;
//       }
//     });
//   },
// });

// export default favoritesSlice.reducer;