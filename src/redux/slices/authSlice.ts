import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth'; // Firebase Authentication module directly imported
import firestore from '@react-native-firebase/firestore'; // Firebase Firestore module directly imported
import {RootState} from '../store'; // Import RootState for typing

interface AuthState {
  isLoading: boolean;
  error: string | null;
  user: {username: string; email: string | null} | null; // Make email nullable
}

const initialState: AuthState = {
  isLoading: false,
  error: null,
  user: null, // Initialize user as null
};

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
      // Create user with email and password
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = response?.user;

      // Update user's display name
      await user.updateProfile({displayName: username});

      // Save user details to Firestore in a "users" collection
      await firestore().collection('users').doc(user?.uid).set({
        username: username,
        email: email.toLowerCase(),
      });
      console.log('User registered successfully!', {
        username,
        email: user?.email,
      });

      return {username, email: user.email}; // Return user data to be stored in state
    } catch (error: any) {
      return rejectWithValue(error.message); // Handle error
    }
  },
);

// Async sign-up action (used in signUpUser)
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (
    {
      username,
      email,
      password,
    }: {username: string; email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      await user.updateProfile({
        displayName: username,
      });

      return {username, email: user.email}; // user.email can be null here, so make sure it's handled properly
    } catch (error: any) {
      return rejectWithValue(error.message); // Handle error
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
      const user = userCredential.user;

      return {username: user.displayName || '', email: user.email}; // Handle email properly
    } catch (error: any) {
      return rejectWithValue(error.message); // Handle error
    }
  },
);

// Async sign-out action
export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, {rejectWithValue}) => {
    try {
      await auth().signOut();
      return null; // Return null to reset user data in the state
    } catch (error: any) {
      return rejectWithValue(error.message); // Handle error
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {setUser: (state, action: PayloadAction<any>) => {
    state.user = action.payload; // Update user data in the state
  },
  logout: (state) => {
    state.user = null; // Clear user data on logout
  },},
  extraReducers: builder => {
    builder
      // Register user case
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

      // Sign-up user case
      .addCase(signUpUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Login user case
      .addCase(loginUser.pending, state => {
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

      // Sign-out user case
      .addCase(signOutUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null; // Reset user data after sign-out
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;

// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import {User, AuthState, SignupPayload, SigninPayload} from '../../types/auth';

// const initialState: AuthState = {
//   currentUser: null,
//   isAuthenticated: false,
//   error: null,
//   showSplash: true, // Added the missing property
// };

// // Signup
// export const signup = createAsyncThunk(
//   'auth/signup',
//   async ({email, password, name}: SignupPayload, {rejectWithValue}) => {
//     try {
//       const existingUser = await firestore()
//         .collection('users')
//         .where('email', '==', email)
//         .get();
//       if (!existingUser.empty) {
//         return rejectWithValue('This email is already registered.');
//       }

//       const userCredential = await auth().createUserWithEmailAndPassword(
//         email,
//         password,
//       );
//       const user = userCredential.user;

//       if (!user) throw new Error('User creation failed.');

//       await user.updateProfile({displayName: name});

//       await firestore().collection('users').doc(user.uid).set({
//         id: user.uid,
//         name,
//         email,
//         createdAt: firestore.Timestamp.now(),
//       });

//       return {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName || name,
//         photoURL: user.photoURL || null,
//       } as User;
//     } catch (error: any) {
//       return rejectWithValue(error.code || error.message);
//     }
//   },
// );

// // Signin
// export const signin = createAsyncThunk(
//   'auth/signin',
//   async ({email, password}: SigninPayload, {rejectWithValue}) => {
//     try {
//       const userCredential = await auth().signInWithEmailAndPassword(
//         email,
//         password,
//       );
//       const user = userCredential.user;

//       if (!user) throw new Error('Login failed.');

//       return {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName,
//         photoURL: user.photoURL,
//       } as User;
//     } catch (error: any) {
//       return rejectWithValue(error.code || error.message);
//     }
//   },
// );

// // Signout
// export const signout = createAsyncThunk(
//   'auth/signout',
//   async (_, {rejectWithValue}) => {
//     try {
//       await auth().signOut();
//     } catch (error: any) {
//       return rejectWithValue(error.code || error.message);
//     }
//   },
// );

// // Update Password
// export const updatePassword = createAsyncThunk(
//   'auth/updatePassword',
//   async (
//     {oldPassword, newPassword}: {oldPassword: string; newPassword: string},
//     {rejectWithValue},
//   ) => {
//     try {
//       const user = auth().currentUser;
//       if (!user || !user.email) {
//         throw new Error('User not found. Please login again.');
//       }

//       // Re-authenticate user before updating password
//       const credential = auth.EmailAuthProvider.credential(
//         user.email,
//         oldPassword,
//       );
//       await user.reauthenticateWithCredential(credential);

//       // Update password in Firebase Authentication
//       await user.updatePassword(newPassword);

//       // Update password in Firestore (if needed)
//       await firestore().collection('users').doc(user.uid).update({
//         password: newPassword, // Ensure you are not storing plain text passwords
//       });

//       return 'Password updated successfully';
//     } catch (error: any) {
//       if (error.code === 'auth/wrong-password') {
//         return rejectWithValue('Incorrect old password.');
//       } else if (error.code === 'auth/requires-recent-login') {
//         return rejectWithValue('Session expired, please login again.');
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   },
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     clearError: state => {
//       state.error = null;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(signup.fulfilled, (state, action) => {
//         state.currentUser = action.payload;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(signup.rejected, (state, action) => {
//         state.error = action.payload as string;
//       })
//       .addCase(signin.fulfilled, (state, action) => {
//         state.currentUser = action.payload;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(signin.rejected, (state, action) => {
//         state.error = action.payload as string;
//       })
//       .addCase(signout.fulfilled, state => {
//         state.currentUser = null;
//         state.isAuthenticated = false;
//         state.error = null;
//       })
//       .addCase(signout.rejected, (state, action) => {
//         state.error = action.payload as string;
//       })
//       .addCase(updatePassword.fulfilled, state => {
//         state.error = null;
//       })
//       .addCase(updatePassword.rejected, (state, action) => {
//         state.error = action.payload as string;
//       });
//   },
// });

// export const {clearError} = authSlice.actions;
// export default authSlice.reducer;
