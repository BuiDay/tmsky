import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit"
import { IHeaderState, } from "../InterfaceReducer";

const initState:IHeaderState = {
        isCollapsed:false,
}
export const headerSlice = createSlice({
    name:"header",
    initialState:initState,
    reducers:{
        showMenu:(state, action)=>{
            console.log(action.payload)
            state.isCollapsed = action.payload;
        }
    },
    extraReducers:{}
})

export const { showMenu} = headerSlice.actions;

export default headerSlice.reducer;