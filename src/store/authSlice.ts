import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  username: string | null;
  email: string | null;
  password: string | null;
}

interface IAuthState {
  user: IUser;
  status: Status;
}

const initialState: IAuthState = {
  user: {
    username: null,
    email: null,
    password: null,
  },
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: IAuthState, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setStatus(state: IAuthState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setStatus, setUser } = authSlice.actions;
export default authSlice.reducer;
