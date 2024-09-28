import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface NotificationState {
	isShowNotification: boolean;
	notificationContent: string;
	isBagOneSoldOut: boolean;
	isBagTwoSoldOut: boolean;
	isBagThreeSoldOut: boolean;
}

const initialState: NotificationState = {
	isShowNotification: false,
	notificationContent:
		'Electronic Bag have been sold out. Please stay tuned for our latest updates.',
	isBagOneSoldOut: false,
	isBagTwoSoldOut: false,
	isBagThreeSoldOut: false,
};

export const notificationSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		toggleIsShowNotification: (state, action: PayloadAction<boolean>) => {
			state.isShowNotification = action.payload;
		},
		updateState: (state, action) => {
			Object.assign(state, action.payload);
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleIsShowNotification, updateState } =
	notificationSlice.actions;

export default notificationSlice.reducer;
