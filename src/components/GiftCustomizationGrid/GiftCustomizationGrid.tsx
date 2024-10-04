import { ItemTypes } from '@/types';
import { useWindowSize } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { GiftCustomizationGridProps } from './GiftCustomizationGrid.types';

export const GiftCustomizationGrid = memo<GiftCustomizationGridProps>(
	({ title, iconInfos, selectedBag, selectedIcons, handleClick }) => {
		const { width: windowWidth } = useWindowSize();

		const isGiftCategory = useMemo(() => {
			return title === 'Gifts';
		}, [title]);

		return (
			<div
				className={clsx({
					'mt-4': !isGiftCategory,
				})}
			>
				{!isGiftCategory && (
					<h2 className='font-Tondo_W01_Signage text-base'>{title}</h2>
				)}
				<div
					className={clsx('mt-2 grid justify-items-center', {
						'grid-cols-5': !isGiftCategory,
						'grid-cols-4': windowWidth! >= 1180 && isGiftCategory,
						'grid-cols-3': windowWidth! < 1180 && isGiftCategory,
						'gap-3': windowWidth! >= 1180,
						'gap-5': windowWidth! < 1180,
					})}
				>
					{/* add selected icon to selectedIcon array */}
					{iconInfos.map((iconInfo) => {
						return (
							<div
								key={iconInfo.id}
								className={clsx('flex flex-row justify-center items-center', {
									'border-2 border-yellow_metal rounded-md':
										selectedBag.id === iconInfo.id ||
										selectedIcons.some(
											(selectedIcon) => selectedIcon.id === iconInfo.id
										),
								})}
								onClick={() =>
									handleClick({
										...iconInfo,
										key: `${iconInfo.id}-${selectedIcons.length}`,
										defaultX: 0,
										defaultY: 0,
										translateX: 0,
										translateY: 0,
									})
								}
							>
								<img
									src={iconInfo.imageSrc}
									alt='icon image'
									className={clsx({
										'w-[54px] h-[54px]':
											windowWidth! < 1180 &&
											(iconInfo.type === ItemTypes.ChARACTER ||
												iconInfo.type === ItemTypes.COLORFUL_LETTER ||
												iconInfo.type === ItemTypes.MONOCHROME_LETTER ||
												iconInfo.type === ItemTypes.QUOTE),
										'w-[70x] h-[70px]':
											windowWidth! >= 1180 &&
											(iconInfo.type === ItemTypes.ChARACTER ||
												iconInfo.type === ItemTypes.COLORFUL_LETTER ||
												iconInfo.type === ItemTypes.MONOCHROME_LETTER ||
												iconInfo.type === ItemTypes.QUOTE),
										'w-24 h-24': iconInfo.type === ItemTypes.GIFT,
									})}
								/>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
);

export default GiftCustomizationGrid;
