import CloseBlack from '@/assets/icons/CloseBlack.svg?react';
import DownloadBlack from '@/assets/icons/DownloadBlack.svg?react';
import DownloadWhite from '@/assets/icons/DownloadWhite.svg?react';
import Reset from '@/assets/icons/Reset.svg?react';
import ElectronicBag from '@/assets/images/ElectronicBag.png';
import {
	GiftCustomizationGrid,
	GiftCustomizationHeader,
	Modal,
	NotificationHeader,
} from '@/components';
import { IconCollection } from '@/config';
import { IconInfo, ItemTypes } from '@/types';
import clsx from 'clsx';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { useCallback, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export const GiftCustomization = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation('customization');

	const [isBackModalOpen, setIsBackModalOpen] = useState(false);
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const [isShowNotification, setIsShowNotification] = useState(true);
	const [selectedIcons, setSelectedIcons] = useState<IconInfo[]>([]);
	const imageRef = useRef<HTMLImageElement | null>(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const exportAreaRef = useRef<HTMLDivElement | null>(null);
	const [generatedImage, setGeneratedImage] = useState<string>('');

	// header
	const handleBackButtonClick = useCallback(() => {
		setIsBackModalOpen(true);
	}, []);

	// left-side icon collection
	const handleSelectIcon = useCallback(
		(iconInfo: IconInfo) => {
			if (selectedIcons.length === 5) return;

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

	// drag zone
	const handleReset = useCallback(() => {
		setSelectedIcons([]);
	}, []);

	const handleCloseNotification = useCallback(() => {
		setIsShowNotification(false);
	}, []);

	// back modal
	const handleCancelButtonClick = useCallback(() => {
		setIsBackModalOpen(false);
	}, []);

	const handleDiscardButtonClick = useCallback(() => {
		navigate(-1);
		setIsBackModalOpen(false);
	}, [navigate]);

	// save image modal
	const handleSaveImageButtonClick = useCallback(() => {
		domtoimage
			.toPng(exportAreaRef.current!)
			.then((dataUrl) => {
				setGeneratedImage(dataUrl);
				setIsOrderModalOpen(true);
			})
			.catch((error) => {
				console.error('oops, something went wrong!', error);
			});
	}, []);

	const handleDownloadImage = useCallback(() => {
		domtoimage.toBlob(exportAreaRef.current!).then((blob) => {
			saveAs(blob, 'bag.png');
		});
	}, []);

	const handleCloseOrderSummary = useCallback(() => {
		setIsOrderModalOpen(false);
	}, []);

	useEffect(() => {
		if (imageRef.current && selectedIcons.length !== 0) {
			const { width, height } = imageRef.current.getBoundingClientRect();
			setWidth(width - 96);
			setHeight(height - 96);
		}
	}, [imageRef, selectedIcons]);

	console.log('name', location.state);
	return (
		<div className='relative min-h-dvh flex flex-col'>
			<NotificationHeader />

			<div className='flex-grow flex flex-row'>
				{/* left-side icon collection */}
				<div className='w-1/3 fixed h-full flex flex-col'>
					<GiftCustomizationHeader
						title={t('gift_customization')}
						onBack={handleBackButtonClick}
					/>

					<div className='p-6 h-[88%] overflow-y-auto'>
						<div className='text-sm mb-4'>{t('notification')}</div>
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
						<div ref={exportAreaRef} className='w-2/3 relative'>
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
									<div className={`absolute w-24 h-24 top-0 left-0`}>
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
					<button
						className='absolute top-8 right-8 flex items-center bg-yellow_metal rounded-lg py-2 px-4'
						onClick={handleSaveImageButtonClick}
					>
						<DownloadWhite />
						<p className='text-zinc-100 text-base'>Save Image</p>
					</button>

					{/* reset button */}
					<button
						className='absolute bottom-10 right-8 p-2 border-gray-300 border-2 rounded-2xl shadow-slate-300 shadow-md active:opacity-75 active:scale-95 transition-all duration-150'
						onClick={handleReset}
					>
						<Reset />
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
			<Modal open={isBackModalOpen} onClose={handleCancelButtonClick}>
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

			{/* save image modal */}
			<Modal open={isOrderModalOpen} onClose={handleCloseOrderSummary}>
				<div className='flex flex-row items-center'>
					<h2 className='font-PP_Tondo_Signage text-3xl flex-1 md:text-center'>
						Order Summary
					</h2>
					<button className='p-2'>
						<CloseBlack onClick={handleCloseOrderSummary} />
					</button>
				</div>

				{generatedImage && (
					<div className='px-20'>
						<div className='flex justify-center items-center mt-4 bg-white'>
							<img
								src={generatedImage}
								alt='generated image'
								className='h-48'
							/>
						</div>
					</div>
				)}

				<div className='flex flex-row items-center gap-8 mt-4'>
					<div>
						<h3 className='font-Tondo_W01_Signage text-xl'>
							Download your gift image
						</h3>
						<p>
							Our gifts are made- to-order. Please line up at the booth in Three
							Pacific Place, redeem your gift in the Pacific Place Offices app,
							and show your QR code to our staff to confirm your preferred
							design.
						</p>
					</div>

					<button
						className='p-2 bg-zinc-50 border-gray-300 border-2 rounded-2xl shadow-slate-300 shadow-md active:opacity-75 active:scale-95 transition-all duration-150'
						onClick={handleDownloadImage}
					>
						<DownloadBlack />
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default GiftCustomization;
