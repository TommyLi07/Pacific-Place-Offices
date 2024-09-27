import clsx from 'clsx';
import { memo } from 'react';
import { SettingToggleButtonProps } from './SettingToggleButton.types';

export const SettingToggleButton = memo<SettingToggleButtonProps>(
	({ status, onToggle }) => {
		return (
			<div className='mt-4 flex items-center'>
				<div className='text-lg font-medium text-dark'>
					Notification Status:
				</div>
				<label className='ml-4 relative inline-flex cursor-pointer select-none items-center'>
					<input
						type='checkbox'
						checked={status}
						onChange={onToggle}
						className='sr-only'
					/>
					<div
						className={clsx('label flex items-center text-lg font-bold', {
							'text-black': status === true,
							'text-yellow_metal': status === false,
						})}
					>
						Off
					</div>
					<div
						className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
							status ? 'bg-yellow_metal' : 'bg-[#CCCCCE]'
						}`}
					>
						<span
							className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
								status ? 'translate-x-[28px]' : ''
							}`}
						></span>
					</div>
					<div
						className={clsx('flex items-center text-lg font-bold', {
							'text-black': status === false,
							'text-yellow_metal': status === true,
						})}
					>
						On
					</div>
				</label>
			</div>
		);
	}
);

export default SettingToggleButton;
