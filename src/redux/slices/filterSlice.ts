import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  category: string;
}

const initialState: FilterState = {
  category: 'Dog', // Default category
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      console.log('Setting filter:', action.payload);
      state.category = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
