import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdoptedPetsState {
  adoptedPets: string[]; // Array of pet IDs adopted by the user
}

const initialState: AdoptedPetsState = {
  adoptedPets: [],
};

const adoptedPetsSlice = createSlice({
  name: 'adoptedPets',
  initialState,
  reducers: {
    adoptPet: (state, action: PayloadAction<string>) => {
      state.adoptedPets.push(action.payload);
    },
  },
});

export const { adoptPet } = adoptedPetsSlice.actions;
export default adoptedPetsSlice.reducer;
