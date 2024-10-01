import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchSettings } from '../settings';

export const useFetchSettings = () => {
	const query = useQuery({
		queryKey: ['useFetchSettings'],
		queryFn: fetchSettings,
		placeholderData: keepPreviousData,
	});

	const settings = useMemo(() => query.data, [query.data]);

  return { settings, query };
};

export default useFetchSettings;
