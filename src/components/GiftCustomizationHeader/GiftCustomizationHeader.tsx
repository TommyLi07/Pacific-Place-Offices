import ArrowLeftIcon from '@/assets/icons/ArrowLeft.svg?react';
import { memo } from 'react';
import { GiftCustomizationProps } from './GiftCustomizationHeader.types';

export const GiftCustomizationHeader = memo<GiftCustomizationProps>(
	({ title, onBack }) => {
		return (
			<div className='flex flex-row items-center h-20 px-6'>
				<button
					className='p-2 border-gray-300 border-2 rounded-2xl shadow-slate-300 shadow-md active:opacity-75 active:scale-95 transition-all duration-150'
					onClick={onBack}
				>
					<ArrowLeftIcon />
				</button>

        {title && <p className='ml-4 font-PP_Tondo_Signage text-2xl'>{title}</p>}
			</div>
		);
	}
);

export default GiftCustomizationHeader;
