import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { launchImageLibrary } from 'react-native-image-picker';

interface User {
  username: string;
  email: string;
  photoURL: string | null;
  password?: string; // Add the password property
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};
export const selectPhoto = createAsyncThunk(
  'user/selectPhoto',
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


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    // Sets the entire user object (e.g., when logging in)
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

    // Updates specific user fields dynamically
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    updateUserPassword: (state: UserState, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.password = action.payload; // Update password in store (or any other user-related updates)
      }
    },
  },
});

export const { setUser, updateUser,updateUserPassword } = userSlice.actions;
export default userSlice.reducer;
