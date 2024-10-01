import { memo } from 'react';
import { ClipLoader } from 'react-spinners';

export const LoadingSpinner = memo(() => (
	<div className='w-screen h-screen bg-white'>
		<ClipLoader size={32} color='#715e39' />
	</div>
));

export default LoadingSpinner;
