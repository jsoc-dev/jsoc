export function CodeInline({ children }: { children: string }) {
	return (
		<>
			<code className='bg-surface-code border border-b-outline-subtle border-dashed rounded-md px-[0.4rem] py-[0.3rem]  '>
				{children}
			</code>
		</>
	);
}
