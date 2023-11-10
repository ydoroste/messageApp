import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state
const initialState : any = {
  chatList: [],
};

// Creating Redux slice
const chatSlice = createSlice({
  name: 'chat', // Slice name
  initialState, // Use the defined initialState
  reducers: {
    setChatList: (state, action: PayloadAction<boolean>) => {
      state.chatList = action.payload;
    },
  },
});

// Export action creators and reducer
export const {setChatList} = chatSlice.actions;

export default chatSlice.reducer; // Export the reducer as the default export
