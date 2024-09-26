import { memo } from 'react';
import { useDrag } from 'react-dnd';
import { DraggableIconProps } from './DraggableIcon.types';

export const DraggableIcon = memo<DraggableIconProps>(({ icon }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'Icon',
		item: { icon },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	return (
		<div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
			{icon}
		</div>
	);
});

export default DraggableIcon;
