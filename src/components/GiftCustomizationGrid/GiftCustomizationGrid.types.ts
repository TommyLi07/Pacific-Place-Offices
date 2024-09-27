import { FunctionComponent, SVGProps } from 'react';

export interface GiftCustomizationGridProps {
	title: string;
	iconInfos: {
		svg: FunctionComponent<
			SVGProps<SVGSVGElement> & {
				title?: string;
			}
		>;
		id: string;
		itemType: string;
		index: number;
	}[];
	index: number;
}
