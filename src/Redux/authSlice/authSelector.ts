import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

// Select the 'token' property from the 'auth' slice in the state
export const selectToken = (state: RootState) => state.auth.token;

// Create a selector to check if the token exists (not an empty string or falsy)
export const selectTokenExists = createSelector(
  [selectToken], // Use the 'selectToken' selector
  (token: string) => !!token, // Return true if 'token' is truthy (not an empty string or falsy)
);
