import { ISettings } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { postUpdateSettings } from '../settings';

export const usePostUpdateSettings = () => {
	return useMutation({
		mutationKey: ['usePostUpdateSettings'],
		mutationFn: (payload: ISettings) => postUpdateSettings(payload),
	});
};

export default usePostUpdateSettings;
