import {
	GiftCustomizationHeader,
	SettingTextarea,
	SettingToggleButton,
} from '@/components';
import { RootState } from '@/store';
import { toggleIsShowAlert, updateAlertContent } from '@/store/alertSlice';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Setting = () => {
	const { isShowAlert, alertContent } = useSelector(
		(state: RootState) => state.alert
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleBack = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	const handleUpdate = useCallback(
		(updatedContent: string) => {
			dispatch(updateAlertContent(updatedContent));
		},
		[dispatch]
	);

	const handleToggle = useCallback(() => {
		dispatch(toggleIsShowAlert(!isShowAlert));
	}, [dispatch, isShowAlert]);

	return (
		<div className='w-dvw h-dvh flex flex-col'>
			<GiftCustomizationHeader onBack={handleBack} />
			<div className='w-full flex-1 p-4 bg-alabaster'>
				<SettingTextarea content={alertContent} onUpdate={handleUpdate} />
				<SettingToggleButton status={isShowAlert} onToggle={handleToggle} />
			</div>
		</div>
	);
};

export default Setting;
