import { createAsyncThunk } from "@reduxjs/toolkit";


//! Reset success action
export const resetSuccessAction = createAsyncThunk('reset-success-action',
    () => {
        return true;
    })


    //! Reset error action
export const resetErrorAction = createAsyncThunk('reset-error-action',
() => {
    return true;
})