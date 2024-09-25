import Badminton from '@/assets/icons/Badminton.svg?react';
import Baseball from '@/assets/icons/Baseball.svg?react';
import Cat from '@/assets/icons/Cat.svg?react';
import Dog from '@/assets/icons/Dog.svg?react';
import ElectronicBag from '@/assets/icons/ElectronicBag.svg?react';
import Football from '@/assets/icons/Football.svg?react';
import MilkTea from '@/assets/icons/MilkTea.svg?react';
import Rabbit from '@/assets/icons/Rabbit.svg?react';
import WellnessBag from '@/assets/icons/WellnessBag.svg?react';
import WorkfolioBag from '@/assets/icons/WorkfolioBag.svg?react';
import { GiftCustomizationHeader, GiftCustomizationList } from '@/components';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export const GiftCustomization = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [bagImg, setBagImg] = useState('');

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
				<GiftCustomizationList
					title='bag'
					images={[ElectronicBag, WellnessBag, WorkfolioBag]}
				/>
				<GiftCustomizationList
					title='Emojis'
					images={[Dog, Rabbit, Cat, Baseball, Football, Badminton, MilkTea]}
				/>
			</div>
		</>
	);
};

export default GiftCustomization;
