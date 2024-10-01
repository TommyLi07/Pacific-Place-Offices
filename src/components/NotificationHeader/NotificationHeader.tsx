import Close from '@/assets/icons/CloseWhite.svg?react';
import { memo } from 'react';
import { NotificationHeaderProps } from './NotificationHeader.types';

export const NotificationHeader = memo<NotificationHeaderProps>(
	({ settings, onClick }) => {
		return (
			<div className='w-full px-6 py-4 md:py-3 bg-yellow_metal flex flex-row items-center gap-2'>
				<p className='text-xs md:text-sm text-slate-100 flex-1 md:text-center'>
					{settings.notificationMessage}
				</p>
				<Close className='w-5 h-5' onClick={onClick} />
			</div>
		);
	}
);

export default NotificationHeader;
