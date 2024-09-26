export interface GiftCustomizationGridProps {
	title: string;
	icons: React.FunctionComponent<
		React.ComponentProps<'svg'> & { title?: string }
	>[];
	index: number;
}
