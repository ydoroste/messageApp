import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {PERSIST, persistReducer, persistStore} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage'; // Use appropriate storage library

import authSlice from '../authSlice';
import chatSlice from '../chat-slice';

// Combine reducers
const rootReducer = combineReducers({
  chat: chatSlice,
  auth: authSlice,
});

// Define Redux Persist configuration
const persistConfig = {
  key: 'root', // The key for the persisted data in storage
  storage, // The storage engine (AsyncStorage in this case)
  whitelist: ['auth' , 'chat'], // List of reducers to persist (in this case, 'auth')
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

// Create a persistor object to persist the store
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
