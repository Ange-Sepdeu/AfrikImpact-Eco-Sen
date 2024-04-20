import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance/axiosInstance"

const initialState ={
    imageUrl: "",
    title: "",
    paragraph: "",
    allAgendas: []
};

export const getAllAgendas = createAsyncThunk(
    "agendas/getAgendas", async(thunkAPI) => {
        const url ="/api/admin/getAgendas"
        try {
            const response = await axiosInstance.get(url)
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
})

export const getAvailableAgendas = createAsyncThunk(
    "agendas/getAvailableAgendas", async(thunkAPI) => {
        const url ="/api/admin/getAvailableAgendas"
        try {
            const response = await axiosInstance.get(url)
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
})

export const addAgenda = createAsyncThunk(
    "agendas/addAgenda", async(data, thunkAPI) => {
        const url ="/api/admin/addAgenda"
        axiosInstance.post(url, {data})
        .then(response => response.data)
        .catch(error => thunkAPI.rejectWithValue(error.message))
    }
)

export const updateAgenda = createAsyncThunk(
    "agendas/updateAgenda", async(data, thunkAPI) => {
        const url ="/api/admin/updateAgenda"
        axiosInstance.put(url, {data})
        .then(response => response.data)
        .catch(error => thunkAPI.rejectWithValue(error.message))
    }
)

export const deleteAgenda = createAsyncThunk(
    "agendas/deleteAgenda", async(data, thunkAPI) => {
        const url ="/api/admin/deleteAgenda"
        axiosInstance.delete(url, {data})
        .then(response => response.data)
        .catch(error => thunkAPI.rejectWithValue(error.message))
    }
)

const agendaSlice = createSlice({
    name:"agendas",
    initialState,
    reducers:{
        setSelectedAgenda: (state,action) => {
            state.imageUrl = action.payload.imageUrl
            state.paragraph = action.payload.paragraph
            state.title = action.payload.title
        },
        setAgendas: (state, action) => {
            state.allAgendas = action.payload.data;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllAgendas.pending)
        .addCase(getAllAgendas.fulfilled, (state, action) => {
            console.log("Fulfilled: "+action)
            state.allAgendas = action.payload.data
        })
        .addCase(getAllAgendas.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(getAvailableAgendas.pending)
        .addCase(getAvailableAgendas.fulfilled, (state, action) => {
            console.log("Fulfilled: "+action)
            state.allAgendas = action.payload.data
        })
        .addCase(getAvailableAgendas.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(addAgenda.pending)
        .addCase(addAgenda.fulfilled, (state, action) => {
            console.log("Success: "+action)
            state.allAgendas = action.payload
        })
        .addCase(addAgenda.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(updateAgenda.pending)
        .addCase(updateAgenda.fulfilled, (state, action) => {
            console.log("Success: "+action)
            state.allAgendas = action.payload
        })
        .addCase(updateAgenda.rejected, (state, action) => {
            console.log("Error: "+action)
        })
        .addCase(deleteAgenda.pending)
        .addCase(deleteAgenda.fulfilled, (state, action) => {
            console.log("Success: "+action)
            state.allAgendas = action.payload
        })
        .addCase(deleteAgenda.rejected, (state, action) => {
            console.log("Error: "+action)
        })
    }
})

export const {setSelectedAgenda, setAgendas} = agendaSlice.actions

export const getAgendas = (state) => state.agendas.allAgendas 
export const getAnAgenda = (state) => ({imageUrl: state.imageUrl,title: state.title,paragraph: state.paragraph})

export default agendaSlice.reducer