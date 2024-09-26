import { memo, useCallback, useEffect, useState } from 'react';
import { SettingTextareaProps } from './SettingTextarea.types';

export const SettingTextarea = memo<SettingTextareaProps>(
	({ content, onUpdate }) => {
		const [updateContent, setUpdatedContent] = useState('');

		const handleUpdateButtonClick = useCallback(() => {
			onUpdate(updateContent);
		}, [onUpdate, updateContent]);

		useEffect(() => {
			setUpdatedContent(content);
		}, [content]);

		return (
			<>
				<label className='mb-2.5 block text-lg font-medium text-dark'>
					Notification Content
				</label>
				<textarea
					rows={6}
					placeholder='Default Notification Content'
					value={updateContent}
					onChange={(e) => {
						setUpdatedContent(e.target.value);
					}}
					className='w-full bg-zinc-50 rounded-md border-2 border-zinc-600 p-5 text-dark-6 outline-none transition focus:border-yellow_metal active:border-yellow_metal disabled:cursor-default disabled:bg-gray-2'
				/>
				<button
					className='mt-5 px-7 xl:px-7 py-2 xl:py-3.5 border-2 border-zinc-600 rounded-lg active:border-gray-500 active:text-gray-500 active:opacity-75 active:scale-95 transition-all duration-150'
					onClick={handleUpdateButtonClick}
				>
					Update
				</button>
			</>
		);
	}
);

export default SettingTextarea;
