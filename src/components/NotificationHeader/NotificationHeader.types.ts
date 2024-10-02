import { ISettings } from '@/types';

export interface NotificationHeaderRef {
	getHeight: () => void;
}

export interface NotificationHeaderProps {
	settings: ISettings;
	onClick: () => void;
}
