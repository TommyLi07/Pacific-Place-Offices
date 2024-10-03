import { useFetchSettings, usePostUpdateSettings } from '@/api/hooks';
import { GiftCustomizationHeader, LoadingSpinner } from '@/components';
import { ISettings } from '@/types';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export const Setting = () => {
	const navigate = useNavigate();

	const {
		settings,
		query: { isLoading },
	} = useFetchSettings();

	const [notificationInfo, setNotificationInfo] = useState<ISettings>({
		isShowNotification: true,
		notificationMessage:
			'Electronic Bag have been sold out. Please stay tuned for our latest updates.',
		isBagOneInStock: true,
		isBagTwoInStock: true,
		isBagThreeInStock: true,
	});

	const { mutate: postUpdateSettings } = usePostUpdateSettings({
		onSuccess: () =>
			toast.success('Update successfully!', {
				position: 'bottom-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				transition: Bounce,
			}),
		onError: () =>
			toast.error('Update fail', {
				position: 'bottom-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				transition: Bounce,
			}),
	});

	const handleBack = useCallback(() => {
		navigate('/');
	}, [navigate]);

	const handleToggleIsShow = useCallback(() => {
		setNotificationInfo((prevState) => ({
			...prevState!,
			isShowNotification: !notificationInfo?.isShowNotification,
		}));
	}, [notificationInfo]);

	const handleInputText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
		setNotificationInfo((prevState) => ({
			...prevState!,
			notificationMessage: e.target.value,
		}));
	}, []);

	const handleToggleIsBagSoldOut = useCallback(
		(bagId: string) => {
			switch (bagId) {
				case 'one':
					setNotificationInfo((prevState) => ({
						...prevState!,
						isBagOneInStock: !notificationInfo?.isBagOneInStock,
					}));
					break;
				case 'two':
					setNotificationInfo((prevState) => ({
						...prevState!,
						isBagTwoInStock: !notificationInfo?.isBagTwoInStock,
					}));
					break;
				case 'three':
					setNotificationInfo((prevState) => ({
						...prevState!,
						isBagThreeInStock: !notificationInfo?.isBagThreeInStock,
					}));
			}
		},
		[notificationInfo]
	);

	const handleUpdate = useCallback(() => {
		postUpdateSettings(notificationInfo as ISettings);
	}, [postUpdateSettings, notificationInfo]);

	useEffect(() => {
		if (!settings) return;

		setNotificationInfo(settings);
	}, [settings]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='w-dvw h-dvh flex flex-col'>
			<GiftCustomizationHeader onBack={handleBack} />

			<div className='w-full flex-1 flex justify-center items-center p-4 bg-yellow_metal'>
				<div className='bg-alabaster w-11/12 md:w-1/2 max-w-[40rem] p-6 md:p-10'>
					<div className='text-center text-2xl md:text-3xl font-PP_Tondo_Signage'>
						Settings
					</div>

					<div className='my-6 md:my-10'>
						{/* toggle button */}
						<label className='inline-flex items-center cursor-pointer'>
							<input
								type='checkbox'
								value=''
								className='sr-only peer'
								checked={notificationInfo?.isShowNotification}
								onChange={handleToggleIsShow}
							/>
							<div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#C9B29B] dark:peer-focus:ring-[#C9B29B] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow_metal"></div>
							<span className='ms-3 text-base first-line:font-medium text-gray-900 dark:text-gray-300'>
								Notification
							</span>
						</label>

						{/* textarea */}
						<textarea
							rows={6}
							placeholder='Default Notification Content'
							value={notificationInfo?.notificationMessage}
							onChange={handleInputText}
							className='w-full mt-4 bg-zinc-50 rounded-md border-2 border-yellow_metal p-4 text-dark-6 outline-none transition focus:border-yellow_metal active:border-yellow_metal disabled:cursor-default disabled:bg-gray-2'
						/>

						<div className='mt-4 grid grid-cols-2 gap-4 md:grid-cols-3'>
							<label className='inline-flex items-center cursor-pointer'>
								<input
									type='checkbox'
									value=''
									className='sr-only peer'
									checked={notificationInfo?.isBagOneInStock}
									onChange={() => handleToggleIsBagSoldOut('one')}
								/>
								<div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#C9B29B] dark:peer-focus:ring-[#C9B29B] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow_metal"></div>
								<span className='ms-3 text-base first-line:font-medium text-gray-900 dark:text-gray-300'>
									Bag 1
								</span>
							</label>

							<label className='inline-flex items-center cursor-pointer'>
								<input
									type='checkbox'
									value=''
									className='sr-only peer'
									checked={notificationInfo?.isBagTwoInStock}
									onChange={() => handleToggleIsBagSoldOut('two')}
								/>
								<div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#C9B29B] dark:peer-focus:ring-[#C9B29B] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow_metal"></div>
								<span className='ms-3 text-base first-line:font-medium text-gray-900 dark:text-gray-300'>
									Bag 2
								</span>
							</label>

							<label className='inline-flex items-center cursor-pointer'>
								<input
									type='checkbox'
									value=''
									className='sr-only peer'
									checked={notificationInfo?.isBagThreeInStock}
									onChange={() => handleToggleIsBagSoldOut('three')}
								/>
								<div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#C9B29B] dark:peer-focus:ring-[#C9B29B] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow_metal"></div>
								<span className='ms-3 text-base first-line:font-medium text-gray-900 dark:text-gray-300'>
									Bag 3
								</span>
							</label>
						</div>
					</div>

					<div className='flex justify-center items-center'>
						<button
							className='px-7 py-3.5 bg-yellow_metal text-zinc-100 rounded-lg active:opacity-75 active:scale-95 transition-all duration-150'
							onClick={handleUpdate}
						>
							UPDATE
						</button>
					</div>
				</div>
			</div>

			<ToastContainer />
		</div>
	);
};

export default Setting;
