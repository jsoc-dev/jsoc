import type { ReactNode } from "react";

export function CodeInline({ children }: { children: string }) {
	return (
		<>
			<code className='px-[0.4rem] py-[0.3rem] rounded-md bg-code border border-b-slate-200 border-dashed'>
				{children}
			</code>
		</>
	);
}

export function renderInlineCode(
	text: string,
): ReactNode[] {
	const parts = text.split(/(\{\{.*?\}\})/g);

	return parts.map((part, index) => {
		const match = part.match(/^\{\{(.*?)\}\}$/);

		if (match) {
			return <CodeInline key={index}>{match[1]}</CodeInline>;
		}

		return part;
	});
}