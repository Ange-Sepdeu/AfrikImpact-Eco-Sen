import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance/axiosInstance"

const initialState ={
    navItem: "",
    subItem: "",
    imageUrl: "",
    paragraph: ""
};

export const getNavItemDetails = createAsyncThunk(
    "nav/getNavItemDetails", async(data,thunkAPI) => {
        const url ="/api/nav/getNavItem"
        axiosInstance.post(url, {data})
        .then(response => response.data)
        .catch(error => thunkAPI.rejectWithValue(error.message))
})

const navSlice = createSlice({
    name:"nav",
    initialState,
    reducers:{
        setSelectedNavItem: (state,action) => {
            state.navItem = action.payload.navItem;
            state.subItem = action.payload.subItem;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getNavItemDetails.pending)
        .addCase(getNavItemDetails.fulfilled, (state, action) => {
            console.log("Fulfilled: "+action)
            state = action.payload
        })
        .addCase(getNavItemDetails.rejected, (state, action) => {
            console.log("Error: "+action)
        })
    }
})

export const {setSelectedNavItem} = navSlice.actions

export const getNavDetails = (state) => state.nav

export default navSlice.reducer