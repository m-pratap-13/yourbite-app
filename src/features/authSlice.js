import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: JSON.parse(localStorage.getItem("authStatus")) || false,
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  userRole: JSON.parse(localStorage.getItem("userRole")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.authStatus = true;
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      localStorage.setItem("authStatus", JSON.stringify(true));
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
      localStorage.setItem("userRole", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.authStatus = false;
      state.userRole = null;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("authStatus");
      localStorage.removeItem("userRole");
      localStorage.clear();
    },
  },
});

export const { setUser, setUserRole, clearUser } = authSlice.actions;
export default authSlice.reducer;
