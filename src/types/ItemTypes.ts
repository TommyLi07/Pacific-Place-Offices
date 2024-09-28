export enum ItemTypes {
	BAG = 'bag',
	EMOJI = 'emoji',
	LETTER = 'letter',
	QUOTE = 'quote',
}

export interface IconInfo {
	id: string;
	imageSrc: string;
	type: ItemTypes;
	x?: number;
	y?: number;
}
