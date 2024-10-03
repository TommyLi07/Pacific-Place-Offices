import { ISettings } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { postUpdateSettings } from '../settings';

interface Props {
	onSuccess?: () => void;
	onError?: () => void;
}

export const usePostUpdateSettings = ({ onSuccess, onError }: Props) => {
	return useMutation({
		mutationKey: ['usePostUpdateSettings'],
		mutationFn: (payload: ISettings) => postUpdateSettings(payload),
		onSuccess,
		onError,
	});
};

export default usePostUpdateSettings;
