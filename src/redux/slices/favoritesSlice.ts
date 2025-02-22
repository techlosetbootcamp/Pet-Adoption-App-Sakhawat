import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

interface FavoritesState {
  favorites: string[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const updateFavoritesInFirebase = async (petId: string) => {
  try {
    const user = getAuth().currentUser;
    if (!user) {
      console.error('User not logged in');
      return;
    }

    const userRef = doc(getFirestore(), `users/${user.uid}`);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const currentFavorites = userDoc.data()?.favorites || [];
      let updatedFavorites;

      if (currentFavorites.includes(petId)) {
        updatedFavorites = currentFavorites.filter((id: string) => id !== petId);
      } else {
        updatedFavorites = [...currentFavorites, petId];
      }

      await updateDoc(userRef, { favorites: updatedFavorites });
    } else {
    }
  } catch (error) {
  }
};

export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async (petId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { favorites: FavoritesState };
      const favorites = state.favorites.favorites;

      const isFavorite = favorites.includes(petId);

      const updatedFavorites = isFavorite
        ? favorites.filter((id) => id !== petId)
        : [...favorites, petId];

      await updateFavoritesInFirebase(petId);

      return updatedFavorites;
    } catch (error) {
      if(error instanceof Error){

      return rejectWithValue(error.message || 'Failed to toggle favorite');
      }
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleFavorite.fulfilled, (state, action: PayloadAction<string[] | undefined>) => {
      if (action.payload) {
        state.favorites = action.payload;
      }
    });
  },
});

export default favoritesSlice.reducer;
