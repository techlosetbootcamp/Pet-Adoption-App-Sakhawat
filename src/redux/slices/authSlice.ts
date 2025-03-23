import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {RootState} from '../store';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_CLIENT_ID} from '@env';
import {User} from '../../types/user';
import {ToastAndroid} from 'react-native';
import {FIREBASE_COLLECTIONS} from '../../constants/firebase';

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID,
});

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  favorites: string[];
}

const initialState: AuthState = {
  isLoading: false,
  error: null,
  user: null,
  favorites: [],
};

export const onGoogleButtonPress = async () => {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    await GoogleSignin.signOut();

    const signInResponse = await GoogleSignin.signIn();
    const {data} = signInResponse;

    if (!data?.idToken) {
      throw new Error('Google Sign-In failed: idToken is null.');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
    const response = await auth().signInWithCredential(googleCredential);
    const {uid, email, displayName, photoURL} = response?.user;

    return {uid, email, displayName, photoURL};
  } catch (err) {
    const error = err as Error;
    ToastAndroid.show(
      'Google login failed. Please try again.',
      ToastAndroid.LONG,
    );
    throw error.message || 'An unknown error occurred';
  }
};

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      const user = auth().currentUser;

      if (user) {
        const userRef = firestore()
          .collection(FIREBASE_COLLECTIONS.users)
          .doc(user.uid);

        const unsubscribe = userRef.onSnapshot(doc => {
          if (doc.exists) {
            const userData = {
              uid: user.uid,
              username: doc.data()?.username || '',
              email: user.email,
              photoURL: doc.data()?.photoURL || null,
              favorites: doc.data()?.favorites || [],
            };

            dispatch(setUser(userData as User));
          }
        });

        return () => unsubscribe();
      }

      return null;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to fetch current user.',
      );
    }
  },
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (
    {username, photoURL}: {username: string; photoURL: string},
    {rejectWithValue},
  ) => {
    const currentUser = auth().currentUser;
    if (!currentUser) return rejectWithValue('No user logged in');
    try {
      await firestore()
        .collection(FIREBASE_COLLECTIONS.users)
        .doc(currentUser.uid)
        .set({username, photoURL}, {merge: true});
      return {username, photoURL};
    } catch (error) {
      return rejectWithValue('Failed to update profile');
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    {
      email,
      password,
      username,
    }: {email: string; password: string; username: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = response?.user;

      if (user) {
        await user.updateProfile({displayName: username});

        await firestore()
          .collection(FIREBASE_COLLECTIONS.users)
          .doc(user.uid)
          .set({
            username: username,
            email: email.toLowerCase(),
            favorites: [],
          });

        return {
          uid: user.uid,
          username,
          email: user.email,
          photoURL: null,
          favorites: [],
        };
      } else {
        throw new Error('User creation failed.');
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Registration failed.',
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const userId = userCredential.user.uid;

      const userDoc = await firestore()
        .collection(FIREBASE_COLLECTIONS.users)
        .doc(userId)
        .get();

      if (!userDoc.exists) {
        throw new Error('User data not found');
      }

      return {
        uid: userId,
        username: userDoc.data()?.username || '',
        email: userCredential.user.email || '',
        photoURL: userCredential.user.photoURL || '',
        favorites: userDoc.data()?.favorites || [],
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Login failed.',
      );
    }
  },
);

export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, {rejectWithValue}) => {
    try {
      await auth().signOut();
      return null;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Sign-out failed.',
      );
    }
  },
);

export const toggleFavorite = createAsyncThunk(
  'auth/toggleFavorite',
  async (petId: string, {rejectWithValue}) => {
    try {
      const user = auth().currentUser;
      if (!user) return rejectWithValue('No user logged in');

      const userRef = firestore()
        .collection(FIREBASE_COLLECTIONS.users)
        .doc(user.uid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        return rejectWithValue('User not found');
      }

      const currentFavorites = userDoc.data()?.favorites || [];
      let updatedFavorites;

      if (currentFavorites.includes(petId)) {
        updatedFavorites = currentFavorites.filter(
          (id: string) => id !== petId,
        );
      } else {
        updatedFavorites = [...currentFavorites, petId];
      }

      await userRef.update({favorites: updatedFavorites});

      return updatedFavorites;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to toggle favorite',
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.favorites = action.payload?.favorites || [];
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {...state.user, ...action.payload};
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload;
          state.favorites = action.payload.favorites;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload;
          state.favorites = action.payload.favorites;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signOutUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.favorites = [];
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleFavorite.pending, state => {
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        if (action.payload) {
          state.favorites = action.payload;
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchUserData.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user) {
          state.user.username = action.payload.username;
          state.user.photoURL = action.payload.photoURL;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setUser, updateUser} = authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;
