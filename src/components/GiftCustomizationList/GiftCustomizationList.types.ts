export interface GiftCustomizationListProps {
	title: string;
	images: React.FunctionComponent<
		React.ComponentProps<'svg'> & { title?: string }
	>[];
}
