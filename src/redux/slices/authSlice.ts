import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AppDispatch, RootState} from '../store';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_CLIENT_ID} from '@env';

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID, // Your webClientId for Google Sign-In
});

// User Interface
export interface User {
  uid: string;
  username: string;
  email: string | null;
  photoURL: string | null;
  favorites: string[];
}
export interface SignUpPayload {
  username: string | undefined;
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
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    await GoogleSignin.signOut();

    const signInResponse = await GoogleSignin.signIn();
    const idToken = signInResponse?.data?.idToken; // Correct way to access idToken

    if (!idToken) {
      throw new Error('Google Sign-In failed: idToken is null.');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const authResponse = await auth().signInWithCredential(googleCredential);
    const {uid, email, displayName, photoURL} = authResponse.user;
    console.log('in sign-google - 6', uid);

    if (!auth().currentUser) {
      throw new Error('User authentication failed.');
    }

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
      await userDocRef.set(userData);
    } else {
      userData = userSnapshot.data() as typeof userData;
    }

    return userData;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const user = auth().currentUser;

      if (user) {
        const userRef = firestore().collection('users').doc(user.uid);

        // Listen for real-time updates using onSnapshot
        const unsubscribe = userRef.onSnapshot((doc) => {
          if (doc.exists) {
            const userData = {
              uid: user.uid,
              username: doc.data()?.username || '',
              email: user.email,
              photoURL: doc.data()?.photoURL || null, // Fetching from Firestore
              favorites: doc.data()?.favorites || [],
            };

            // Dispatch setUser to update Redux store
            dispatch(setUser(userData));
          }
        });

        return () => unsubscribe(); // Cleanup listener when component unmounts
      }

      return null;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Failed to fetch current user.');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (
    {username, photoURL}: {username: string; photoURL: string},
    {rejectWithValue, dispatch},
  ) => {
    const currentUser = auth().currentUser;
    if (!currentUser) return rejectWithValue('No user logged in');
    console.log('CurrentUser', currentUser);
    try {
      // Update Firebase Auth display name
      // await currentUser.updateProfile({displayName: username, photoURL});

      // Update Firestore with the new username & photoURL
      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .set({username, photoURL}, {merge: true});

      // Update Redux store
      return {username, photoURL};
    } catch (error) {
      return rejectWithValue('Failed to update profile');
    }
  },
);

// Async register action
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

        await firestore().collection('users').doc(user.uid).set({
          username: username,
          email: email.toLowerCase(),
          favorites: [],
        });

        console.log('User registered successfully!', {
          username,
          email: user.email,
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
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Registration failed.');
    }
  },
);

// Async login action
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
  },
);

// Async sign-out action
export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, {rejectWithValue}) => {
    try {
      await auth().signOut();
      return null;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Sign-out failed.');
    }
  },
);

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
        state.user = {...state.user, ...action.payload};
      }
    },
    signUpUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
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
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user.photoURL = action.payload.photoURL;
          state.user.username = action.payload.username;
        }
        console.log(state.user)
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

      .addCase(signOutUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});

export const {setUser, updateUser, signUpUser} = authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;
