import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchSettings } from '../settings';
import { ISettings } from '@/types';

const defaultSettings: ISettings = {
	isShowNotification: true,
	notificationMessage:
		'Electronic Bag have been sold out. Please stay tuned for our latest updates.',
	isBagOneInStock: true,
	isBagTwoInStock: true,
	isBagThreeInStock: true,
};

export const useFetchSettings = () => {
	const query = useQuery({
		queryKey: ['useFetchSettings'],
		queryFn: fetchSettings,
		placeholderData: keepPreviousData,
	});

	const settings = useMemo(() => query.data || defaultSettings, [query.data]);

	return { settings, query };
};

export default useFetchSettings;
