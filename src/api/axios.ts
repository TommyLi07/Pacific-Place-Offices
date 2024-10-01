import Config from '@/Config';
import axios from 'axios';

export const instance = axios.create({
	baseURL: `${Config.baseUrl}`,
	headers: { 'Content-Type': 'application/json' },
});

export default instance;
