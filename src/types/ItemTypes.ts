import { FunctionComponent, SVGProps } from 'react';

export enum ItemTypes {
	BAG = 'bag',
	EMOJI = 'emoji',
	LETTER = 'letter',
	QUOTE = 'quote',
}

export interface IconInfo {
  id: string;
  key?: string;
	svg: FunctionComponent<
		SVGProps<SVGSVGElement> & {
			title?: string;
		}
	>;
	imageSrc: string;
	type: ItemTypes;
	defaultX?: number;
	defaultY?: number;
	translateX?: number;
	translateY?: number;
}
