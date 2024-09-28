import CloseBlack from '@/assets/icons/CloseBlack.svg?react';
import Download from '@/assets/icons/Download.svg?react';
import ElectronicBag from '@/assets/images/ElectronicBag.png';
import {
	GiftCustomizationGrid,
	GiftCustomizationHeader,
	NotificationHeader,
} from '@/components';
import { IconCollection } from '@/config';
import { useDisableDocumentBodyScroll } from '@/hooks';
import { IconInfo, ItemTypes } from '@/types';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

// bind modal to my app element
Modal.setAppElement('#root');

export const GiftCustomization = () => {
	// const location = useLocation();
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isShowNotification, setIsShowNotification] = useState(true);
	const [selectedIcons, setSelectedIcons] = useState<IconInfo[]>([]);
	const imageRef = useRef<HTMLImageElement | null>(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const { t } = useTranslation('customization');

	// header
	const handleBackButtonClick = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	// left-side icon collection
	const handleSelectIcon = useCallback(
		(iconInfo: IconInfo) => {
			console.log('selectedIcons', selectedIcons);

			if (selectedIcons.length === 5) return;

			// Count the number of letter icons, quote icons, and emoji icons in iconInfos
			const letterCount = selectedIcons.filter(
				(icon) => icon.type === ItemTypes.LETTER
			).length;
			const quoteCount = selectedIcons.filter(
				(icon) => icon.type === ItemTypes.QUOTE
			).length;
			const emojiCount = selectedIcons.filter(
				(icon) => icon.type === ItemTypes.EMOJI
			).length;

			if (iconInfo.type === ItemTypes.LETTER && letterCount === 3) {
				return;
			}

			if (
				(iconInfo.type === ItemTypes.EMOJI ||
					iconInfo.type === ItemTypes.QUOTE) &&
				quoteCount + emojiCount >= 2
			) {
				return;
			}

			setSelectedIcons((prevState) => [...prevState, { ...iconInfo }]);
		},
		[selectedIcons]
	);

	const handleCloseNotification = useCallback(() => {
		setIsShowNotification(false);
	}, []);

	// modal
	const handleCancelButtonClick = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const handleDiscardButtonClick = useCallback(() => {
		navigate(-1);
		setIsModalOpen(false);
	}, [navigate]);

	// disable scroll bar if modal opens
	useDisableDocumentBodyScroll(isModalOpen);

	useEffect(() => {
		if (imageRef.current && selectedIcons.length !== 0) {
			const { left, right, bottom, top } =
				imageRef.current.getBoundingClientRect();
			setWidth(right - left - 96);
			setHeight(bottom - top - 96);
		}
	}, [imageRef, selectedIcons]);

	// console.log('name', location.state);
	return (
		<div className='relative h-screen flex flex-col'>
			<NotificationHeader />

			<div className='flex-grow flex flex-row'>
				{/* left-side icon collection */}
				<div className='w-1/3 fixed h-full flex flex-col'>
					<GiftCustomizationHeader
						title={t('gift_customization')}
						onBack={handleBackButtonClick}
					/>

					<div className='p-6 h-[88%] overflow-y-auto'>
						<div className='text-sm mb-4'>
							*Choose up to 3 alphabets, and up to 2 characters or quotes
						</div>
						{IconCollection.map(({ key, iconInfos }, index) => (
							<GiftCustomizationGrid
								key={key}
								index={index}
								title={t(key)}
								iconInfos={iconInfos}
								selectedIcons={selectedIcons}
								handleClick={handleSelectIcon}
							/>
						))}
					</div>
				</div>

				{/*  image area */}
				<div className='w-2/3 ml-[33.33%] bg-alice_blue flex justify-center items-center relative'>
					<div className='flex flex-row justify-center'>
						<div id='export-area' className='w-2/3 relative'>
							<img
								src={ElectronicBag}
								alt='Bag front'
								ref={imageRef}
								className='w-full h-full'
							/>
							{/* draggable icons */}
							{selectedIcons.map((selectIcon) => (
								<Draggable
									key={selectIcon.id}
									bounds={{ top: 0, left: 0, right: width, bottom: height }}
								>
									<div
										className='absolute w-24 h-24'
										style={{
											top: selectIcon.y,
											left: selectIcon.x,
										}}
									>
										<img
											src={selectIcon.imageSrc}
											alt='draggable icon'
											className={clsx('w-full h-full object-contain', {
												'scale-75': selectIcon.type === ItemTypes.LETTER,
												'scale-90': selectIcon.type === ItemTypes.EMOJI,
												'scale-95': selectIcon.type === ItemTypes.QUOTE,
											})}
										/>
									</div>
								</Draggable>
							))}
						</div>
					</div>

					{/* download button */}
					<button className='absolute top-8 right-8 flex items-center bg-yellow_metal rounded-lg py-2 px-4'>
						<Download /> <p className='text-zinc-100 text-base'>Save Image</p>
					</button>

					{/* bottom notification bar */}
					{isShowNotification && (
						<div className='absolute bottom-5 w-max-33 text-sm p-4 bg-barley_corn flex flex-row items-center '>
							<p className='flex-1'>
								You can only choose to 3x alphabets, and up to 2 characters or
								quotes.
							</p>
							<CloseBlack
								className='items-end w-5 h-5 ml-4'
								onClick={handleCloseNotification}
							/>
						</div>
					)}
				</div>
			</div>

			{/* back confirmation modal */}
			<Modal
				isOpen={isModalOpen}
				onRequestClose={handleCancelButtonClick}
				className='w-5/6 max-w-[30rem] p-6 md:p-10 bg-alabaster text-slate-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'
			>
				<h2 className='font-PP_Tondo_Signage text-3xl text-center'>Discord</h2>
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
	);
};

export default GiftCustomization;
