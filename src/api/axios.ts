import axios from 'axios';

export const instance = axios.create({
	baseURL: 'https://www.ryanzhu.top/api',
	headers: { 'Content-Type': 'application/json' },
});

export default instance;
