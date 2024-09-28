import GiftCollection from '@/assets/icons/GiftCollection.svg?react';
import logo from '@/assets/images/Logo.png';
import packAndGo from '@/assets/images/PackAndGo.png';
import packAndGoVertical from '@/assets/images/PackAndGoVertical.png';
import { BagSelectionItem, NotificationHeader } from '@/components';

import clsx from 'clsx';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BagInfo, Booths, Languages } from './config';

export const Landing = () => {
	const {
		t,
		i18n: { language, changeLanguage },
	} = useTranslation('landing');
	const navigate = useNavigate();

	const handleChangeLanguage = useCallback(
		(lang: string) => {
			if (lang === language) return;

			changeLanguage(lang);
		},
		[changeLanguage, language]
	);

	const handleNavigate = useCallback(() => {
		navigate('/customization');
	}, [navigate]);

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
				<div className='w-full bg-alabaster flex flex-col lg:flex-row'>
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
								onClick={handleNavigate}
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

				<section className='px-6 pt-12 lg:px-12 lg:pt-16'>
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
						{/* <div className='hidden lg:flex mr-12 flex-1 gap-8 justify-end'>
							<button
								onMouseDown={() => startScrolling('left')}
								onMouseUp={stopScrolling}
								onMouseLeave={stopScrolling}
							>
								<ArrowLeftIcon />
							</button>
							<button>
								<ArrowRightIcon
									onMouseDown={() => startScrolling('right')}
									onMouseUp={stopScrolling}
									onMouseLeave={stopScrolling}
								/>
							</button>
						</div> */}
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

				<section className='px-6 pt-12 lg:px-12 lg:pt-16 mb-10 lg:mb-20'>
					<h2 className='font-PP_Tondo_Signage text-3xl lg:text-4xl'>
						{t('redemption_instructions')}
					</h2>
					{/* vertical pack and go image */}
					<img
						className='lg:hidden mt-6 w-full max-h-660'
						src={packAndGoVertical}
						alt='pack and go'
					/>
					{/* horizontal pack and go image */}
					<img
						className='hidden lg:block mt-6 w-full max-h-660 object-contain'
						src={packAndGo}
						alt='pack and go'
					/>
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
