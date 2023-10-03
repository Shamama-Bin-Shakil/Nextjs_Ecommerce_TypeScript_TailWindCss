import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Data {
  email: string;
  name: string;
  avatar: string;
  createAt: string;
  resetPasswordToken: string;
  resetPasswordExpire: string;
}

interface State {
  auth: boolean;
  data: Data[];
}

const Authentication = createSlice({
  name: "authentication",
  initialState: {
    auth: false,
    data: [],
  } as State,
  reducers: {
    userLoad: (state, action: PayloadAction<any>) => {
      state.auth = true;
      state.data = action.payload.data;
    },
    userLogoutStore: (state) => {
      state.auth = false;
      state.data = [];
    },
  },
});

export default Authentication;

export const { userLoad, userLogoutStore } = Authentication.actions;
