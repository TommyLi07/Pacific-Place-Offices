import CloseBlack from '@/assets/icons/CloseBlack.svg?react';
import DownloadBlack from '@/assets/icons/DownloadBlack.svg?react';
import DownloadWhite from '@/assets/icons/DownloadWhite.svg?react';
import Reset from '@/assets/icons/Reset.svg?react';
import ModalBackground from '@/assets/images/ModalBackground.png';
import {
	GiftCustomizationGrid,
	GiftCustomizationHeader,
	ModalContainer,
	NotificationHeader,
} from '@/components';
import { IconCollection } from '@/config';
import { IconInfo, ItemTypes } from '@/types';
import { useOrientation, useWindowSize } from '@uidotdev/usehooks';
import clsx from 'clsx';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useTranslation } from 'react-i18next';
import { ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';

export const GiftCustomization = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation('customization');
	const { width: windowWidth, height: windowHeight } = useWindowSize();
	const { type: OrientationType } = useOrientation();

	const [isBackModalOpen, setIsBackModalOpen] = useState(false);
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const [isShowNotification, setIsShowNotification] = useState(false);
	const [selectedBag, setSelectedBag] = useState<IconInfo>(
		IconCollection[0].iconInfos[0]
	);
	const [selectedIcons, setSelectedIcons] = useState<IconInfo[]>([]);
	const imageRef = useRef<HTMLImageElement | null>(null);
	const [imageWidth, setImageWidth] = useState(0);
	const [imageHeight, setImageHeight] = useState(0);
	const exportAreaRef = useRef<HTMLDivElement | null>(null);
	const [generatedImage, setGeneratedImage] = useState<string>('');

	const scrollViewHeight = useMemo(() => {
		if (!windowWidth || !windowHeight) return 0;

		if (windowWidth < 768) {
			return windowHeight - 240 - 144;
		} else if (windowHeight < 1024) {
			return windowHeight - 300 - 144;
		} else {
			return windowHeight - 360 - 144;
		}
	}, [windowHeight, windowWidth]);

	// header
	const handleBackButtonClick = useCallback(() => {
		setIsBackModalOpen(true);
	}, []);

	// left-side icon collection
	const handleSelectIcon = useCallback(
		(iconInfo: IconInfo) => {
			// handle bag selection
			if (iconInfo.type === ItemTypes.BAG) {
				if (iconInfo.id === selectedBag.id) return;

				setSelectedBag(iconInfo);

				return;
			}

			// handle icon selection
			if (selectedIcons.length === 5) {
				setIsShowNotification(true);
				return;
			}

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
				setIsShowNotification(true);
				return;
			}

			if (
				(iconInfo.type === ItemTypes.EMOJI ||
					iconInfo.type === ItemTypes.QUOTE) &&
				quoteCount + emojiCount >= 2
			) {
				setIsShowNotification(true);
				return;
			}

			setSelectedIcons((prevState) => [...prevState, { ...iconInfo }]);
		},
		[selectedIcons, selectedBag.id]
	);

	// drag zone
	// store translate info (but not useful)
	const handleDragStop = useCallback(
		(_: DraggableEvent, data: DraggableData): void | false => {
			const { x, y, node } = data;
			const updatedSelectedIcons = [...selectedIcons];
			const draggableIconIndex = selectedIcons.findIndex(
				(icon) => icon.key === node.id
			);

			if (draggableIconIndex !== -1) {
				updatedSelectedIcons[draggableIconIndex].translateX = x;
				updatedSelectedIcons[draggableIconIndex].translateY = y;
			}

			setSelectedIcons(updatedSelectedIcons);
		},
		[selectedIcons]
	);

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

	// save image button
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

	// order summary modal
	const handleDownloadImage = useCallback(() => {
		domtoimage.toBlob(exportAreaRef.current!).then((blob) => {
			saveAs(blob, 'bag.png');
		});
	}, []);

	const handleCloseOrderSummary = useCallback(() => {
		setIsOrderModalOpen(false);
	}, []);

	// set setSelectedBag
	useEffect(() => {
		const { bag: bagId } = location.state;
		const bagInfo = IconCollection[0].iconInfos.find(
			(icon) => icon.id === bagId
		);

		if (bagInfo) {
			setSelectedBag(bagInfo);
		}
	}, [location.state]);

	// recalculate imageRef
	useEffect(() => {
		if (imageRef.current && selectedIcons.length !== 0) {
			const { width, height } = imageRef.current.getBoundingClientRect();
			let offset = 96;

			if (windowWidth! < 640) {
				offset = 48;
			} else if (windowWidth! < 768) {
				offset = 64;
			} else if (windowWidth! < 1180) {
				offset = 80;
			}

			const newWidth = width - offset;
			const newHeight = height - offset;

			setImageWidth(newWidth);
			setImageHeight(newHeight);
		}
	}, [imageRef, selectedIcons, windowWidth, OrientationType]);

	return (
		<div className='relative min-h-dvh flex flex-col'>
			<ScrollRestoration />

			<NotificationHeader />

			{windowWidth && windowWidth < 1180 ? (
				// screen is less than 1180px
				<div className='w-full h-screen overflow-y-hidden'>
					<div className='fixed top-0 left-0 w-full z-10'>
						<GiftCustomizationHeader
							title={t('gift_customization')}
							onBack={handleBackButtonClick}
						/>

						<div className='relative w-full h-full py-10 bg-alice_blue flex justify-center items-center'>
							<div className='flex flex-row justify-center'>
								<div ref={exportAreaRef} className='relative'>
									<img
										src={selectedBag.imageSrc}
										alt='Bag front'
										ref={imageRef}
										className='h-[240px] md:h-[300px] lg:h-[360px]'
									/>
									{selectedIcons.map((selectIcon, index) => (
										<Draggable
											key={`${selectIcon.id}-${index}`}
											bounds={{
												top: 0,
												left: 0,
												right: imageWidth,
												bottom: imageHeight,
											}}
											onStop={handleDragStop}
										>
											<div
												id={`${selectIcon.id}-${index}`}
												className={`absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 top-${selectIcon.defaultY} left-${selectIcon.defaultX}`}
											>
												<img
													src={selectIcon.imageSrc}
													alt='draggable icon'
													className={clsx('w-full h-full object-contain', {
														'scale-75': selectIcon.type === ItemTypes.LETTER,
														'scale-90': selectIcon.type === ItemTypes.EMOJI,
													})}
												/>
											</div>
										</Draggable>
									))}
								</div>
							</div>

							{/* download button */}
							<button
								className='absolute top-2 right-2 flex items-center bg-yellow_metal rounded-lg py-2 px-2.5'
								onClick={handleSaveImageButtonClick}
							>
								<DownloadWhite className='w-4 h-4' />
								<p className='ml-1 text-zinc-100 text-xs'>{t('save_image')}</p>
							</button>

							{/* reset button */}
							<button
								className='absolute bottom-4 right-4 p-2 flex items-center border-gray-300 border-2 rounded-2xl shadow-slate-300 shadow-md active:opacity-75 active:scale-95 transition-all duration-150'
								onClick={handleReset}
							>
								<Reset className='w-4 h-4' />
								<p className='ml-1 text-xs'>{t('reset')}</p>
							</button>

							{/* bottom notification bar */}
							{isShowNotification && (
								<div className='fixed bottom-5 z-10'>
									<div className='m-6 p-4 text-sm bg-barley_corn flex flex-row items-center gap-6'>
										<p>{t('notification_bar_text')}</p>
										<CloseBlack
											className='w-5 h-5'
											onClick={handleCloseNotification}
										/>
									</div>
								</div>
							)}
						</div>
					</div>

					<div
						className={`absolute top-[384px] md:top-[444px] lg:top-[524px] left-0 w-full h-[${scrollViewHeight}px]`}
					>
						<div className={`py-4 px-6 w-full h-full overflow-y-auto`}>
							<div className='text-sm mb-4 sm:text-center'>
								{t('notification')}
							</div>

							{IconCollection.map(({ key, iconInfos }, index) => (
								<GiftCustomizationGrid
									key={key}
									index={index}
									title={t(key)}
									iconInfos={iconInfos}
									selectedBag={selectedBag}
									selectedIcons={selectedIcons}
									handleClick={handleSelectIcon}
								/>
							))}
						</div>
					</div>
				</div>
			) : (
				// screen is larger than or equal to 1180px
				<div className='flex-1 flex flex-row'>
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
									selectedBag={selectedBag}
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
									src={selectedBag.imageSrc}
									alt='Bag front'
									ref={imageRef}
									className='w-full h-full'
								/>
								{/* draggable icons */}
								{selectedIcons.map((selectIcon, index) => (
									<Draggable
										key={`${selectIcon.id}-${index}`}
										bounds={{
											top: 0,
											left: 0,
											right: imageWidth,
											bottom: imageHeight,
										}}
										onStop={handleDragStop}
									>
										<div
											id={`${selectIcon.id}-${index}`}
											className={`absolute w-24 h-24 top-${selectIcon.defaultY} left-${selectIcon.defaultX}`}
											style={{
												transform: `translate(${selectIcon.translateX}px, ${selectIcon.translateY}px)`,
											}}
										>
											<img
												src={selectIcon.imageSrc}
												alt='draggable icon'
												className={clsx('w-full h-full object-contain', {
													'scale-75': selectIcon.type === ItemTypes.LETTER,
													'scale-90': selectIcon.type === ItemTypes.EMOJI,
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
							<p className='ml-1 text-zinc-100 text-base'>{t('save_image')}</p>
						</button>

						{/* reset button */}
						<button
							className='absolute bottom-10 right-8 p-2 flex items-center  border-gray-300 border-2 rounded-2xl shadow-slate-300 shadow-md active:opacity-75 active:scale-95 transition-all duration-150'
							onClick={handleReset}
						>
							<Reset />
							<p className='ml-1'>{t('reset')}</p>
						</button>

						{/* bottom notification bar */}
						{isShowNotification && (
							<div className='absolute bottom-5 w-max-33 text-sm p-4 bg-barley_corn flex flex-row items-center '>
								<p className='flex-1'>{t('notification_bar_text')}</p>
								<CloseBlack
									className='items-end w-5 h-5 ml-4'
									onClick={handleCloseNotification}
								/>
							</div>
						)}
					</div>
				</div>
			)}

			{/* back confirmation modal */}
			<ModalContainer open={isBackModalOpen} onClose={handleCancelButtonClick}>
				<h2 className='font-PP_Tondo_Signage text-3xl text-center'>
					{t('discard')}
				</h2>
				<p className='mt-4 px-4 md:px-0 text-center'>{t('discard_change')}</p>
				<div className='mt-8 flex flex-row justify-between items-center'>
					<button
						className='w-[48%] py-3.5 border-2 border-yellow_metal rounded-lg text-yellow_metal'
						onClick={handleCancelButtonClick}
					>
						{t('cancel')}
					</button>
					<button
						className='w-[48%] py-3.5 bg-yellow_metal text-zinc-100 rounded-lg'
						onClick={handleDiscardButtonClick}
					>
						{t('discard')}
					</button>
				</div>
			</ModalContainer>

			{/* save image modal */}
			<ModalContainer
				open={isOrderModalOpen && generatedImage !== ''}
				onClose={handleCloseOrderSummary}
			>
				<img
					src={ModalBackground}
					alt='modal background'
					className='absolute top-0 left-0 w-full h-full object-contain'
				/>

				<div className='relative z-10'>
					<h2 className='font-PP_Tondo_Signage text-3xl md:text-center'>
						{t('order_summary')}
					</h2>
					<button className='absolute top-0 right-0 p-2'>
						<CloseBlack onClick={handleCloseOrderSummary} />
					</button>

					{generatedImage && (
						<div className='px-10 md:px-20'>
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
								{t('download_gift_image')}
							</h3>
							<p>{t('gift_image_desc')}</p>
						</div>

						<button
							className='p-2 bg-zinc-50 border-gray-300 border-2 rounded-2xl shadow-slate-300 shadow-md active:opacity-75 active:scale-95 transition-all duration-150'
							onClick={handleDownloadImage}
						>
							<DownloadBlack />
						</button>
					</div>
				</div>
			</ModalContainer>
		</div>
	);
};

export default GiftCustomization;
