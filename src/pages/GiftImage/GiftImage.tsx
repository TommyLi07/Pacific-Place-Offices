import { useLocation } from 'react-router-dom';

export const GiftImage = () => {
	const location = useLocation();

	const { giftImageSrc } = location.state;

	return (
		<div className='w-screen h-screen flex justify-center items-center'>
			<img src={giftImageSrc} alt='gift image' className='object-contain' />
		</div>
	);
};

export default GiftImage;
