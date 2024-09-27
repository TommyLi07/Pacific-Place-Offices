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
import { ItemTypes } from '@/types';

export const IconCollection = [
	{
		key: 'bags',
		iconInfos: [
			{
				svg: ElectronicBag,
				id: 'ElectronicBag',
				itemType: ItemTypes.BAG,
				index: 0,
			},
			{
				svg: WellnessBag,
				id: 'WellnessBag',
				itemType: ItemTypes.BAG,
				index: 0,
			},
			{
				svg: WorkfolioBag,
				id: 'WorkfolioBag',
				itemType: ItemTypes.BAG,
				index: 0,
			},
		],
	},
	{
		key: 'emojis',
		iconInfos: [
			{ svg: Dog, id: 'Dog', itemType: ItemTypes.ICON, index: 1 },
			{ svg: Rabbit, id: 'Rabbit', itemType: ItemTypes.ICON, index: 2 },
			{ svg: Cat, id: 'Cat', itemType: ItemTypes.ICON, index: 3 },
			{ svg: Baseball, id: 'Baseball', itemType: ItemTypes.ICON, index: 4 },
			{ svg: Football, id: 'Football', itemType: ItemTypes.ICON, index: 5 },
			{ svg: Badminton, id: 'Badminton', itemType: ItemTypes.ICON, index: 6 },
			{ svg: MilkTea, id: 'MilkTea', itemType: ItemTypes.ICON, index: 7 },
			{ svg: Donut, id: 'Donut', itemType: ItemTypes.ICON, index: 8 },
			{ svg: Pizza, id: 'Pizza', itemType: ItemTypes.ICON, index: 9 },
			{
				svg: Volleyball,
				id: 'Volleyball',
				itemType: ItemTypes.ICON,
				index: 10,
			},
		],
	},
	{
		key: 'quotes',
		iconInfos: [
			{
				svg: AsPerMyLastEmail,
				id: 'AsPerMyLastEmail',
				itemType: ItemTypes.ICON,
				index: 11,
			},
			{
				svg: MoreCoffeePlz,
				id: 'MoreCoffeePlz',
				itemType: ItemTypes.ICON,
				index: 12,
			},
			{
				svg: MaybeTomorrow,
				id: 'MaybeTomorrow',
				itemType: ItemTypes.ICON,
				index: 13,
			},
			{
				svg: DeadlineFighter,
				id: 'DeadlineFighter',
				itemType: ItemTypes.ICON,
				index: 14,
			},
			{
				svg: BeNiceToMe,
				id: 'BeNiceToMe',
				itemType: ItemTypes.ICON,
				index: 15,
			},
			{
				svg: AsSlowAsPossible,
				id: 'AsSlowAsPossible',
				itemType: ItemTypes.ICON,
				index: 16,
			},
			{
				svg: IAmAExtrovert,
				id: 'IAmAExtrovert',
				itemType: ItemTypes.ICON,
				index: 17,
			},
			{
				svg: Introvert,
				id: 'Introvert',
				itemType: ItemTypes.ICON,
				index: 18,
			},
			{
				svg: DrinkYourWater,
				id: 'DrinkYourWater',
				itemType: ItemTypes.ICON,
				index: 19,
			},
			{
				svg: OutOfOffice,
				id: 'OutOfOffice',
				itemType: ItemTypes.ICON,
				index: 20,
			},
		],
	},
];
