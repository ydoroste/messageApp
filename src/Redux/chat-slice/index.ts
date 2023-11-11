import { Thread } from '@followBack/Apis/threadsList/type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IThreadMessage } from "@followBack/Apis/ThreadMessages/types"

// Define the initial state
const initialState : any = {
  threadList: [],
  messages:[]
};

// Creating Redux slice
const chatSlice = createSlice({
  name: 'chat', // Slice name
  initialState, // Use the defined initialState
  reducers: {
    setThreadList: (state, action: PayloadAction<Thread[]>) => {
      state.threadList = action.payload;
    },
    setMessages: (state, action:PayloadAction<IThreadMessage[]>)=>{
      state.messages = action.payload
    }
  },
});

// Export action creators and reducer
export const {setThreadList, setMessages} = chatSlice.actions;

export default chatSlice.reducer; // Export the reducer as the default export
