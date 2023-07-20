import { createSlice, createAsyncThunk, createAction, PayloadAction, Reducer, AsyncThunkAction } from "@reduxjs/toolkit"
import authService from "./authService";
import { IAuthLogin, IAuthState } from '../InterfaceReducer'

const initState: IAuthState = {
    isLoggedIn: false,
    token: "",
    msg: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
}

export const login: any = createAsyncThunk("auth/login", async (data: IAuthLogin, thunkAPI) => {
    try {
        return await authService.apiLogin(data)
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const logout: any = createAsyncThunk("auth/logout", async (data: IAuthLogin, thunkAPI) => {
    console.log(data)
    try {
        return 1
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const resetLogin: any = createAsyncThunk("auth/reset-login", async (data: IAuthLogin, thunkAPI) => {
    try {
        return 1
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state: IAuthState) => {
                state.isLoading = true;
            })
            .addCase(login.rejected, (state: IAuthState, action: PayloadAction<IAuthState>) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.isLoggedIn = false;
                state.msg = action.payload.msg;
                state.token = undefined;
            })
            .addCase(login.fulfilled, (state: IAuthState, action: PayloadAction<IAuthState>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.msg = action.payload.msg;
                state.token = action.payload.token;
            })
            .addCase(logout.fulfilled, (state: IAuthState, action: PayloadAction<IAuthState>) => {
                state.isLoggedIn = false;
                state.token = "";
            })
            .addCase(resetLogin.fulfilled, (state: IAuthState, action: PayloadAction<IAuthState>) => {
                state.msg = "";
            })
    }
})

export default authSlice.reducer;