import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";



export const get_dashboard_index_data = createAsyncThunk(
    'dashboard/get_dashboard_index_data',
    async(userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            console.log('API call for dashboard data, userId:', userId);
            const {data} = await api.get(`/home/customer/get-dashboard-data/${userId}`)
            console.log('API response:', data);
            return fulfillWithValue(data)
        } catch (error) {
            console.error('API error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { message: error.message })
        }
    }
)
//End Method





export const dashboardReducer = createSlice({
    name: 'dashboard',
    initialState: {
       recentOrders : [],
       errorMessage : '',
       successMessage : '',
       totalOrder : 0,
       pendingOrder : 0,
       cancelledOrder : 0
       
    },
    reducers: {
        messageClear : (state,_) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers : (builder) => {
        builder
               .addCase(get_dashboard_index_data.fulfilled, (state, { payload }) => {
                   console.log('Dashboard data received:', payload);
                   state.totalOrder = payload.totalOrder
                   state.pendingOrder = payload.pendingOrder
                   state.cancelledOrder = payload.cancelledOrder
                   state.recentOrders = payload.recentOrders
               })
               .addCase(get_dashboard_index_data.rejected, (state, { payload }) => {
                   console.error('Dashboard data fetch failed:', payload);
                   state.errorMessage = payload?.message || 'Erreur lors du chargement des données'
               })

               
        }
})
export const {messageClear} = dashboardReducer.actions
export default dashboardReducer.reducer