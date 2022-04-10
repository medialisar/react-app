import { createSlice } from '@reduxjs/toolkit';

export const inputSlice = createSlice({
  name: 'spotify',
  initialState: {
    accessToken: null,
  },
  reducers: {
    updateAccessToken: (state, action) => {
      // console.log(action);
      state.accessToken = action.payload;
    },
  },
});

export const { updateAccessToken } = inputSlice.actions;

export default inputSlice.reducer;
