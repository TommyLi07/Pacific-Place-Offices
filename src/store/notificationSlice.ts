import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface NotificationState {
	isShowNotification: boolean;
}

const initialState: NotificationState = {
	isShowNotification: true,
};

export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		toggleIsShowNotification: (state, action: PayloadAction<boolean>) => {
			state.isShowNotification = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleIsShowNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
