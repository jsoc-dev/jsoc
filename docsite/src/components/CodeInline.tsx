export function CodeInline({ children }: { children: string }) {
	return (
		<>
			<code className='px-[0.4rem] py-[0.3rem] rounded-md bg-code border border-b-slate-200 border-dashed'>
				{children}
			</code>
		</>
	);
}
