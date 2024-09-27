import clsx from 'clsx';
import { memo } from 'react';
import { DraggableIcon } from '../DraggableIcon';
import { GiftCustomizationGridProps } from './GiftCustomizationGrid.types';

export const GiftCustomizationGrid = memo<GiftCustomizationGridProps>(
	({ title, iconInfos, index }) => {
		return (
			<div
				className={clsx({
					'mt-4': index > 0,
				})}
			>
				<h2 className='font-Tondo_W01_Signage text-base'>{title}</h2>
				<div className='mt-2 grid grid-cols-3 gap-4 justify-items-center'>
					{iconInfos.map((iconInfo, index) => {
						return (
							<div
								key={index}
								className='w-24 h-24 flex flex-row justify-center items-center'
							>
								<DraggableIcon
									itemIcon={<iconInfo.svg />}
									itemType={iconInfo.itemType}
									itemId={iconInfo.id}
									itemIndex={iconInfo.index}
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
