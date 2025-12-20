import { ChevronSvg } from './svg/ChevronSvg';
import { Collapsible, type CollapseToggleProps } from './Collapsible';
import { useCallback, useRef, useState } from 'react';

export type InputJsonProps = {
	setValue: React.Dispatch<React.SetStateAction<string>>;
	error: string;
	setError: React.Dispatch<React.SetStateAction<string>>;
	native: React.InputHTMLAttributes<HTMLTextAreaElement>;
};

export function InputJson(props: InputJsonProps) {
	const { native, setValue, error, setError } = props;
	const { className } = native;
	const editorRef = useRef<HTMLTextAreaElement>(null);
	const editorDefaultHeight = '100%';
	const [editorHeight, setEditorHeight] = useState(editorDefaultHeight);

	const validationCls = error
		? 'border-red-500 text-red-600'
		: 'text-text-muted ';

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const newVal = e.target.value;
			setValue(newVal);

			try {
				JSON.parse(newVal);
				setError('');
			} catch (err: unknown) {
				setError(String(err));
			}
		},
		[setValue, setError]
	);

	// TODO: Add a toolbar with options beautify and view in fullscreen
	return (
		<>
			{/* editor wrapper */}
			<div className='flex flex-col flex-1 border border-outline-subtle rounded-md overflow-hidden'>
				<Collapsible
					targetRef={editorRef}
					targetDefaultHeight={editorDefaultHeight}
					targetSetHeight={setEditorHeight}
					CollapseToggle={CollapseToggle}
				>
					{/* editor */}
					<textarea
						style={{
							height: editorHeight, // can't use tailwind class for height here, as height is dynamic (runtime value) but tailwind need static values to generate classes at build time
						}}
						placeholder='Paste your JSON here'
						{...native}
						ref={editorRef}
						aria-invalid={!!error}
						onChange={onChange}
						spellCheck='false'
						className={`bg-surface-code pl-2 py-2 text-sm font-code w-full flex resize-none focus:outline-none ${className} ${validationCls}`}
					/>
				</Collapsible>
			</div>
		</>
	);
}

function CollapseToggle({ isCollapsed, setIsCollapsed }: CollapseToggleProps) {
	return (
		<button
			type="button"
			onClick={() => setIsCollapsed(v => !v)}
			className="bg-white flex items-center justify-center gap-1 cursor-pointer border-t border-t-outline-subtle w-full"
		>
			<ChevronSvg direction={isCollapsed ? 'down' : 'up'} />
			<span className="py-2 text-sm font-semibold select-none">
				{isCollapsed ? 'Show more' : 'Show less'}
			</span>
		</button>
	);
}
