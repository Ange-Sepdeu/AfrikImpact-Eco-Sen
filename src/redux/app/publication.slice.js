import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance/axiosInstance"

const initialState ={
    image_url: "",
    title: "",
    paragraph: "",
    allPublications: []
};

export const getAllPublications = createAsyncThunk(
    "publications/getPublications", async(thunkAPI) => {
        const url ="/api/admin/getPublications";
        try {
            const response = await axiosInstance.get(url);
            return response.data;
        }
        catch(error) {
          return thunkAPI.rejectWithValue(error.message)
        }
})

export const addPublication = createAsyncThunk(
    "publications/addPublication", async(data, thunkAPI) => {
        const url ="/api/publications/addPublication"
        axiosInstance.post(url, {data})
        .then(response => response.data)
        .catch(error => thunkAPI.rejectWithValue(error.message))
    }
)

export const updatePublication = createAsyncThunk(
    "publications/updatePublication", async(data, thunkAPI) => {
        const url ="/api/admin/updatePublication"
        axiosInstance.put(url, {data})
        .then(response => response.data)
        .catch(error => thunkAPI.rejectWithValue(error.message))
    }
)

export const deletePublication = createAsyncThunk(
    "publications/deletePublication", async(data, thunkAPI) => {
        const url ="/api/admin/deletePublication"
        axiosInstance.put(url, data)
        .then(response => response.data)
        .catch(error => thunkAPI.rejectWithValue(error.message))
    }
)

const publicationSlice = createSlice({
    name:"publications",
    initialState,
    reducers:{
        setSelectedPublication: (state,action) => {
            state.image_url = action.payload.imageUrl
            state.paragraph = action.payload.paragraph
            state.title = action.payload.title
        },
        setPublications: (state, action) => {
            state.allPublications = action.payload.data;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllPublications.pending)
        .addCase(getAllPublications.fulfilled, (state, action) => {
            state.allPublications = action.payload.data
        })
        .addCase(getAllPublications.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(addPublication.pending)
        .addCase(addPublication.fulfilled, (state, action) => {
            console.log("Success: "+action)
            state.allPublications = action.payload
        })
        .addCase(addPublication.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(updatePublication.pending)
        .addCase(updatePublication.fulfilled, (state, action) => {
            console.log("Success: "+action)
            state.allPublications = action.payload
        })
        .addCase(updatePublication.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(deletePublication.pending)
        .addCase(deletePublication.fulfilled, (state, action) => {
            console.log("Success: "+action)
            state.allPublications = action.payload
        })
        .addCase(deletePublication.rejected, (state, action) => {
            console.log("Error: "+action)
        })
    }
})

export const {setSelectedPublication, setPublications} = publicationSlice.actions

export const getPublications = (state) => state.publications.allPublications 
export const getAPublication = (state) => ({imageUrl: state.publications.image_url,title: state.publications.title,paragraph: state.publications.paragraph})

export default publicationSlice.reducer