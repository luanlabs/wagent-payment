import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOrderDetailsResponse, StatusType } from '../models';

interface DataState {
  data: IOrderDetailsResponse | null;
  loading: boolean;
  error: boolean | null;
  orderStatus?: StatusType;
}

const initialState: DataState = {
  data: null,
  loading: true,
  error: null,
};

const data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DataState>) => {
      state.data = action.payload.data;
      state.loading = action.payload.loading;
      state.error = action.payload.error;
      state.orderStatus = action.payload.data?.status;
    },
  },
});

export const { setData } = data.actions;
export default data.reducer;
