import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    userName: string;
  }


interface PetDetailsState {
  selectedPet: Pet | null;
}

const initialState: PetDetailsState = {
  selectedPet: null,
};

const petDetailsSlice = createSlice({
  name: 'petDetails',
  initialState,
  reducers: {
    setSelectedPet: (state, action: PayloadAction<Pet>) => {
      state.selectedPet = action.payload;
    },
    clearSelectedPet: (state) => {
      state.selectedPet = null;
    },
  },
});

export const { setSelectedPet, clearSelectedPet } = petDetailsSlice.actions;
export default petDetailsSlice.reducer;