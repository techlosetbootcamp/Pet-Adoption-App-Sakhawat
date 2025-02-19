import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AppDispatch, RootState } from '../store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// User Interface
export interface User {
  uid: string;
  username: string;
  email: string | null;
  photoURL: string | null;
  favorites: string[];
  
}
export interface SignUpPayload {
  username: string;
  email: string;
  password: string;
}

// Auth State Interface
export interface AuthState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
}

// Initial State
const initialState: AuthState = {
  isLoading: false,
  error: null,
  user: null,
};

export const onGoogleButtonPress = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signOut();

    const signInResponse = await GoogleSignin.signIn();
    const idToken = signInResponse.data?.idToken; // ✅ Correct way to access idToken

    if (!idToken) {
      throw new Error('Google Sign-In failed: idToken is null.');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const authResponse = await auth().signInWithCredential(googleCredential);
    const { uid, email, displayName, photoURL } = authResponse.user;

    // ✅ Ensure user is authenticated before proceeding
    if (!auth().currentUser) {
      throw new Error('User authentication failed.');
    }

    // Check if the user exists in Firestore
    const userDocRef = firestore().collection('users').doc(uid);
    const userSnapshot = await userDocRef.get();

    let userData = {
      uid,
      username: displayName || 'Unknown User',
      email: email || '',
      photoURL: photoURL || null,
      favorites: [],
    };

    if (!userSnapshot.exists) {
      // Create a new user document if it doesn't exist
      await userDocRef.set(userData);
    } else {
      // Fetch existing user data
      userData = userSnapshot.data() as typeof userData;
    }

    // ✅ Dispatch the user to Redux store to update the authentication state

    return userData;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

// export async function onGoogleButtonPress() {
//   try {
//     // Check Google Play services
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

//     // Sign in the user
//     const signInResult = await GoogleSignin.signIn();
//     console.log('Google Sign-In Result:', signInResult);

//     // Extract idToken
//     const idToken = signInResult.data?.idToken; // ✅ Fix: Remove .data

//     if (!idToken) {
//       throw new Error('No ID token found');
//     }

//     // Create a Google credential
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//     // Sign in the user with Firebase Auth
//     const userCredential = await auth().signInWithCredential(googleCredential);
//     const user = userCredential.user; // ✅ Firebase authenticated user

//     console.log('Firebase User:', user);

//     // Save user data to Firestore
//     await firestore().collection('users').doc(user.uid).set(
//       {
//         uid: user.uid,
//         username: user.displayName || 'Unknown',
//         email: user.email || '',
//         photoURL: user.photoURL || '',
//         createdAt: firestore.FieldValue.serverTimestamp(), // Add timestamp
//       },
//       { merge: true } // ✅ Avoid overwriting existing data
//     );

//     console.log('User data saved to Firestore');

//     return user;
//   } catch (error) {
//     console.error('Google Sign-In Error:', error);
//     throw error;
//   }
// }





// Async function to fetch user data
export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const user = auth().currentUser;
      if (user) {
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        return {
          uid: user.uid,
          username: userDoc.data()?.username || '',
          email: user.email,
          photoURL: user.photoURL || null,
          favorites: userDoc.data()?.favorites || [],
        };
      }
      return null;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Failed to fetch current user.');
    }
  }
);

// Async register action
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    { email, password, username }: { email: string; password: string; username: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(email, password);
      const user = response?.user;

      if (user) {
        await user.updateProfile({ displayName: username });

        await firestore().collection('users').doc(user.uid).set({
          username: username,
          email: email.toLowerCase(),
          favorites: [],
        });

        console.log('User registered successfully!', { username, email: user.email });

        return { uid: user.uid, username, email: user.email, photoURL: null, favorites: [] };
      } else {
        throw new Error('User creation failed.');
      }
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Registration failed.');
    }
  }
);

// Async login action
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      const userDoc = await firestore().collection('users').doc(userId).get();

      if (!userDoc.exists) {
        throw new Error('User data not found');
      }

      return {
        uid: userCredential.user.uid,
        username: userDoc.data()?.username || '',
        email: userCredential.user.email || '',
        photoURL: userCredential.user.photoURL || '',
        favorites: userDoc.data()?.favorites || [],
      };
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Login failed.');
    }
  }
);

// Async sign-out action
export const signOutUser = createAsyncThunk('auth/signOutUser', async (_, { rejectWithValue }) => {
  try {
    await auth().signOut();
    return null;
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Sign-out failed.');
  }
});

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout: (state) => {
      state.user = null;
    },
    signUpUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, updateUser, logout, signUpUser } = authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;

