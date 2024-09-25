import { memo } from 'react';
import { GiftCustomizationListProps } from './GiftCustomizationList.types';

export const GiftCustomizationList = memo<GiftCustomizationListProps>(
	({ title, images }) => {
		return (
			<div>
				<h2 className='font-Tondo_W01_Signage text-base'>{title}</h2>
				<div className='mt-2 grid grid-cols-3 gap-4'>
					{images.map((Image, index) => {
						return (
							<div className='w-24 h-24 flex justify-center items-center'>
								<Image key={index} />
							</div>
						);
					})}
				</div>
			</div>
		);
	}
);

export default GiftCustomizationList;
