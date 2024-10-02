import { clsx } from 'clsx';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IBagSelectionItemProps } from './BagSelectionItem.types';

export const BagSelectionItem = memo<IBagSelectionItemProps>(
	({ imageSrc, title, desc, index, settings, onClick }) => {
		const { t } = useTranslation();

		const handleClick = useCallback(
			(title: string) => {
				onClick(title);
			},
			[onClick]
		);

		const isDisabledButton = useMemo(() => {
			switch (title) {
				case 'electronic_bag':
					return settings.isBagOneInStock === false;
				case 'wellness_bag':
					return settings.isBagTwoInStock === false;
				case 'workfolio':
					return settings.isBagThreeInStock === false;
				default:
					break;
			}
		}, [title, settings]);

		return (
			<div
				id={index === 0 ? 'first-bag' : undefined}
				className={clsx(
					'h-max-[800px] lg:h-[760px] xl:h-[780px] 2xl:h-[700px] p-6 lg:p-2 2xl:px-4 bg-alabaster',
					{
						'mt-4': index ? index > 0 : false,
					},
					'lg:mt-0'
				)}
			>
				<img
					src={imageSrc}
					alt='bag'
					className='w-full h-1/2 lg:h-3/5 xl:h-2/3 object-contain'
				/>
				<h2 className='mt-2 font-PP_Tondo_Signage text-center text-2xl xl:text-4xl'>
					{t(title)}
				</h2>
				<p className='text-center mt-3'>{t(desc)}</p>
				<div className='text-center mt-5'>
					<button
						className={clsx(
							'px-7 xl:px-7 py-2 xl:py-3 border border-black rounded-lg',
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
