import Close from '@/assets/icons/CloseWhite.svg?react';
import { RootState } from '@/store';
import { toggleIsShowNotification } from '@/store/notificationSlice';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const NotificationHeader = () => {
	const { isShowNotification, notificationContent } = useSelector(
		(state: RootState) => state.notification
	);
	const dispatch = useDispatch();

	const handleCloseAlert = useCallback(() => {
		dispatch(toggleIsShowNotification(false));
	}, [dispatch]);

	return (
		<>
			{isShowNotification && (
				<div className='w-full px-6 py-4 md:py-3 bg-yellow_metal flex flex-row items-center gap-2'>
					<p className='text-xs md:text-sm text-slate-100 flex-1 md:text-center'>
						{notificationContent}
					</p>
					<Close className='w-5 h-5' onClick={handleCloseAlert} />
				</div>
			)}
		</>
	);
};

export default NotificationHeader;
