export function CodeInline({ children }: { children: string }) {
	return (
		<>
			<code className='px-[0.4rem] py-[0.3rem] rounded-md bg-gray-100 text-slate-600'>
				{children}
			</code>
		</>
	);
}