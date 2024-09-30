import { RootState } from '@/store';
import { clsx } from 'clsx';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IBagSelectionItemProps } from './BagSelectionItem.types';

export const BagSelectionItem = memo<IBagSelectionItemProps>(
	({ imageSrc, title, desc, index }) => {
		const { t } = useTranslation();
		const navigate = useNavigate();
		const { isBagOneInStock, isBagTwoInStock, isBagThreeInStock } = useSelector(
			(state: RootState) => state.notification
		);

		const handleClick = useCallback(
			(title: string) => {
				navigate('/customization', { state: { bag: title } });
			},
			[navigate]
		);

		const isDisabledButton = useMemo(() => {
			switch (title) {
				case 'electronic_bag':
					return isBagOneInStock === false;
				case 'wellness_bag':
					return isBagTwoInStock === false;
				case 'workfolio':
					return isBagThreeInStock === false;
				default:
					break;
			}
		}, [title, isBagOneInStock, isBagTwoInStock, isBagThreeInStock]);

		return (
			<div
				id={index === 0 ? 'first-bag' : undefined}
				className={clsx(
					'lg:max-h-660 p-6 xl:p-10 bg-alabaster',
					{
						'mt-4': index ? index > 0 : false,
					},
					'lg:mt-0'
				)}
			>
				<img
					src={imageSrc}
					alt='bag'
					className='w-full h-1/2 xl:h-2/3 object-contain'
				/>
				<h2 className='mt-2 font-PP_Tondo_Signage text-center text-2xl xl:text-4xl'>
					{t(title)}
				</h2>
				<p className='text-center'>{t(desc)}</p>
				<div className='text-center'>
					<button
						className={clsx(
							'mt-5 px-7 xl:px-7 py-2 xl:py-3.5 border border-black rounded-lg',
							{
								'active:border-gray-500': !isDisabledButton,
								'active:text-gray-500': !isDisabledButton,
								'active:opacity-75': !isDisabledButton,
								'active:scale-95': !isDisabledButton,
								'transition-all duration-150': !isDisabledButton,
								'active:scale-100': isDisabledButton,
								'border-gray-300': isDisabledButton,
								'text-gray-300': isDisabledButton,
							}
						)}
						onClick={() => handleClick(title)}
						disabled={isDisabledButton}
					>
						{isDisabledButton ? t('sold_out') : t('select_bag')}
					</button>
				</div>
			</div>
		);
	}
);

export default BagSelectionItem;
