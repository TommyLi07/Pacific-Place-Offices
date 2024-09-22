import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import '@/locales';

function App() {
	return <RouterProvider router={router} />;
}

export default App;
