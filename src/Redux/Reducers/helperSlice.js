import { createSlice } from '@reduxjs/toolkit';
import { LOG } from '../../utils/Constants';

export const helperSlice = createSlice({
  name: 'helpers',
  initialState: {
    list: [],
  },
  reducers: {
    addToList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { updateList, addToList } = helperSlice.actions;

export default helperSlice.reducer;
