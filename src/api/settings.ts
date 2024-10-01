import { ISettings } from '@/types';
import axios from './axios';

export const fetchSettings = (): Promise<ISettings> =>
	axios.get<ISettings>(`/settings`).then(({ data }) => data);

export const postUpdateSettings = (payload: ISettings): Promise<ISettings> =>
	axios.post<ISettings>(`/settings`, payload).then(({ data }) => data);
