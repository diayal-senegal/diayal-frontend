import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_order = createAsyncThunk(
  'order/place_order',
  async({price, products, shipping_fee, items, shippingInfo, userId, navigate}, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/home/order/place-order', {
        price, 
        products, 
        shipping_fee, 
        items, 
        shippingInfo, 
        userId: userId.id,
        navigate
      });
      navigate('/payment', {state : {
        price: price + shipping_fee,
        items,
        orderId: data.orderId
      }
         
        })
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//End Method

export const get_orders = createAsyncThunk(
    'order/get_orders',
    async({customerId, status}, { rejectWithValue, fulfillWithValue }) => {
        try {
            console.log('Tentative appel API:', `/home/customer/get-orders/${customerId}/${status}`);
            const {data} = await api.get(`/home/customer/get-orders/${customerId}/${status}`)
            // console.log(data);
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)
//End Method

export const get_order_details = createAsyncThunk(
    'order/get_order_details',
    async(orderId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/home/customer/get-order-details/${orderId}`)
            // console.log(data);
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)
//End Method

export const delete_order = createAsyncThunk(
    'order/delete_order',
    async(orderId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.delete(`/home/customer/delete-order/${orderId}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
//End Method


export const orderReducer = createSlice({
    name: 'order',
    initialState: {
       myOrders : [],
       errorMessage : '',
       successMessage : '',
       myOrder : {},
       
       
    },
    reducers: {
        messageClear : (state,_) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: (builder) => {
  builder
    .addCase(get_orders.fulfilled, (state, { payload }) => {
      state.myOrders = payload.orders || [];
    })
    .addCase(get_orders.rejected, (state, { payload }) => {
      console.log('Erreur récupération commandes:', payload);
      state.myOrders = [];
      state.errorMessage = payload?.message || 'Erreur lors de la récupération des commandes';
    })
    .addCase(get_order_details.fulfilled, (state, { payload }) => {
      state.myOrder = payload.order;
    })
    .addCase(delete_order.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message || 'Commande supprimée avec succès';
    })
    .addCase(delete_order.rejected, (state, { payload }) => {
      state.errorMessage = payload?.message || 'Erreur lors de la suppression';
    })

      // .addCase(place_order.rejected, (state, { payload }) => {
      //   state.errorMessage = payload?.error || "Erreur lors de la commande";
      // });
    
    
    
  }

})
export const {messageClear} = orderReducer.actions
export default orderReducer.reducer