import GiftCollection from '@/assets/icons/GiftCollection.svg?react';
import logo from '@/assets/images/Logo.png';
import { BagSelectionItem, NotificationHeader } from '@/components';

import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BagInfo, Booths, Languages } from './config';

export const Landing = () => {
	const {
		t,
		i18n: { language, changeLanguage },
	} = useTranslation('landing');
	const firstSectionRef = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState(0);

	const handleChangeLanguage = useCallback(
		(lang: string) => {
			if (lang === language) return;

			changeLanguage(lang);
		},
		[changeLanguage, language]
	);

	const handleScrollToCustomize = useCallback(() => {
		// show introduction part
		if (window.innerWidth >= 1024) {
			// handle screen larger than 1024
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

	useEffect(() => {
		if (!firstSectionRef.current) return;

		const { height } = firstSectionRef.current.getBoundingClientRect();
		setHeight(height);
	}, []);

	return (
		<div className='min-h-screen flex flex-col'>
			<NotificationHeader />

			<header className='px-6 md:px-12 py-4 flex items-center'>
				<img className='h-7' src={logo} alt='logo' />

				{/* language switch */}
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
			</header>

			<main>
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

				<section className='px-6 pt-12 lg:px-12 lg:pt-16'>
					<h2 className='font-PP_Tondo_Signage text-3xl lg:text-4xl'>
						{t('introduction')}
					</h2>
					<div className='mt-4 flex'>
						<p className='w-full lg:w-2/3'>{t('introduction_desc')}</p>
					</div>

					{/* slider on mobile */}
					<div className='mt-6 lg:hidden'>
						{BagInfo.map((bag, index) => {
							return (
								<BagSelectionItem key={bag.title} {...bag} index={index} />
							);
						})}
					</div>

					{/* bag gallery on desktop */}
					<div className='hidden lg:flex lg:flex-row mt-4'>
						{BagInfo.map((bag, index) => {
							return (
								<BagSelectionItem key={bag.title} {...bag} index={index} />
							);
						})}
					</div>
				</section>

				<section className='px-6 pt-12 lg:px-12 lg:pt-16 mb-10 lg:mb-20'>
					<h2 className='font-PP_Tondo_Signage text-3xl lg:text-4xl'>
						{t('booth_blurb')}
					</h2>

					{/* booth gallery on mobile */}
					<div className='flex flex-col p-6 mt-6 gap-8 bg-alabaster lg:hidden'>
						{Booths.map((booth, index) => {
							return (
								<img
									key={index}
									className='w-full'
									src={booth.imageSrc}
									alt='booth'
								/>
							);
						})}
					</div>

					<div className='mt-4 flex'>
						<p className='w-full lg:w-2/3'>{t('booth_blurb_desc')}</p>
					</div>

					{/* scroll view on desktop */}
					<div className='hidden lg:flex flex-row gap-12 mt-4 p-10 bg-alabaster overflow-x-auto'>
						{Booths.map((booth, index) => {
							return (
								<div key={index} className='w-2/3'>
									<img
										className='object-cover max-h-420'
										src={booth.imageSrc}
										alt='booth'
									/>
								</div>
							);
						})}
					</div>
				</section>
			</main>

			<footer className='lg:px-12 py-4 flex flex-col lg:flex-row items-center border-t-2 border-gray-200'>
				<img className='h-7' src={logo} alt='logo' />
				<div className='flex-1 flex justify-end items-center px-6 mt-4 lg:mt-0'>
					<p className='text-xs text-center'>
						Disclaimer | Privacy Policy | Copyright | &copy; 2024 Swire
						Properties Limited All rights served
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Landing;
