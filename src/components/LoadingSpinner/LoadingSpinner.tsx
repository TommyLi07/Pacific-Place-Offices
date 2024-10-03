import { memo } from 'react';
import { ClipLoader } from 'react-spinners';

export const LoadingSpinner = memo(() => (
	<div className='w-full h-full bg-white flex justify-center items-center'>
		<ClipLoader size={32} color='#715e39' />
	</div>
));

export default LoadingSpinner;
