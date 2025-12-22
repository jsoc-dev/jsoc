export function ErrorMessage({
	type,
	message,
	fileName,
}: {
	type: string;
	message: string;
	fileName: string;
}) {
	return (
		<div
			className='
				flex flex-col gap-2
				bg-white
				border border-red-700 rounded-md
				p-4	
			'
		>
			<p className='font-semibold text-xl text-red-700'>{type}</p>
			<div className='text-sm text-text-muted'>
				<pre className='inline font-semibold'>{fileName}: </pre>
				<pre className='inline whitespace-pre-wrap'>{message}</pre>
			</div>
		</div>
	);
}