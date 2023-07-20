import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit"
import userService from "./userService";
import { IUserState } from "../InterfaceReducer";

const initState:IUserState = {
        isError:false,
        data:undefined,
        msg:""
}

export const apiGetCurrent:any = createAsyncThunk("user/get-user",async(data:any,thunkAPI)  =>{
    try{
        return await userService.apiGetCurrent()
    }catch(err){
       return thunkAPI.rejectWithValue(err)
    }
})

export const resetGetCurrent:any = createAsyncThunk("use/reset-user",async(data:any,thunkAPI)  =>{
    try{
        return 1
    }catch(err){
       return thunkAPI.rejectWithValue(err)
    }
})

export const userSlice = createSlice({
    name:"user",
    initialState:initState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(apiGetCurrent.pending,(state:any)=>{
            state.data = undefined
        })
        .addCase(apiGetCurrent.fulfilled,(state:any,action:PayloadAction<any>)=>{
            state.data = action.payload.data;
            state.isError = false
        })
        .addCase(apiGetCurrent.rejected,(state:any,action:PayloadAction<any>)=>{
            state.data = undefined
            state.isError = true
        })
        .addCase(resetGetCurrent.fulfilled,(state:any,action:PayloadAction<any>)=>{
            state.isError=false
            state.msg=''
            state.data=undefined
        })
    },
})

export default userSlice.reducer;