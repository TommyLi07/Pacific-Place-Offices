import { GiftCustomization, Landing, Setting } from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Landing />,
	},
	{
		path: '/customization',
		element: <GiftCustomization />,
	},
	{
		path: '/setting',
		element: <Setting />,
	},
]);

export default router;
