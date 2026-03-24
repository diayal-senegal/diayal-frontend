import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_artisans_du_mois = createAsyncThunk(
  'artisan/get_artisans_du_mois',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get('/home/artisans-du-mois');
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const artisanReducer = createSlice({
  name: 'artisan',
  initialState: {
    artisans: [],
    loader: false,
    errorMessage: '',
    successMessage: ''
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = '';
      state.successMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_artisans_du_mois.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_artisans_du_mois.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.artisans = payload.artisans;
      })
      .addCase(get_artisans_du_mois.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload?.message || 'Erreur lors du chargement';
      });
  }
});

export const { messageClear } = artisanReducer.actions;
export default artisanReducer.reducer;
