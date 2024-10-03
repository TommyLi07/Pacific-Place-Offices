import { GiftCustomization, Landing, Setting, GiftImage } from '@/pages';
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
	{
		path: '/giftImage',
		element: <GiftImage />,
	},
]);

export default router;
