import { GiftCustomizationGrid, GiftCustomizationHeader } from '@/components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconCollection } from './config';

export const GiftCustomization = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { t } = useTranslation('customization');

	const handleBack = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	console.log('name', location.state);
	return (
		<>
			<GiftCustomizationHeader
				title={t('gift_customization')}
				onBack={handleBack}
			/>

			<div className='p-6'>
				{IconCollection.map(({ key, images }) => (
					<GiftCustomizationGrid key={key} title={t(key)} images={images} />
				))}
			</div>
		</>
	);
};

export default GiftCustomization;
