import ElectronicBagBack from '@/assets/images/ElectronicBagBack.png';
import ElectronicBagFront from '@/assets/images/ElectronicBagFront.png';
import {
	DragAndDropZone,
	GiftCustomizationGrid,
	GiftCustomizationHeader,
} from '@/components';
import { useDisableDocumentBodyScroll } from '@/hooks';
import { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { IconCollection } from './config';
import { IconInfo } from './GiftCustomization.types';

// bind modal to my app element
Modal.setAppElement('#root');

export const GiftCustomization = () => {
	// const location = useLocation();
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [iconInfos, setIconInfos] = useState<IconInfo[]>([]);

	const { t } = useTranslation('customization');

	const handleBackButtonClick = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const handleCancelButtonClick = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const handleDiscardButtonClick = useCallback(() => {
		navigate(-1);
		setIsModalOpen(false);
	}, [navigate]);

	// Drag and Drop
	const handleDrop = useCallback(({ icon, x, y }: IconInfo) => {
		setIconInfos((prevState) => [...prevState, { icon, x, y }]);
	}, []);

	// disable scroll bar if modal opens
	useDisableDocumentBodyScroll(isModalOpen);

	// console.log('name', location.state);
	return (
		<DndProvider backend={HTML5Backend}>
			<div className='relative h-screen'>
				<div className='flex flex-row h-full'>
					<div className='w-1/3 fixed h-full'>
						<GiftCustomizationHeader
							title={t('gift_customization')}
							onBack={handleBackButtonClick}
						/>

						<div className='p-6 h-[94%] overflow-y-auto'>
							{IconCollection.map(({ key, iconInfos }, index) => (
								<GiftCustomizationGrid
									key={key}
									title={t(key)}
									iconInfos={iconInfos}
									index={index}
								/>
							))}
						</div>
					</div>

					<div
						id='export-area'
						className='w-2/3 ml-[33.33%] h-dvh bg-alice_blue'
					>
						<DragAndDropZone iconInfos={iconInfos} onDrop={handleDrop}>
							<div className='flex flex-row justify-center'>
								<img
									src={ElectronicBagFront}
									alt='Bag front'
									className='w-1/2'
								/>
								<img src={ElectronicBagBack} alt='Bag back' className='w-1/2' />
							</div>
						</DragAndDropZone>
					</div>
				</div>

				{/* <GiftCustomizationHeader
				title={t('gift_customization')}
				onBack={handleBackButtonClick}
			/>

			<div className='p-6'>
				{IconCollection.map(({ key, images }) => (
					<GiftCustomizationGrid key={key} title={t(key)} images={images} />
				))}
			</div> */}

				<Modal
					isOpen={isModalOpen}
					onRequestClose={handleCancelButtonClick}
					className='w-5/6 max-w-[30rem] p-6 md:p-10 bg-alabaster text-slate-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'
				>
					<h2 className='font-PP_Tondo_Signage text-3xl text-center'>
						Discord
					</h2>
					<p className='mt-4 px-4 md:px-0 text-center'>
						Do you want to discard all the change?
					</p>
					<div className='mt-8 flex flex-row justify-between items-center'>
						<button
							className='w-[48%] py-3.5 border-2 border-yellow_metal rounded-lg text-yellow_metal'
							onClick={handleCancelButtonClick}
						>
							CANCEL
						</button>
						<button
							className='w-[48%] py-3.5 bg-yellow_metal text-zinc-100 rounded-lg'
							onClick={handleDiscardButtonClick}
						>
							DISCORD
						</button>
					</div>
				</Modal>
			</div>
		</DndProvider>
	);
};

export default GiftCustomization;
