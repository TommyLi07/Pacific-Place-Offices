import { Landing, GiftCustomization } from '@/pages';
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
]);

export default router;
