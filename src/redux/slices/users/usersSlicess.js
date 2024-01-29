import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice.js/globalSlice";
import BASE_URL from "../../../utils/baseURL";
import axios from "axios";

const INITIAL_STATE = {
  loading: false,
  error: null,
  users: [],
  user: null,
  success: false,
  isProfileImgUploaded: false,
  isCoverImageUploaded: false,
  profile: {},
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

// ! Register action
export const registerAction = createAsyncThunk(
  "users/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/users/register`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//* Login Action
export const loginAction = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/users/login`, payload);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Get User Private Profile action
export const userPrivateProfileAction = createAsyncThunk(
  "users/user-private-profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().users.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${BASE_URL}/users/profile`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// * Upload profile image
export const uploadProfileImageAction = createAsyncThunk(
  "users/upload-profile-image",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${BASE_URL}/users/upload-profile-image`,
        formData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ? Logout action
export const logoutAction = createAsyncThunk("users/logout", async () => {
  localStorage.removeItem("userInfo");
  return true;
});

//? user slices
const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //* Register
    builder
      .addCase(registerAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    //? Login
    builder
      .addCase(loginAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.userAuth.userInfo = action.payload;
        state.loading = false;
        state.success = true;
        state.error = false;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    //* get user private profile
    builder
      .addCase(userPrivateProfileAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userPrivateProfileAction.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(userPrivateProfileAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // ! Upload profile image
    builder
      .addCase(uploadProfileImageAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(uploadProfileImageAction.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileImgUploaded = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(uploadProfileImageAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isProfileImgUploaded = false;
      });

    // ! Reset error
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = null;
    });

    //! Reset success
    builder.addCase(resetSuccessAction.fulfilled, (state) => {
      state.success = false;
    });
  },
});

// generate reducers
const usersReducer = usersSlice.reducer;

export default usersReducer;
