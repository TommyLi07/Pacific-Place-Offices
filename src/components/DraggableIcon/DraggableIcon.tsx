import { memo } from 'react';
import { useDrag } from 'react-dnd';
import { DraggableIconProps } from './DraggableIcon.types';

export const DraggableIcon = memo<DraggableIconProps>(
	({ itemIcon, itemType, itemId, itemIndex }) => {
		const [{ isDragging }, drag] = useDrag(() => ({
			type: itemType,
			item: { id: itemId, index: itemIndex },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		}));

    console.log('isDragging', isDragging);

		return (
			<div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
				{itemIcon}
			</div>
		);
	}
);

export default DraggableIcon;
