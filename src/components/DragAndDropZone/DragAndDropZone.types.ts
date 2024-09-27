export interface IconInfo {
	icon: React.ReactNode;
	x: number;
	y: number;
}

export interface DragAndDropZoneProps {
	iconInfos: IconInfo[];
	onDrop: ({ icon, x, y }: IconInfo) => void;
	children: React.ReactNode;
}
