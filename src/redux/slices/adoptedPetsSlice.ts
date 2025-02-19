import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pet {
  id: string;
  name: string;
  type: string;
  adoptedBy: string[]; // Array of user IDs who adopted the pet
  adoptionDate?: string;
}

interface AdoptedPetsState {
  adoptedPets: Pet[]; // Array of Pet objects, not just IDs
}

const initialState: AdoptedPetsState = {
  adoptedPets: [], // Start with an empty array of Pet objects
};

const adoptedPetsSlice = createSlice({
  name: 'adoptedPets',
  initialState,
  reducers: {
    // Action to adopt a pet (you now push a Pet object, not just an ID)
    adoptPet: (state, action: PayloadAction<Pet>) => {
      state.adoptedPets.push(action.payload);
    },
  },
});

export const { adoptPet } = adoptedPetsSlice.actions;
export default adoptedPetsSlice.reducer;
