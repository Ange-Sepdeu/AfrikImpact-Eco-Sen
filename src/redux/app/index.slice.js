import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance/axiosInstance";

const initialState = {
    publications: [],
    actualites: [],
    videos: [],
    agendas: []
}

export const getViewablePublications = createAsyncThunk(
    "index/getPublications", async (_, thunkAPI) => {
        const url = "/api/index/getAvailablePublications";
        try {
            const response = await axiosInstance.get(url);
            return response.data;
        }
        catch(error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getViewableActualites = createAsyncThunk(
    "index/getActualites", async (_, thunkAPI) => {
        const url = "/api/index/getAvailableActualites";
        try {
            const response = await axiosInstance.get(url);
            return response.data;
        }
        catch(error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getViewableAgendas = createAsyncThunk(
    "index/getAgendas", async (_, thunkAPI) => {
        const url = "/api/index/getAvailableAgendas";
        try {
            const response = await axiosInstance.get(url);
            return response.data;
        }
        catch(error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getViewableVideos = createAsyncThunk(
    "index/getVideos", async (_, thunkAPI) => {
        const url = "/api/index/getAvailableVideos";
        try {
            const response = await axiosInstance.get(url);
            return response.data;
        }
        catch(error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const indexSlice = createSlice({
    name: "index",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getViewablePublications.fulfilled, (state, action) => {
            state.publications = action.payload.data;
        })
        .addCase(getViewablePublications.rejected, (state, action) => {
            console.log("Rejected: ", action);
        })
        .addCase(getViewableActualites.fulfilled, (state, action) => {
            state.actualites = action.payload.data;
        })
        .addCase(getViewableActualites.rejected, (state, action) => {
            console.log("Rejected: ", action);
        })
        .addCase(getViewableAgendas.fulfilled, (state, action) => {
            state.agendas = action.payload.data;
        })
        .addCase(getViewableAgendas.rejected, (state, action) => {
            console.log("Rejected: ", action);
        })
        .addCase(getViewableVideos.fulfilled, (state, action) => {
            state.videos = action.payload.data;
        })
        .addCase(getViewableVideos.rejected, (state, action) => {
            console.log("Rejected: ", action);
        })
    }
})

export const selectPublications = (state) => state.index.publications;
export const selectActualites = (state) => state.index.actualites;
export const selectAgendas = (state) => state.index.agendas;
export const selectVideos = (state) => state.index.videos;

export default indexSlice.reducer;