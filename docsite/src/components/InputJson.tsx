import { ChevronSvg } from './svg/ChevronSvg';
import { Collapsible, type CollapseToggleProps } from './Collapsible';
import { useCallback, useRef, useState } from 'react';
import { deleteKeys } from '@jsoc/core/utils';

/**
 * Custom props of InputJson, make sure to add any new prop in InputJsonCustomPropsList also
 */
export type InputJsonCustomProps = {
	collapsible?: boolean;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	error: string;
	setError: React.Dispatch<React.SetStateAction<string>>;
};

export const InputJsonCustomPropsList: (keyof InputJsonCustomProps)[] = [
	'collapsible',
	'setValue',
	'error',
	'setError',
];

export type InputJsonNativeProps =
	React.InputHTMLAttributes<HTMLTextAreaElement>;
export type InputJsonProps = InputJsonNativeProps & InputJsonCustomProps;

export function InputJson(props: InputJsonProps) {
	const { collapsible = false, setValue, error, setError } = props;
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
			<div
				className='border border-outline-subtle rounded-md 
					flex flex-col flex-1 
					overflow-hidden
				'
			>
				<Collapsible
					targetRef={editorRef}
					targetDefaultHeight={editorDefaultHeight}
					targetSetHeight={setEditorHeight}
					CollapseToggle={CollapseToggle}
					hideCollapseToggle={!collapsible}
				>
					{/* editor */}
					<textarea
						aria-invalid={!!error}
						className={`bg-surface-code pl-2 py-2 text-sm font-code w-full flex resize-none focus:outline-none ${validationCls}`}
						onChange={onChange}
						placeholder='Paste your JSON here'
						spellCheck='false'
						{...deleteKeys(props, InputJsonCustomPropsList)}
						ref={editorRef}
						style={{
							height: editorHeight, // can't use tailwind class for height here, as height is dynamic (runtime value) but tailwind need static values to generate classes at build time
						}}
					/>
				</Collapsible>
			</div>
		</>
	);
}

function CollapseToggle({ isCollapsed, setIsCollapsed }: CollapseToggleProps) {
	return (
		<button
			type='button'
			onClick={() => setIsCollapsed((v) => !v)}
			className='bg-white flex items-center justify-center gap-1 cursor-pointer border-t border-t-outline-subtle w-full'
		>
			<ChevronSvg direction={isCollapsed ? 'down' : 'up'} />
			<span className='py-2 text-sm font-semibold select-none'>
				{isCollapsed ? 'Show more' : 'Show less'}
			</span>
		</button>
	);
}
