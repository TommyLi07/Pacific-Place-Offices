import '@/locales';
import { router } from '@/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { store } from './store';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</QueryClientProvider>
	);
}

export default App;
