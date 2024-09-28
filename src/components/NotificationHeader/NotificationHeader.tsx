import Close from '@/assets/icons/CloseWhite.svg?react';
import { RootState } from '@/store';
import { toggleIsShowAlert } from '@/store/alertSlice';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const NotificationHeader = () => {
	const { isShowAlert, alertContent } = useSelector(
		(state: RootState) => state.alert
	);
	const dispatch = useDispatch();

	const handleCloseAlert = useCallback(() => {
		dispatch(toggleIsShowAlert(false));
	}, [dispatch]);

	return (
		<>
			{isShowAlert && (
				<div className='w-full px-6 py-4 md:py-3 bg-yellow_metal flex flex-row items-center'>
					<p className='text-xs md:text-sm text-slate-100 flex-1 md:text-center'>
						{alertContent}
					</p>
					<Close className='items-end w-5 h-5' onClick={handleCloseAlert} />
				</div>
			)}
		</>
	);
};

export default NotificationHeader;
