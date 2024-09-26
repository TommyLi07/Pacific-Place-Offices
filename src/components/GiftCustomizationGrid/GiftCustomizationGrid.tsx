import clsx from 'clsx';
import { memo } from 'react';
import { GiftCustomizationGridProps } from './GiftCustomizationGrid.types';
import { DraggableIcon } from '../DraggableIcon';

export const GiftCustomizationGrid = memo<GiftCustomizationGridProps>(
	({ title, icons, index }) => {
		return (
			<div
				className={clsx({
					'mt-4': index > 0,
				})}
			>
				<h2 className='font-Tondo_W01_Signage text-base'>{title}</h2>
				<div className='mt-2 grid grid-cols-3 gap-4'>
					{icons.map((Icon, index) => {
            return (
							<div
								key={index}
								className='w-24 h-24 flex justify-center items-center'
							>
								<DraggableIcon icon={<Icon />} />
							</div>
						);
					})}
				</div>
			</div>
		);
	}
);

export default GiftCustomizationGrid;
