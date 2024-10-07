/* eslint-disable react-hooks/exhaustive-deps */
import { useFetchSettings } from '@/api/hooks';
import GiftCollection from '@/assets/icons/GiftCollection.svg?react';
import {
	BagSelectionItem,
	LoadingSpinner,
	NotificationHeader,
} from '@/components';
import { BagInfo } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { toggleIsShowNotification } from '@/store/notificationSlice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollRestoration, useNavigate } from 'react-router-dom';

export const Landing = () => {
	const {
		t,
		// i18n: { language, changeLanguage },
	} = useTranslation('landing');
	const navigate = useNavigate();
	const { isShowNotification } = useAppSelector((state) => state.notification);
	const dispatch = useAppDispatch();

	const notificationHeaderRef = useRef<HTMLDivElement>(null);
	const [notificationHeaderHeight, setNotificationHeaderHeight] = useState(0);

	const {
		settings,
		query: { isLoading },
	} = useFetchSettings();

	// const handleChangeLanguage = useCallback(
	// 	(lang: string) => {
	// 		if (lang === language) return;

	// 		changeLanguage(lang);
	// 	},
	// 	[changeLanguage, language]
	// );

	const handleCloseNotificationHeader = useCallback(() => {
		dispatch(toggleIsShowNotification(false));
	}, [dispatch]);

	const handleScrollToCustomize = useCallback(() => {
		document.getElementById('first-bag')?.scrollIntoView({
			behavior: 'smooth',
		});
	}, []);

	const handleClickBagSelectionButton = useCallback(
		(title: string) => {
			navigate('/customization', {
				state: {
					bag: title,
					notificationHeaderHeight: notificationHeaderHeight,
				},
			});
		},
		[navigate, notificationHeaderHeight]
	);

	useEffect(() => {
		if (!settings) return;

		dispatch(toggleIsShowNotification(settings.isShowNotification));
	}, [dispatch, settings]);

	useEffect(() => {
		if (!notificationHeaderRef.current) return;

		const { height } = notificationHeaderRef.current.getBoundingClientRect();
		setNotificationHeaderHeight(height);
	}, [notificationHeaderRef.current, isShowNotification]);

	if (isLoading) {
		return (
			<div className='w-screen h-screen'>
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className='min-h-screen flex flex-col'>
			<ScrollRestoration />

			{isShowNotification && (
				<NotificationHeader
					ref={notificationHeaderRef}
					settings={settings}
					onClick={handleCloseNotificationHeader}
				/>
			)}

			{/* <header className='px-6 md:px-12 py-4 flex items-center'>
				<img className='h-4' src={Logo} alt='logo' />

				language switch
				<div className='flex flex-1 justify-end items-center gap-8'>
					{Languages.map(({ code, label }) => (
						<button
							key={code}
							onClick={() => handleChangeLanguage(code)}
							className={clsx({
								'text-yellow_metal': language === code,
							})}
						>
							{label}
						</button>
					))}
				</div>
			</header> */}

			<main className='mb-10'>
				<div className='w-full bg-alabaster flex flex-col lg:flex-row max-h-[740px]'>
					<div className='px-6 lg:w-1/3 lg:px-12 xl:px-18 flex flex-col justify-center'>
						<div>
							<h2 className='mt-6 font-PP_Tondo_Signage lg:mt-0 text-4xl lg:text-5xl text-center lg:text-left'>
								{t('the_order_up')}
							</h2>
							<p className='mt-4 leading-5 text-center lg:text-left'>
								{t('order_desc_one')}
							</p>
							<p className='mt-4 leading-5 text-center lg:text-left'>
								{t('order_desc_two')}
							</p>
							<div className='mt-8 flex justify-center lg:justify-start items-center'>
								<button
									className=' px-7 py-3.5 bg-yellow_metal text-zinc-100 rounded-lg active:opacity-75 active:scale-95 transition-all duration-150'
									onClick={handleScrollToCustomize}
								>
									{t('button_text')}
								</button>
							</div>
						</div>
					</div>

					{/* animation */}
					<div className='w-full lg:w-2/3 mt-4 lg:mt-0 flex justify-center'>
						<GiftCollection className='w-full sm:w-[80%] md:w-[60%] lg:w-full h-full' />
					</div>
				</div>

				{/* introduction section */}
				<section className='px-6 pt-12 lg:px-12 lg:pt-16'>
					<h2 className='font-PP_Tondo_Signage text-3xl lg:text-4xl'>
						{t('introduction')}
					</h2>
					<div className='mt-4'>
						<p className='w-full lg:w-2/3'>{t('introduction_desc_one')}</p>
						<p className='mt-4 w-full lg:w-2/3'>{t('introduction_desc_two')}</p>
					</div>

					<h2 className='font-PP_Tondo_Signage text-3xl lg:text-4xl mt-6'>
						{t('redemption_steps')}
					</h2>
					<ol className='mt-4 pl-4 list-decimal'>
						<li>
							Select a gift from the following options and create your unique
							design.
						</li>
						<li>
							Show your design at our pop-up store. Our staff will make your
							gift to order.
						</li>
						<li>Get your customised gift on the spot and enjoy!</li>
					</ol>

					<div className='lg:flex lg:flex-row mt-6'>
						{BagInfo.map((bag, index) => {
							return (
								<BagSelectionItem
									key={bag.title}
									{...bag}
									index={index}
									settings={settings!}
									onClick={handleClickBagSelectionButton}
								/>
							);
						})}
					</div>
				</section>
			</main>

			{/* <footer className='lg:px-12 py-4 flex flex-col lg:flex-row items-center border-t-2 border-gray-200'>
				<img className='h-4' src={Logo} alt='logo' />
				<div className='flex-1 flex justify-end items-center mt-4 lg:mt-0'>
					<p className='text-xs text-center'>
						&copy; 2024 Swire Properties Limited All rights served
					</p>
				</div>
			</footer> */}
		</div>
	);
};

export default Landing;
