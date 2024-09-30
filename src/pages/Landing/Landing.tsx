import GiftCollection from '@/assets/icons/GiftCollection.svg?react';
import logo from '@/assets/images/Logo.png';
import { BagSelectionItem, NotificationHeader } from '@/components';
import { BagInfo } from '@/config';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollRestoration } from 'react-router-dom';

export const Landing = () => {
	const {
		t,
		// i18n: { language, changeLanguage },
	} = useTranslation('landing');

	// customize now button scroll to introduction section
	const firstSectionRef = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState(0);

	// const handleChangeLanguage = useCallback(
	// 	(lang: string) => {
	// 		if (lang === language) return;

	// 		changeLanguage(lang);
	// 	},
	// 	[changeLanguage, language]
	// );

	const handleScrollToCustomize = useCallback(() => {
		// scroll to introduction section
		if (window.innerWidth >= 1024) {
			// handle screen larger than or equal to 1024
			window.scrollBy({
				top: 44 + 60 + height,
				left: 0,
				behavior: 'smooth',
			});
		} else {
			document.getElementById('first-bag')?.scrollIntoView({
				behavior: 'smooth',
			});
		}
	}, [height]);

	// get "The order up" section's height
	useEffect(() => {
		if (!firstSectionRef.current) return;
		const { height } = firstSectionRef.current.getBoundingClientRect();
		setHeight(height);
	}, []);

	return (
		<div className='min-h-screen flex flex-col'>
			<ScrollRestoration />

			<NotificationHeader />

			<header className='px-6 md:px-12 py-4 flex items-center'>
				<img className='h-7' src={logo} alt='logo' />

				{/* language switch */}
				{/* <div className='flex flex-1 justify-end items-center gap-8'>
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
				</div> */}
			</header>

			<main className='mb-10 lg:mb-20'>
				<div
					ref={firstSectionRef}
					className='w-full bg-alabaster flex flex-col lg:flex-row'
				>
					<div className='px-6 lg:w-1/3 lg:px-12 xl:px-18 flex flex-col justify-center'>
						<div>
							<h2 className='mt-6 font-PP_Tondo_Signage lg:mt-0 text-4xl lg:text-5xl'>
								{t('the_order_up')}
							</h2>
							<p className='mt-4 leading-5 text-justify'>
								{t('order_desc_one')}
							</p>
							<p className='mt-4 leading-5'>{t('order_desc_two')}</p>
							<button
								className='mt-8 px-7 py-3.5 bg-yellow_metal text-zinc-100 rounded-lg active:opacity-75 active:scale-95 transition-all duration-150'
								onClick={handleScrollToCustomize}
							>
								{t('button_text')}
							</button>
						</div>
					</div>

					{/* animation */}
					<div className='w-full lg:w-2/3 mt-4 lg:mt-0'>
						<GiftCollection className='max-w-full h-auto' />
					</div>
				</div>

				{/* introduction section */}
				<section className='px-6 pt-12 lg:px-12 lg:pt-16'>
					<h2 className='font-PP_Tondo_Signage text-3xl lg:text-4xl'>
						{t('introduction')}
					</h2>
					<div className='mt-4 flex'>
						<p className='w-full lg:w-2/3'>{t('introduction_desc')}</p>
					</div>

					<div className='lg:flex lg:flex-row mt-4'>
						{BagInfo.map((bag, index) => {
							return (
								<BagSelectionItem key={bag.title} {...bag} index={index} />
							);
						})}
					</div>
				</section>
			</main>

			<footer className='lg:px-12 py-4 flex flex-col lg:flex-row items-center border-t-2 border-gray-200'>
				<img className='h-7' src={logo} alt='logo' />
				<div className='flex-1 flex justify-end items-center px-6 mt-4 lg:mt-0'>
					<p className='text-xs text-center'>
						<a
							href='https://www.swireproperties.com/en/disclaimer.aspx'
							target='_blank'
							rel='noopener noreferrer'
							className='text-Zinc-800 hover:text-Zinc-950 hover:underline'
						>
							Disclaimer
						</a>{' '}
						|{' '}
						<a
							href='https://www.swireproperties.com/en/data-privacy-and-security-policy.aspx'
							target='_blank'
							rel='noopener noreferrer'
							className='text-Zinc-800 hover:text-Zinc-950 hover:underline'
						>
							Privacy Policy
						</a>{' '}
						| Copyright | &copy; 2024 Swire Properties Limited All rights served
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Landing;
