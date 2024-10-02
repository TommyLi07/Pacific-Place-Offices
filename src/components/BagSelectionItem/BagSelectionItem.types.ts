import { ISettings } from '@/types';

export interface IBagSelectionItemProps {
	imageSrc: string;
	title: string;
	desc: string;
	index?: number;
	settings: ISettings;
	onClick: (title: string) => void;
}
