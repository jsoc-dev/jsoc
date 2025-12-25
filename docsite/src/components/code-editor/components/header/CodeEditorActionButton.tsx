export function CodeEditorActionButton(props: React.ComponentProps<'button'>) {
	return (
		<button
			className={`rounded-md flex items-center justify-center hover:bg-surface-muted`}
			{...props}
		/>
	);
}

export const CodeEditorActionButtonDefaultSvgProps: React.SVGProps<SVGSVGElement> = {
	height: 16,
	width: 16,
};