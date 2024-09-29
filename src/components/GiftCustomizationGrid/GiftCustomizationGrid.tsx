import clsx from 'clsx';
import { memo } from 'react';
import { GiftCustomizationGridProps } from './GiftCustomizationGrid.types';

export const GiftCustomizationGrid = memo<GiftCustomizationGridProps>(
	({ title, iconInfos, index, selectedIcons, handleClick }) => {
		return (
			<div
				className={clsx({
					'mt-4': index > 0,
				})}
			>
				<h2 className='font-Tondo_W01_Signage text-base'>{title}</h2>
				<div className='mt-2 grid grid-cols-4 gap-5 justify-items-center'>
					{/* add selected icon to selectedIcon array */}
					{iconInfos.map((iconInfo) => {
						return (
							<div
								key={iconInfo.id}
								className={clsx(
									'w-auto h-24 flex flex-row justify-center items-center object-contain',
									{
										'border-2 border-yellow_metal rounded-md':
											selectedIcons.some(
												(selectedIcon) => selectedIcon.id === iconInfo.id
											),
									}
								)}
								onClick={() =>
									handleClick({
										...iconInfo,
									})
								}
							>
								<iconInfo.svg />
								{/* <img
									src={iconInfo.imageSrc}
									alt='icon image'
									className={clsx('w-full h-full object-contain', {
										'scale-75': iconInfo.type === ItemTypes.LETTER,
										'scale-90': iconInfo.type === ItemTypes.EMOJI,
										'scale-95': iconInfo.type === ItemTypes.QUOTE,
									})}
								/> */}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
);

export default GiftCustomizationGrid;
