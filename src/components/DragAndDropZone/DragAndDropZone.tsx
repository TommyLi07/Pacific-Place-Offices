import { memo } from 'react';
import { useDrop } from 'react-dnd';
import { DragAndDropZoneProps } from './DragAndDropZone.types';

export const DragAndDropZone = memo<DragAndDropZoneProps>(
	({ onDrop, children }) => {
		const [{ canDrop, isOver }, drop] = useDrop(() => ({
			accept: 'Icon',
			drop: (item) => onDrop(item.icon),
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}));

		return (
			<div ref={drop} className='w-full h-full'>
				{children}
			</div>
		);

		// return (
		// 	<div className='w-full h-full flex justify-center items-center'>
		// 		<div className='flex flex-row justify-center'>
		// 			<img src={ElectronicBagFront} alt='Bag front' className='w-5/12' />
		// 			<img src={ElectronicBagBack} alt='Bag back' className='w-5/12' />
		// 		</div>
		// 	</div>
		// );
	}
);

export default DragAndDropZone;
