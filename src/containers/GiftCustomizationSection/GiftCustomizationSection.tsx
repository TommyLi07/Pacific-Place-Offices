import { memo } from 'react';
import { GiftCustomizationSectionProps } from './GiftCustomizationSection.types';
import clsx from 'clsx';

export const GiftCustomizationSection = memo<GiftCustomizationSectionProps>(
	({ title, subtitle, index, children }) => {
		return (
      <div className={clsx({'mt-4': index > 0})}>
				<h2 className='text-xl font-Tondo_W01_Signage'>{title}</h2>
				<h3 className='text-xs mt-2'>{subtitle}</h3>
        <div className={clsx({'mt-8': index > 0})}>{children}</div>
			</div>
		);
	}
);

export default GiftCustomizationSection;
