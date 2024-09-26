import { GiftCustomizationGrid, GiftCustomizationHeader } from '@/components';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { IconCollection } from './config';

export const GiftCustomization = () => {
	// const location = useLocation();
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { t } = useTranslation('customization');

	const handleBackButtonClick = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const handleCancelButtonClick = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const handleDiscardButtonClick = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	// console.log('name', location.state);
	return (
		<div className='relative'>
			<GiftCustomizationHeader
				title={t('gift_customization')}
				onBack={handleBackButtonClick}
			/>

			<div className='p-6'>
				{IconCollection.map(({ key, images }) => (
					<GiftCustomizationGrid key={key} title={t(key)} images={images} />
				))}
			</div>

			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(true)}
				className='w-5/6 p-6 bg-alabaster text-slate-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'
				contentLabel='Example Modal'
			>
				<h2 className='font-PP_Tondo_Signage text-3xl text-center'>Discord</h2>
				<p className='mt-4 px-4 text-center'>
					Do you want to discard all the change?
				</p>
				<div className='mt-8 flex flex-row justify-between items-center'>
					<button
						className='px-8 py-3.5 border-2 border-yellow_metal rounded-lg text-yellow_metal'
						onClick={handleCancelButtonClick}
					>
						CANCEL
					</button>
					<button
						className='px-8 py-3.5 bg-yellow_metal text-zinc-100 rounded-lg'
						onClick={handleDiscardButtonClick}
					>
						DISCORD
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default GiftCustomization;
