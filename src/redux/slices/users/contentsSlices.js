import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../../utils/baseURL";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice.js/globalSlice";

//Initial state
const INITIAL_STATE = {
  loading: false,
  error: null,
  contents: [],
  content: null,
  success: false,
};

//!Fetch public Content Action
export const fetchPrivateContentsAction = createAsyncThunk(
  "contents/fetch-private-contens",
  async ({ searchTerm = "" }, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${BASE_URL}/content/all-content?searchTerm=${searchTerm}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//!Fetch Single content Action
export const getSingleContentAction = createAsyncThunk(
  "contents/get-single-content",
  async (contentId, { rejectWithValue, getState, dispatch }) => {
    // console.log("Fetching content with ID:", contentId);
    try {
      const { data } = await axios.get(`${BASE_URL}/content/${contentId}`);
      console.log(data)
      return data;
    } catch (error) {
      rejectWithValue(error?.response?.data);
    }
  }
);

//!Fetch public contents Action
export const fetchPublicContentAction = createAsyncThunk(
  "contents/fetch-public-content",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/content/public`);
      console.log('data', data)
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//* Add content
export const addContentAction = createAsyncThunk(
  "contents/create",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/content/create-content`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Edit content Action
export const updateContentAction = createAsyncThunk(
  "content/update",
  async (contentData, { rejectWithValue, getState }) => {
    try {
      const { id, data } = contentData;
      const token = getState().users?.userAuth?.userInfo?.token;
      console.log(token);
      const response = await axios.put(`${BASE_URL}/content/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//! delete content Action
export const deleteContentAction = createAsyncThunk(
  "contents/delete-content",
  async (contentId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().users?.userAuth?.userInfo.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${BASE_URL}/content/${contentId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Slice
const contentSlice = createSlice({
  name: "contents",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //! Fetch public content
    builder
      .addCase(fetchPrivateContentsAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPrivateContentsAction.fulfilled, (state, action) => {
        state.contents = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPrivateContentsAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    //? Fetch Single content details
    builder
      .addCase(getSingleContentAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSingleContentAction.fulfilled, (state, action) => {
        state.content = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getSingleContentAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });


    //? Fetch Public content details
    builder
      .addCase(fetchPublicContentAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPublicContentAction.fulfilled, (state, action) => {
        state.contents = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPublicContentAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    //! Add  content
    builder
      .addCase(addContentAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addContentAction.fulfilled, (state, action) => {
        state.content = action.payload;
        state.success = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(addContentAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    //! Edit  content
    builder
      .addCase(updateContentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateContentAction.fulfilled, (state, action) => {
        const index = state.contents.findIndex(
          (content) => content.id === action.payload.id
        );
        if (index !== -1) {
          state.contents[index] = action.payload;
        }
        state.loading = false;
        state.success = true;
      })
      .addCase(updateContentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    //! Delete  content
    builder
      .addCase(deleteContentAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteContentAction.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteContentAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    //! Reset error action
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = null;
    });

    //? Reset success action
    builder.addCase(resetSuccessAction.fulfilled, (state) => {
      state.success = false;
    });
  },
});

//!generate reducer
const contentsReducer = contentSlice.reducer;
export default contentsReducer;
