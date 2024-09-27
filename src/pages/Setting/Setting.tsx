import { GiftCustomizationHeader } from '@/components';
import { RootState } from '@/store';
import { updateState } from '@/store/alertSlice';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Setting = () => {
	const { alertContent, isShowAlert } = useSelector(
		(state: RootState) => state.alert
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [status, setStatus] = useState(false);
	const [updatedContent, setUpdatedContent] = useState('');

	const handleBack = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	const handleToggle = useCallback((status: boolean) => {
		setStatus(status);
	}, []);

	const handleUpdate = useCallback(() => {
		dispatch(
			updateState({
				isShowAlert: status,
				alertContent: updatedContent,
			})
		);
	}, [dispatch, status, updatedContent]);

	useEffect(() => {
		setStatus(isShowAlert);
		setUpdatedContent(alertContent);
	}, [isShowAlert, alertContent]);

	return (
		<div className='w-dvw h-dvh flex flex-col'>
			<GiftCustomizationHeader onBack={handleBack} />
			<div className='w-full flex-1 flex justify-center items-center p-4 bg-yellow_metal'>
				<div className='bg-alabaster w-11/12 md:w-1/2 max-w-[40rem] p-6 md:p-10'>
					<div className='text-center text-2xl md:text-3xl font-PP_Tondo_Signage'>
						Notification
					</div>

					{/* toggle button */}
					<div className='my-6 md:my-10'>
						<label className='inline-flex items-center cursor-pointer'>
							<input
								type='checkbox'
								value=''
								className='sr-only peer'
								checked={status}
								onChange={() => handleToggle(!status)}
							/>
							<div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#C9B29B] dark:peer-focus:ring-[#C9B29B] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow_metal"></div>
							<span className='ms-3 text-base first-line:font-medium text-gray-900 dark:text-gray-300'>
								Turn on
							</span>
						</label>

						{/* textarea */}
						<textarea
							rows={6}
							placeholder='Default Notification Content'
							value={updatedContent}
							onChange={(e) => {
								setUpdatedContent(e.target.value);
							}}
							className='w-full mt-4 bg-zinc-50 rounded-md border-2 border-yellow_metal p-4 text-dark-6 outline-none transition focus:border-yellow_metal active:border-yellow_metal disabled:cursor-default disabled:bg-gray-2'
						/>
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
		</div>
	);
};

export default Setting;
