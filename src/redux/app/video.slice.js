import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance/axiosInstance"

const initialState ={
    videoUrl: "",
    title: "",
    allBlogs: [],
    allVideos: []
};

export const getAllVideos = createAsyncThunk(
    "videoBlog/getVideos", async(thunkAPI) => {
        const url ="/api/admin/getVideos"
        try {
            const response = await axiosInstance.get(url); 
          return response.data;
        }
        catch(error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
})

export const getAllBlogs = createAsyncThunk(
    "videoBlog/getBlogs", async(thunkAPI) => {
        const url ="/api/admin/getBlogs"
        axiosInstance.get(url)
        .then(response => response.data)
        .catch(error => thunkAPI.rejectWithValue(error.message))
})

export const addVideo = createAsyncThunk(
    "videoBlog/addVideo", async(data, thunkAPI) => {
        const url ="/api/admin/addVideo"
        axiosInstance.post(url, {data})
        .then(response => response.data)
        .catch(error => thunkAPI.rejectWithValue(error.message))
    }
)
export const addBlog = createAsyncThunk(
    "videoBlog/addBlog", async(data, thunkAPI) => {
        const url ="/api/admin/addBlog"
        axiosInstance.post(url, {data})
        .then(response => response.data)
        .catch(error => thunkAPI.rejectWithValue(error.message))
    }
)

export const deleteBlog = createAsyncThunk(
    "videoBlog/deleteBlog", async(data, thunkAPI) => {
        const url ="/api/admin/deleteBlog"
        axiosInstance.delete(url, {data})
        .then(response => response.data)
        .catch(error => thunkAPI.rejectWithValue(error.message))
    }
)

export const deleteVideo = createAsyncThunk(
    "videoBlog/deleteVideo", async(data, thunkAPI) => {
        const url ="/api/admin/deleteVideo"
        axiosInstance.delete(url, {data})
        .then(response => response.data)
        .catch(error => thunkAPI.rejectWithValue(error.message))
    }
)

const videoBlogSlice = createSlice({
    name:"videoBlog",
    initialState,
    reducers:{
        setSelectedPublication: (state,action) => {
            state.title = action.payload.title
        },
        setVideos: (state, action) => {
            state.allVideos = action.payload.data
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllVideos.pending)
        .addCase(getAllVideos.fulfilled, (state, action) => {
            console.log("Fulfilled: "+action)
            state.allVideos = action.payload.data
        })
        .addCase(getAllVideos.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(getAllBlogs.pending)
        .addCase(getAllBlogs.fulfilled, (state, action) => {
            console.log("Fulfilled: "+action)
            state.allBlogs = action.payload
        })
        .addCase(getAllBlogs.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(addVideo.pending)
        .addCase(addVideo.fulfilled, (state, action) => {
            console.log("Success: "+action)
            state.allVideos = action.payload
        })
        .addCase(addVideo.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(addBlog.pending)
        .addCase(addBlog.fulfilled, (state, action) => {
            console.log("Success: "+action)
            state.allBlogs = action.payload
        })
        .addCase(addBlog.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(deleteVideo.pending)
        .addCase(deleteVideo.fulfilled, (state, action) => {
            console.log("Success: "+action)
            state.allvideoBlog = action.payload
        })
        .addCase(deleteVideo.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(deleteBlog.pending)
        .addCase(deleteBlog.fulfilled, (state, action) => {
            console.log("Success: "+action)
            state.allBlogs = action.payload
        })
        .addCase(deleteBlog.rejected, (state, action) => {
            console.log("Error: "+action)
        })
    }
})

export const {setSelectedPublication, setVideos} = videoBlogSlice.actions

export const getVideos = (state) => state.videoBlog.allVideos 
export const getBlogs = (state) => state.videoBlog.allBlogs

export default videoBlogSlice.reducer