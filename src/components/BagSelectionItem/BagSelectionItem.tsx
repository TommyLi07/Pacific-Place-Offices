import { clsx } from 'clsx';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IBagSelectionItemProps } from './BagSelectionItem.types';

export const BagSelectionItem = memo<IBagSelectionItemProps>(
	({ imageSrc, title, desc, index }) => {
		const { t } = useTranslation();
		const navigate = useNavigate();

		const handleClick = useCallback(
			(title: string) => {
				navigate('/customization', { state: { bag: title } });
			},
			[navigate]
		);

		return (
			<div
				className={clsx('lg:max-h-660 p-4 xl:p-10 bg-alabaster', {
					'ml-4': index ? index > 0 : false,
				})}
			>
				<img
					src={imageSrc}
					alt='bag'
					className='w-full h-1/2 xl:h-2/3 object-contain'
				/>
				<h2 className='font-PP_Tondo_Signage text-2xl xl:text-4xl'>
					{t(title)}
				</h2>
				<p>{t(desc)}</p>
				<button
					className='mt-6 px-4 xl:px-7 py-2 xl:py-3.5 border-2 border-black rounded-lg active:border-gray-500 active:text-gray-500 active:opacity-75 active:scale-95 transition-all duration-150'
					onClick={() => handleClick(title)}
				>
					{t('button_text')}
				</button>
			</div>
		);
	}
);

export default BagSelectionItem;
