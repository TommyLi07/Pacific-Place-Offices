import AsPerMyLastEmail from '@/assets/icons/AsPerMyLastEmail.svg?react';
import AsSlowAsPossible from '@/assets/icons/AsSlowAsPossible.svg?react';
import Badminton from '@/assets/icons/Badminton.svg?react';
import Baseball from '@/assets/icons/Baseball.svg?react';
import BeNiceToMe from '@/assets/icons/BeNiceToMe.svg?react';
import Cat from '@/assets/icons/Cat.svg?react';
import DeadlineFighter from '@/assets/icons/DeadlineFighter.svg?react';
import Dog from '@/assets/icons/Dog.svg?react';
import Donut from '@/assets/icons/Donut.svg?react';
import DrinkYourWater from '@/assets/icons/DrinkYourWater.svg?react';
import ElectronicBag from '@/assets/icons/ElectronicBag.svg?react';
import Football from '@/assets/icons/Football.svg?react';
import IAmAExtrovert from '@/assets/icons/IAmAExtrovert.svg?react';
import Introvert from '@/assets/icons/Introvert.svg?react';
import MaybeTomorrow from '@/assets/icons/MaybeTomorrow.svg?react';
import MilkTea from '@/assets/icons/MilkTea.svg?react';
import MoreCoffeePlz from '@/assets/icons/MoreCoffeePlz.svg?react';
import OutOfOffice from '@/assets/icons/OutOfOffice.svg?react';
import Pizza from '@/assets/icons/Pizza.svg?react';
import Rabbit from '@/assets/icons/Rabbit.svg?react';
import Volleyball from '@/assets/icons/Volleyball.svg?react';
import WellnessBag from '@/assets/icons/WellnessBag.svg?react';
import WorkfolioBag from '@/assets/icons/WorkfolioBag.svg?react';
import { GiftCustomizationHeader, GiftCustomizationList } from '@/components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

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
				<GiftCustomizationList
					title='bag'
					images={[ElectronicBag, WellnessBag, WorkfolioBag]}
				/>
				<GiftCustomizationList
					title='Emojis'
					images={[
						Dog,
						Rabbit,
						Cat,
						Baseball,
						Football,
						Badminton,
						MilkTea,
						Donut,
						Pizza,
						Volleyball,
					]}
				/>
				<GiftCustomizationList
					title='Quotes'
					images={[
						AsPerMyLastEmail,
						MoreCoffeePlz,
						MaybeTomorrow,
						DeadlineFighter,
						BeNiceToMe,
						AsSlowAsPossible,
						IAmAExtrovert,
						Introvert,
						DrinkYourWater,
						OutOfOffice,
					]}
				/>
			</div>
		</>
	);
};

export default GiftCustomization;
