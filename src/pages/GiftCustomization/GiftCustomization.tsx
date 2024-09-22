import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const GiftCustomization = () => {
	const location = useLocation();
	const [bagImg, setBagImg] = useState('');

	console.log('name', location.state);
	return <div>GiftCustomization</div>;
};

export default GiftCustomization;
