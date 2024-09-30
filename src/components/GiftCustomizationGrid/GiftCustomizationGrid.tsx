import { ItemTypes } from '@/types';
import { useWindowSize } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { memo } from 'react';
import { GiftCustomizationGridProps } from './GiftCustomizationGrid.types';

export const GiftCustomizationGrid = memo<GiftCustomizationGridProps>(
	({ title, iconInfos, index, selectedBag, selectedIcons, handleClick }) => {
		const { width: windowWidth } = useWindowSize();

		return (
			<div
				className={clsx({
					'mt-4': index > 0,
				})}
			>
				<h2 className='font-Tondo_W01_Signage text-base'>{title}</h2>
				<div
					className={clsx('mt-2 grid gap-5 justify-items-center', {
						'grid-cols-5': title !== 'Bags',
						'grid-cols-4': windowWidth! >= 1180 && title == 'Bags',
						'grid-cols-3': windowWidth! < 1180 && title == 'Bags',
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
								{/* <iconInfo.svg /> */}
								<img
									src={iconInfo.imageSrc}
									alt='icon image'
									className={clsx({
										'w-[54px] h-[54px]':
											windowWidth! < 1180 &&
											(iconInfo.type === ItemTypes.EMOJI ||
												iconInfo.type === ItemTypes.LETTER ||
												iconInfo.type === ItemTypes.QUOTE),
										'w-[70x] h-[70px]':
											windowWidth! >= 1180 &&
											(iconInfo.type === ItemTypes.EMOJI ||
												iconInfo.type === ItemTypes.LETTER ||
												iconInfo.type === ItemTypes.QUOTE),
										'w-24 h-24': iconInfo.type === ItemTypes.BAG,
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
