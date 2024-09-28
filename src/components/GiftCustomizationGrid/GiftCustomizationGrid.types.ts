import { IconInfo } from '@/types';

export interface GiftCustomizationGridProps {
	title: string;
	iconInfos: IconInfo[];
	index: number;
	selectedIcons: IconInfo[];
	handleClick: (iconInfo: IconInfo) => void;
}
