import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

// Calculate shipping cost
export const calculate_shipping = createAsyncThunk(
    'shipping/calculate_shipping',
    async ({ sellerId, orderAmount, customerRegion }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/home/calculate-shipping', {
                sellerId,
                orderAmount,
                customerRegion
            })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Get active promotions for region
export const get_active_promotions = createAsyncThunk(
    'shipping/get_active_promotions',
    async (region, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/active-promotions/${region}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const shippingReducer = createSlice({
    name: 'shipping',
    initialState: {
        shippingCost: 5000,
        freeShipping: false,
        promotionMessage: '',
        originalShippingCost: 5000,
        activePromotions: [],
        loader: false,
        errorMessage: ''
    },
    reducers: {
        clearShipping: (state) => {
            state.shippingCost = 5000
            state.freeShipping = false
            state.promotionMessage = ''
            state.errorMessage = ''
        },
        setCustomerRegion: (state, { payload }) => {
            state.customerRegion = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(calculate_shipping.pending, (state) => {
                state.loader = true
            })
            .addCase(calculate_shipping.rejected, (state, { payload }) => {
                state.loader = false
                state.errorMessage = payload.error
            })
            .addCase(calculate_shipping.fulfilled, (state, { payload }) => {
                state.loader = false
                state.shippingCost = payload.shippingCost
                state.freeShipping = payload.freeShipping
                state.promotionMessage = payload.promotionMessage
                state.originalShippingCost = payload.originalShippingCost
            })
            .addCase(get_active_promotions.fulfilled, (state, { payload }) => {
                state.activePromotions = payload.promotions
            })
    }
})

export const { clearShipping, setCustomerRegion } = shippingReducer.actions
export default shippingReducer.reducer