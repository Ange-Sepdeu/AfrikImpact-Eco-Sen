import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance/axiosInstance"

const initialState ={
    imageUrl: "",
    title: "",
    paragraph: "",
    allActualites: []
};

export const getAllActualites = createAsyncThunk(
    "actualites/getAllActualites", async(pm=10,thunkAPI) => {
        const url ="/api/admin/getActualites"
        try {
            const response = await axiosInstance.get(url);
            return response.data
        }
        catch(error) {
          return thunkAPI.rejectWithValue(error.message)
        }
})

export const getAllAvailableActualites = createAsyncThunk(
    "actualites/getAllAvailableActualites", async(pm=10,thunkAPI) => {
        const url ="/api/admin/getAvailableActualites"
        try {
            const response = await axiosInstance.get(url);
            return response.data
        }
        catch(error) {
          return thunkAPI.rejectWithValue(error.message)
        }
})

export const addActualite = createAsyncThunk(
    "actualites/addActualite", async(data, thunkAPI) => {
        const url ="/api/actualites/addActualite"
        axiosInstance.post(url, {data})
        .then(response => response.data)
        .catch(error => thunkAPI.rejectWithValue(error.message))
    }
)

export const updateActualite = createAsyncThunk(
    "actualites/updateActualite", async(data, thunkAPI) => {
        const url ="/api/actualites/updateActualite"
        try {
            const response = await axiosInstance.put(url, data);
            return response.data
        }
        catch(error) {
          return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteActualite = createAsyncThunk(
    "actualites/deleteActualite", async(data, thunkAPI) => {
        const url ="/api/actualites/deleteActualite"
        axiosInstance.put(url, {data})
        .then(response => response.data)
        .catch(error => thunkAPI.rejectWithValue(error.message))
    }
)

const actualiteSlice = createSlice({
    name:"actualites",
    initialState,
    reducers:{
        setSelectedActualites: (state,action) => {
            state.imageUrl = action.payload.imageUrl
            state.paragraph = action.payload.paragraph
            state.title = action.payload.title
        },
        setActualites: (state, action) => {
            state.allActualites = action.payload.data;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllActualites.pending)
        .addCase(getAllActualites.fulfilled, (state, action) => {
            console.log("Fulfilled: "+action.meta)
            state.allActualites = action.payload.data
        })
        .addCase(getAllActualites.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(getAllAvailableActualites.pending)
        .addCase(getAllAvailableActualites.fulfilled, (state, action) => {
            console.log("Fulfilled: "+action.meta)
            state.allActualites = action.payload.data
        })
        .addCase(getAllAvailableActualites.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(addActualite.pending)
        .addCase(addActualite.fulfilled, (state, action) => {
            console.log("Success: "+action)
            state.allActualites = action.payload
        })
        .addCase(addActualite.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(updateActualite.pending)
        .addCase(updateActualite.fulfilled, (state, action) => {
            console.log("Success: "+action)
            state.allActualites = action.payload
        })
        .addCase(updateActualite.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(deleteActualite.pending)
        .addCase(deleteActualite.fulfilled, (state, action) => {
            console.log("Success: "+action)
            state.allActualites = action.payload
        })
        .addCase(deleteActualite.rejected, (state, action) => {
            console.log("Error: "+action)
        })
    }
})

export const {setSelectedActualites, setActualites} = actualiteSlice.actions

export const getActualites = (state) => state.actualites.allActualites 
export const getAnActualite = (state) => ({imageUrl: state.imageUrl,title: state.title,paragraph: state.paragraph})

export default actualiteSlice.reducer