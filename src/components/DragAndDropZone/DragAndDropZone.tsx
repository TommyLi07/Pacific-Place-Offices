import { memo } from 'react';
import { useDrop } from 'react-dnd';
import { DragAndDropZoneProps } from './DragAndDropZone.types';

export const DragAndDropZone = memo<DragAndDropZoneProps>(
	({ onDrop, iconInfos, children }) => {
    const [collectedProps, drop] = useDrop(() => ({
			accept: 'icon',
			drop: (item, monitor) => {
				console.log('item', item);
				console.log('monitor.getDropResult()', monitor.getDropResult());
				const clientOffset = monitor.getClientOffset();
				console.log('clientOffset', clientOffset);
			},
			collect: (monitor) => {
				console.log('collect monitor', monitor.getHandlerId());
			},
		}));

		console.log('collectedProps', collectedProps);

		return (
			<div
				ref={drop}
				className='w-full h-full flex justify-center items-center relative'
			>
				{children}
				{iconInfos.map((iconInfo, index) => {
					return (
						<div
							key={index}
							className={`absolute top-[${iconInfo.y} left-[${iconInfo.x}]`}
						>
							{iconInfo.icon}
						</div>
					);
				})}
			</div>
		);
	}
);

export default DragAndDropZone;
