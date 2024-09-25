import { memo } from 'react';
import { GiftCustomizationListProps } from './GiftCustomizationList.types';

export const GiftCustomizationList = memo<GiftCustomizationListProps>(
	({ title, images }) => {
		return (
			<div>
				<h2 className='font-Tondo_W01_Signage text-base'>{title}</h2>
				<div className='mt-2 flex flex-row flex-wrap'>
					{images.map((Image, index) => {
						return <Image key={index} className='basis-1/3' />;
					})}
				</div>
			</div>
		);
	}
);

export default GiftCustomizationList;
