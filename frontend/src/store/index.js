import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true; // Correctly update the state
    },
    logout(state) {
      state.isLoggedIn = false; // Correctly update the state
    },
  },
});

// Export actions for use in components
export const authActions = authSlice.actions;

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // Ensure 'auth' is used to match the slice name
  },
});
