import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  token: '', // Initialize the token state to an empty string
};

const authSlice = createSlice({
  name: 'auth', // Slice name
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload; // Set the token with the provided value
    },
    clearToken: state => {
      state.token = ''; // Clear the token by setting it to an empty string
    },
  },
});

export const {setToken, clearToken} = authSlice.actions;
export default authSlice.reducer; // Export the reducer as the default export
