import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AlertState {
	isShowAlert: boolean;
	alertContent: string;
}

const initialState: AlertState = {
	isShowAlert: false,
	alertContent:
		'Electronic Bag have been sold out. Please stay tuned for our latest updates.',
};

export const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		toggleIsShowAlert: (state, action: PayloadAction<boolean>) => {
			state.isShowAlert = action.payload;
		},
		updateState: (state, action) => {
			Object.assign(state, action.payload);
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleIsShowAlert, updateState } = alertSlice.actions;

export default alertSlice.reducer;
