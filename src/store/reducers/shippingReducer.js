import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'
import { calculateShippingCost } from '../../config/shippingConfig'

// Calculate shipping cost PER SELLER (one seller = one parcel)
export const calculate_shipping = createAsyncThunk(
    'shipping/calculate_shipping',
    async ({ sellerId, orderAmount, customerRegion }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/home/calculate-shipping', {
                sellerId,
                orderAmount,
                customerRegion
            })
            return fulfillWithValue({ ...data, sellerId })
        } catch (error) {
            // Fallback: calcul local si backend échoue
            const localShippingCost = calculateShippingCost(customerRegion)
            return fulfillWithValue({
                sellerId,
                shippingCost: localShippingCost,
                freeShipping: false,
                promotionMessage: '',
                originalShippingCost: localShippingCost
            })
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
            return rejectWithValue(error?.response?.data || { error: 'Erreur promotions' })
        }
    }
)

const computeTotals = (shippingBySeller) => {
    const entries = Object.values(shippingBySeller || {})
    const totalShipping = entries.reduce((sum, s) => sum + (s?.shippingCost || 0), 0)
    const freeShippingAll = entries.length > 0 && entries.every(s => s?.freeShipping === true)
    return { totalShipping, freeShippingAll }
}

export const shippingReducer = createSlice({
    name: 'shipping',
    initialState: {
        customerRegion: 'Dakar',
        shippingBySeller: {},
        totalShipping: 2200,
        freeShipping: false,
        promotionMessage: '',
        shippingCost: 2200,
        originalShippingCost: 2200,
        activePromotions: [],
        loader: false,
        errorMessage: ''
    },
    reducers: {
        clearShipping: (state) => {
            state.shippingBySeller = {}
            state.totalShipping = 2200
            state.freeShipping = false
            state.promotionMessage = ''
            state.shippingCost = 2200
            state.originalShippingCost = 2200
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
                state.errorMessage = payload?.error || 'Erreur calcul livraison'
            })
            .addCase(calculate_shipping.fulfilled, (state, { payload }) => {
                state.loader = false
                const sellerId = payload?.sellerId
                if (!sellerId) return

                state.shippingBySeller[sellerId] = {
                    shippingCost: payload.shippingCost,
                    freeShipping: payload.freeShipping,
                    promotionMessage: payload.promotionMessage,
                    originalShippingCost: payload.originalShippingCost
                }

                const { totalShipping, freeShippingAll } = computeTotals(state.shippingBySeller)
                state.totalShipping = totalShipping
                state.freeShipping = freeShippingAll
                state.shippingCost = totalShipping
                state.originalShippingCost = totalShipping

                const messages = Object.values(state.shippingBySeller)
                    .map(s => s?.promotionMessage)
                    .filter(Boolean)
                state.promotionMessage = messages[0] || ''
            })
            .addCase(get_active_promotions.fulfilled, (state, { payload }) => {
                state.activePromotions = payload?.promotions || []
            })
    }
})

export const { clearShipping, setCustomerRegion } = shippingReducer.actions
export default shippingReducer.reducer