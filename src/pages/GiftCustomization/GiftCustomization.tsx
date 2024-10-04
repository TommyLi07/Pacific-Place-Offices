/* eslint-disable react-hooks/exhaustive-deps */
import { useFetchSettings } from '@/api/hooks';
import FireworkJson from '@/assets/animations/firework.json';
import CloseBlack from '@/assets/icons/CloseBlack.svg?react';
import DownloadBlack from '@/assets/icons/DownloadBlack.svg?react';
import DownloadWhite from '@/assets/icons/DownloadWhite.svg?react';
import Reset from '@/assets/icons/Reset.svg?react';
import {
	GiftCustomizationGrid,
	GiftCustomizationHeader,
	LoadingSpinner,
	ModalContainer,
	NotificationHeader,
} from '@/components';
import { giftCollection, IconCollection, IconSection } from '@/constants';
import { GiftCustomizationSection } from '@/containers';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { toggleIsShowNotification } from '@/store/notificationSlice';
import { IconInfo, ItemTypes } from '@/types';
import { useOrientation, useWindowSize } from '@uidotdev/usehooks';
import clsx from 'clsx';
import * as htmlToImage from 'html-to-image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie-player';
import { ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';

export const GiftCustomization = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation('customization');
	const { width: windowWidth, height: windowHeight } = useWindowSize();
	const { type: OrientationType } = useOrientation();
	const { isShowNotification } = useAppSelector((state) => state.notification);
	const dispatch = useAppDispatch();

	const [isBackModalOpen, setIsBackModalOpen] = useState(false);
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const [isShowNotificationBar, setIsShowNotificationBar] = useState(false);
	const [selectedBag, setSelectedBag] = useState<IconInfo>(
		IconCollection[0].iconInfos[0]
	);
	const [selectedIcons, setSelectedIcons] = useState<IconInfo[]>([]);
	const imageRef = useRef<HTMLImageElement | null>(null);
	const [imageWidth, setImageWidth] = useState(0);
	const [imageHeight, setImageHeight] = useState(0);
	const [generatedImage, setGeneratedImage] = useState<string>('');

	const {
		settings,
		query: { isLoading },
	} = useFetchSettings();

	// absolute position top value on mobile
	const offsetHeight = useMemo(() => {
		if (!windowWidth || !windowHeight) return 0;

		const baseHeight =
			104 + (isShowNotification ? location.state.notificationHeaderHeight : 0);

		let additionalHeight = 0;

		if (windowWidth < 768) {
			additionalHeight = 240;
		} else if (windowWidth < 1024) {
			additionalHeight = 300;
		} else {
			additionalHeight = 360;
		}

		return baseHeight + additionalHeight;
	}, [
		windowHeight,
		windowWidth,
		location.state.notificationHeaderHeight,
		OrientationType,
		isShowNotification,
	]);

	// absolute position bottom icon menu's height on mobile
	const scrollViewHeight = useMemo(() => {
		if (!windowWidth || !windowHeight) return 0;

		if (windowWidth < 768) {
			return windowHeight - offsetHeight;
		} else if (windowWidth < 1024) {
			return windowHeight - offsetHeight;
		} else {
			return windowHeight - offsetHeight;
		}
	}, [windowHeight, windowWidth, offsetHeight]);

	// left side icon menu's height on web
	const leftSideScrollViewHeight = useMemo(() => {
		return (
			windowHeight! -
			64 -
			(isShowNotification ? location.state.notificationHeaderHeight : 0)
		);
	}, [windowHeight, isShowNotification]);

	// filter out sold out bags in gift category
	const UpdatedGiftIconInfos = useMemo(() => {
		if (!settings) return giftCollection[0].iconInfos;

		let giftIconInfosCopy = [...giftCollection[0].iconInfos];

		if (settings.isBagOneInStock === false) {
			giftIconInfosCopy = giftIconInfosCopy.filter(
				(item) => item.id !== 'electronic_bag'
			);
		}

		if (settings.isBagTwoInStock === false) {
			giftIconInfosCopy = giftIconInfosCopy.filter(
				(item) => item.id !== 'wellness_bag'
			);
		}

		if (settings.isBagThreeInStock === false) {
			giftIconInfosCopy = giftIconInfosCopy.filter(
				(item) => item.id !== 'workfolio'
			);
		}

		return giftIconInfosCopy;
	}, [settings]);

	const handleCloseNotificationHeader = useCallback(() => {
		dispatch(toggleIsShowNotification(false));
	}, [dispatch]);

	// header
	const handleBackButtonClick = useCallback(() => {
		setIsBackModalOpen(true);
	}, []);

	// left-side icon collection
	const handleSelectIcon = useCallback(
		(iconInfo: IconInfo) => {
			// handle bag selection
			if (iconInfo.type === ItemTypes.GIFT) {
				if (iconInfo.id === selectedBag.id) return;

				setSelectedBag(iconInfo);

				return;
			}

			// handle icon selection
			if (selectedIcons.length === 5) {
				setIsShowNotificationBar(true);
				return;
			}

			const letterCount = selectedIcons.filter(
				(icon) =>
					icon.type === ItemTypes.COLORFUL_LETTER ||
					icon.type === ItemTypes.MONOCHROME_LETTER
			).length;
			const quoteCount = selectedIcons.filter(
				(icon) => icon.type === ItemTypes.QUOTE
			).length;
			const emojiCount = selectedIcons.filter(
				(icon) => icon.type === ItemTypes.ChARACTER
			).length;

			if (
				(iconInfo.type === ItemTypes.COLORFUL_LETTER ||
					iconInfo.type === ItemTypes.MONOCHROME_LETTER) &&
				letterCount === 3
			) {
				setIsShowNotificationBar(true);
				return;
			}

			if (
				(iconInfo.type === ItemTypes.ChARACTER ||
					iconInfo.type === ItemTypes.QUOTE) &&
				quoteCount + emojiCount >= 2
			) {
				setIsShowNotificationBar(true);
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

	const handleCloseNotificationBar = useCallback(() => {
		setIsShowNotificationBar(false);
	}, []);

	// back modal
	const handleCancelButtonClick = useCallback(() => {
		setIsBackModalOpen(false);
	}, []);

	const handleDiscardButtonClick = useCallback(() => {
		navigate('/');
		setIsBackModalOpen(false);
	}, [navigate]);

	// save image button
	const handleSaveImageButtonClick = useCallback(() => {
		const elementId =
			windowWidth! < 1180 ? 'exportAreaMobile' : 'exportAreaWeb';
		const element = document.getElementById(elementId);

		if (element) {
			htmlToImage
				.toSvg(element, {
					filter: (node) => node.tagName !== 'i',
				})
				.then((dataUrl) => {
					setGeneratedImage(dataUrl);
					setIsOrderModalOpen(true);
				})
				.catch((error) => {
					console.error('oops, something went wrong!', error);
				});
		}
	}, [windowWidth, htmlToImage, setGeneratedImage]);

	// order summary modal
	const handleDownloadImage = useCallback(() => {
		const elementId =
			windowWidth! < 1180 ? 'exportAreaMobile' : 'exportAreaWeb';
		const element = document.getElementById(elementId);

		if (element) {
			htmlToImage
				.toPng(element)
				.then((dataUrl) => {
					const link = document.createElement('a');
					link.download = 'gift.png';
					link.href = dataUrl;
					link.click();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [windowWidth, htmlToImage]);

	const handleShowImage = useCallback(() => {
		const elementId =
			windowWidth! < 1180 ? 'exportAreaMobile' : 'exportAreaWeb';
		const element = document.getElementById(elementId);

		if (element) {
			htmlToImage
				.toPng(element)
				.then((dataUrl) => {
					navigate('/giftImage', { state: { giftImageSrc: dataUrl } });
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [htmlToImage, navigate, windowWidth]);

	const handleCloseOrderSummary = useCallback(() => {
		setIsOrderModalOpen(false);
	}, []);

	// set setSelectedBag
	useEffect(() => {
		const { bag: bagId } = location.state;
		const bagInfo = giftCollection[0].iconInfos.find(
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

	useEffect(() => {
		setIsOrderModalOpen(false);
	}, [OrientationType]);

	if (isLoading) {
		return (
			<div className='w-screen h-screen'>
				<LoadingSpinner />;
			</div>
		);
	}

	return (
		<div className='relative min-h-dvh flex flex-col'>
			<ScrollRestoration />

			{windowWidth && windowWidth < 1180 ? (
				// screen is less than 1180px
				<div className='w-full h-full overflow-hidden'>
					<div className='fixed top-0 left-0 w-full z-10'>
						{isShowNotification && (
							<NotificationHeader
								settings={settings!}
								onClick={handleCloseNotificationHeader}
							/>
						)}

						<GiftCustomizationHeader
							title={t('gift_customization')}
							onBack={handleBackButtonClick}
						/>

						<div className='relative w-full h-full py-5 bg-alice_blue flex justify-center items-center'>
							<div className='flex flex-row justify-center'>
								<div id='exportAreaMobile' className='relative'>
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
												className={clsx(
													`absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 top-${selectIcon.defaultY} left-${selectIcon.defaultX}`,
													{
														'w-15 h-15 sm:w-17 sm:h-17 md:w-21 md:h-21':
															selectIcon.type === ItemTypes.MONOCHROME_LETTER,
													}
												)}
											>
												<img
													src={selectIcon.imageSrc}
													alt='draggable icon'
													className={clsx('w-full h-full object-contain', {
														'scale-75':
															selectIcon.type === ItemTypes.COLORFUL_LETTER,
														'scale-90': selectIcon.type === ItemTypes.ChARACTER,
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
							{isShowNotificationBar && (
								<div className='fixed bottom-5 z-10'>
									<div className='m-6 p-4 text-sm bg-barley_corn flex flex-row items-center gap-6'>
										<p>{t('notification_bar_text')}</p>
										<CloseBlack
											className='w-5 h-5'
											onClick={handleCloseNotificationBar}
										/>
									</div>
								</div>
							)}
						</div>
					</div>

					<div
						className='absolute w-full'
						style={{
							top: `${offsetHeight}px`,
							height: `${scrollViewHeight}px`,
						}}
					>
						<div className={`py-4 px-6 w-full h-full overflow-y-auto`}>
							{IconSection.map((section, index) => {
								return (
									<div key={section.title}>
										<GiftCustomizationSection
											title={t(section.title)}
											subtitle={t(section.subtitle)}
											index={index}
										>
											{section.title === 'gifts'
												? giftCollection.map(({ key }, index) => (
														<GiftCustomizationGrid
															key={key}
															index={index}
															title={t(key)}
															iconInfos={UpdatedGiftIconInfos}
															selectedBag={selectedBag}
															selectedIcons={selectedIcons}
															handleClick={handleSelectIcon}
														/>
												  ))
												: IconCollection.map(({ key, iconInfos }, index) => (
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
										</GiftCustomizationSection>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			) : (
				<>
					{/* screen is larger than or equal to 1180px */}
					{isShowNotification && (
						<NotificationHeader
							settings={settings!}
							onClick={handleCloseNotificationHeader}
						/>
					)}

					<div className='flex-1 flex flex-row'>
						{/* left-side icon collection */}
						<div className='w-1/3 fixed h-full flex flex-col'>
							<GiftCustomizationHeader
								title={t('gift_customization')}
								onBack={handleBackButtonClick}
							/>

							<div
								className={`p-6 overflow-y-auto`}
								style={{
									height: leftSideScrollViewHeight,
								}}
							>
								{IconSection.map((section, index) => {
									return (
										<div key={section.title}>
											<GiftCustomizationSection
												title={t(section.title)}
												subtitle={t(section.subtitle)}
												index={index}
											>
												{section.title === 'gifts'
													? giftCollection.map(({ key }, index) => (
															<GiftCustomizationGrid
																key={key}
																index={index}
																title={t(key)}
																iconInfos={UpdatedGiftIconInfos}
																selectedBag={selectedBag}
																selectedIcons={selectedIcons}
																handleClick={handleSelectIcon}
															/>
													  ))
													: IconCollection.map(({ key, iconInfos }, index) => (
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
											</GiftCustomizationSection>
										</div>
									);
								})}
							</div>
						</div>

						{/*  image area */}
						<div className='w-2/3 ml-[33.33%] bg-alice_blue flex justify-center items-center relative'>
							<div className='flex flex-row justify-center w-full'>
								<div id='exportAreaWeb' className='w-2/3 relative'>
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
												className={clsx(
													`absolute w-24 h-24 top-${selectIcon.defaultY} left-${selectIcon.defaultX}`,
													{
														'w-25 h-25':
															selectIcon.type === ItemTypes.MONOCHROME_LETTER,
													}
												)}
												style={{
													transform: `translate(${selectIcon.translateX}px, ${selectIcon.translateY}px)`,
												}}
											>
												<img
													src={selectIcon.imageSrc}
													alt='draggable icon'
													className={clsx('w-full h-full', {
														'scale-75':
															selectIcon.type === ItemTypes.COLORFUL_LETTER,
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
								<p className='ml-1 text-zinc-100 text-base'>
									{t('save_image')}
								</p>
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
							{isShowNotificationBar && (
								<div className='absolute bottom-5 w-max-33 text-sm p-4 bg-barley_corn flex flex-row items-center '>
									<p className='flex-1'>{t('notification_bar_text')}</p>
									<CloseBlack
										className='items-end w-5 h-5 ml-4'
										onClick={handleCloseNotificationBar}
									/>
								</div>
							)}
						</div>
					</div>
				</>
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
				<Lottie
					loop
					animationData={FireworkJson}
					play
					className='absolute top-0 left-0 w-full'
				/>

				<div className='relative z-10 max-w-[842px]'>
					<h2 className='font-PP_Tondo_Signage text-2xl md:text-center'>
						{t('download_image')}
					</h2>
					<button className='absolute top-0 right-0 p-2'>
						<CloseBlack onClick={handleCloseOrderSummary} />
					</button>

					<p className='bg-barley_corn mt-1 py-2 px-3 text-sm'>
						Tap the image below to open it in a new tab, then hold image for
						approximately 3 seconds, and finally select "Save to Photos".
					</p>

					{generatedImage && (
						<div
							className='mt-2 w-full md:h-[360px] bg-white flex justify-center items-center'
							role='button'
							onClick={handleShowImage}
						>
							<img
								src={generatedImage}
								alt='generated image'
								className={clsx('object-contain', {
									'max-h-full': windowWidth! > 1400,
								})}
							/>
						</div>
					)}

					<div className='flex flex-row items-center gap-4 mt-2'>
						<div>
							<h3 className='font-Tondo_W01_Signage text-lg'>
								{t('friendly_reminders')}
							</h3>
							<ol
								className={clsx('list-decimal ml-4', {
									'text-sm': windowWidth! < 1180,
								})}
							>
								<li>
									Our gifts are made-to-order. Please visit our pop-up store and
									present this image along with Pacific Place Offices app to our
									staff for redemption.
								</li>
								<li>
									<span className='font-bold underline'>Daily quota</span>{' '}
									applies on a first- come, first-served basis while stock
									lasts.
								</li>
								<li>
									Each person is entitled to a{' '}
									<span className='font-bold underline'>
										maximum of ONE redemption
									</span>{' '}
									while stocks last.
								</li>
								<li>Other terms and conditions apply.</li>
							</ol>
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
