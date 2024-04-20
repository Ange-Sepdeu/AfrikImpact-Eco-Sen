import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance/axiosInstance";

const initialState ={
    "_id": null,
    "username": null,
    "email": null,
    "password": null,
    "authToken": null,
    "createdAt":null,
    "updatedAt":null,
    "status": null
};

export const loginAdmin = createAsyncThunk(
    "app/loginAdmin", async (data, thunkAPI) => {
        const url = "/api/auth/loginAdmin";
        try {
            const response = await axiosInstance.post(url, data);
            return response.data;
        }   
        catch(error) {
            console.log("response login error: ", error);
            return thunkAPI.rejectWithValue(error.response);
        } 
    }
)

export const registerAdmin = createAsyncThunk(
    "app/registerAdmin", async (data, thunkAPI) => {
        const url = "/api/auth/registerAdmin";
        try {
            const response = await axiosInstance.post(url, data);
            return response.data;
        }   
        catch(error) {
            return thunkAPI.rejectWithValue(error.response.data)
        } 
    }
)

const appSlice = createSlice({
    name:"app",
    initialState,
    reducers:{
        setUserLoginDetails:(state,action)=>{
            state._id=action.payload._id;
            state.username=action.payload.username;
            state.email=action.payload.email;
            state.authToken=action.payload.authToken;
            state.createdAt =action.payload.createdAt;
        },
        setSignOutState:(state)=>{
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginAdmin.pending)
        .addCase(loginAdmin.fulfilled, (state, action) => {
            state.authToken = action.payload.data.token;
            state._id = action.payload.data.user._id;
            state.username = action.payload.data.user.username;
            state.email = action.payload.data.user.email;
            state.status = "success"
        })
        .addCase(loginAdmin.rejected, (state, action)=>{
            state.status = action.payload.data.message;
            console.log("Rejected: ", action.error);
        })
        .addCase(registerAdmin.fulfilled, (state, action) => {
            console.log("Fulfilled: ")
        })
        .addCase(registerAdmin.rejected, (state, action) => {
            console.log("Rejected: ")
        })
    }
})

export const {setUserLoginDetails,setSignOutState} = appSlice.actions;

export const selectUserId = (state)=>state.app._id;
export const selectUserName = (state)=>state.app.username;
export const selectUserAuthToken = (state)=>state.app.authToken;
export const selectUserCreatedAt = (state)=>state.app.createdAt;
export const selectUserUpdatedAt = (state)=>state.app.updatedAt;
export const selectUserIdentifier = (state)=>state.app.email;
export const selectStatus = (state) => state.app.status;

export default appSlice.reducer