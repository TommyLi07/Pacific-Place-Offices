export interface GiftCustomizationGridProps {
	title: string;
	images: React.FunctionComponent<
		React.ComponentProps<'svg'> & { title?: string }
	>[];
}
