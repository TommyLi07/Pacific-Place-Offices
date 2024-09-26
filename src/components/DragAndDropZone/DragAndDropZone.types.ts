export interface HandleDropProps {
	icon: React.ReactNode;
	x: number;
	y: number;
}

export interface DragAndDropZoneProps {
	children: React.ReactNode;
	onDrop: ({ icon, x, y }: HandleDropProps) => void;
}
