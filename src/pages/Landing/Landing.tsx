import Logo from '@/assets/icons/Logo.svg?react';
import iconCollection from '@/assets/images/IconCollection.png';

export const Landing = () => {
	return (
		<>
			<header className='px-12 py-4 flex items-center'>
				<Logo />
				<div className='flex-1 flex justify-end items-center gap-8'>
					<button>English</button>
					<button>簡</button>
					<button>繁</button>
				</div>
			</header>

			<main>
				<div className='w-full bg-alabaster flex'>
					<div className='w-1/3 px-16 flex flex-col justify-center items-center'>
						<div>
							<p>Offices Activations 2024</p>
							<p className='mt-4'>The Order's Up!</p>
							<p className='mt-5 leading-5 text-justify'>
								Did you know there are aver 13 features on the Pacific Place
								Offices app designed exclusively for the unique personalities
								that work here?
							</p>
							<p className='mt-2 leading-5'>
								Whether you are a creative visionary, a passionate socializer,
								or a no-nonsense achiever - the app is customized to enhance
								every aspect of your workday.
							</p>
							<button className='mt-10 px-7 py-3.5 bg-yellow_metal text-zinc-100 rounded-lg hover:opacity-75'>
								CUSTOMIZE NOW
							</button>
						</div>
					</div>

					<img className='w-2/3' src={iconCollection} alt='icon collection' />
				</div>
			</main>

			<footer className='px-12 py-4 flex items-center'>
				<Logo />
				<div className='flex-1 flex justify-end items-center'>
					<p>
						Disclaimer | Privacy Policy | Copyright | &copy; 2024 Swire
						Properties Limited All rights served
					</p>
				</div>
			</footer>
		</>
	);
};

export default Landing;
